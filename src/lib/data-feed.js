import { getCandles, getQuote } from '@/lib/api';

export class DataFeed {
    constructor(initialPrice = 1000) {
        this.lastClose = initialPrice;
        this.lastTime = Math.floor(Date.now() / 1000);
        this.intervalId = null;
        this.subscribers = [];
        this.symbol = 'BINANCE:BTCUSDT'; // Default symbol
    }

    
    async fetchHistory(symbol, resolution, count) {
        this.symbol = symbol;
        try {
            const data = await getCandles(symbol, resolution, count);

            if (data.s === "ok") {
                const candles = data.t.map((t, i) => ({
                    time: t,
                    open: data.o[i],
                    high: data.h[i],
                    low: data.l[i],
                    close: data.c[i]
                }));
              
                if (candles.length > 0) {
                    this.lastClose = candles[candles.length - 1].close;
                    this.lastTime = candles[candles.length - 1].time;
                }
                return candles;
            } else {
                console.warn("Finnhub no data or error:", data);
                return this.generateSimulatedHistory(count);
            }
        } catch (e) {
            console.error("Failed to fetch history:", e);
            return this.generateSimulatedHistory(count);
        }
    }


    start(symbol, intervalMs = 5000) {
        this.stop();
        this.symbol = symbol;

        this.intervalId = setInterval(async () => {
            try {
                const data = await getQuote(symbol);

                if (data.c) {
                    const currentTime = Math.floor(Date.now() / 1000);

                    // Allow 1 candle per second max, but typical interval is 5s
                    if (currentTime <= this.lastTime) return;

                    const currentPrice = data.c;
                    const open = this.lastClose;
                    const close = currentPrice;
                    const high = Math.max(open, close); // Simple heuristic for now
                    const low = Math.min(open, close);

                    const candle = {
                        time: currentTime,
                        open,
                        high,
                        low,
                        close
                    };

                    this.lastClose = close;
                    this.lastTime = currentTime;

                    this.notify(candle);
                }
            } catch (e) {
                console.error("Quote fetch error", e);
            }
        }, intervalMs);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    subscribe(callback) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(cb => cb !== callback);
        };
    }

    notify(candle) {
        this.subscribers.forEach(cb => cb(candle));
    }

    // Keep the old simulator as a fallback
    generateSimulatedHistory(count) {
        const data = [];
        const time = Math.floor(Date.now() / 1000) - (count * 60);
        let currentPrice = 50000;

        for (let i = 0; i < count; i++) {
            const open = currentPrice;
            const close = open + (Math.random() - 0.5) * 100;
            const high = Math.max(open, close) + Math.random() * 50;
            const low = Math.min(open, close) - Math.random() * 50;

            data.push({
                time: time + (i * 60),
                open,
                high,
                low,
                close,
            });
            currentPrice = close;
        }
        // Sync lastClose with simulation
        this.lastClose = currentPrice;
        this.lastTime = time + ((count - 1) * 60);
        return data;
    }
}
