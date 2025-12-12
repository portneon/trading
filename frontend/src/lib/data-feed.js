import { getCandles, getQuote } from '@/lib/api';

export class DataFeed {
    constructor(initialPrice = 1000) {
        this.lastClose = initialPrice;
        this.lastTime = Math.floor(Date.now() / 1000);
        this.intervalId = null;
        this.subscribers = [];
        this.symbol = 'BINANCE:BTCUSDT';
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
                return [];
            }
        } catch (e) {
            console.error("Failed to fetch history:", e);
            return [];
        }
    }

    start(symbol, intervalMs = 2000) {
        this.stop();
        this.symbol = symbol;

        this.intervalId = setInterval(async () => {
            try {
                const data = await getQuote(symbol);

                if (data.c) {
                    const currentTime = Math.floor(Date.now() / 1000);

                    // For simulation, we might get updates faster or slower, just blindly accept new price
                    // data.c is the "current price" from backend simulator

                    // Ideally we only add a candle if time has passed, but for "live" feel in simulator:
                    // We can just append a new candle every interval using the backend's current price.

                    // Ensure we don't duplicate timestamps too much if backend runs fast?
                    // Actually, let's just use "now" as the time.

                    // If backend is simulating continuous price, we treat 'data.c' as the close of a new candle 
                    // or update to current candle?
                    // Let's make it simple: Each poll is a new "tick/candle" for the chart.

                    if (currentTime <= this.lastTime) {
                        // Force time forward for visual flow if fast polling
                        // or just update the last candle?
                        // Let's just return to avoid glitching chart x-axis
                        // return;
                    }

                    const currentPrice = data.c;
                    const open = this.lastClose;
                    const close = currentPrice;
                    const high = Math.max(open, close);
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
}
