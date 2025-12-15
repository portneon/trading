// Simulated Backend Service replacing Finnhub
// Keeps state in memory

let currentPrice = 93000.00; // Starting BTC price
const volatility = 0.002; // 0.2%

// Helper to simulate price movement
const simulateNextPrice = (price) => {
    const changePercent = (Math.random() - 0.5) * volatility;
    return price * (1 + changePercent);
};

const fetchFinnhubCandles = async (symbol, resolution, from, to) => {
    // Generate history ending at currentPrice
    const count = 100; // Fixed count for simplicity or derive from time range
    // Derive count from time range if needed, but for simulator 100 is fine for "history"

    // We'll approximate count based on resolution '1' (1 minute = 60s)
    let candleCount = Math.floor((to - from) / 60);
    if (candleCount > 300) candleCount = 300; // Cap it
    if (candleCount < 10) candleCount = 10;

    const data = {
        s: "ok",
        t: [],
        o: [],
        h: [],
        l: [],
        c: [],
        v: []
    };

    let price = currentPrice;
    // Walk backwards
    const tempCandles = [];

    for (let i = 0; i < candleCount; i++) {
        const changePercent = (Math.random() - 0.5) * volatility;
        const prevPrice = price / (1 + changePercent);

        const open = prevPrice;
        const close = price;
        const high = Math.max(open, close) + Math.random() * (price * 0.0005);
        const low = Math.min(open, close) - Math.random() * (price * 0.0005);

        tempCandles.unshift({
            t: to - (i * 60), // approximate timestamps
            o: open,
            h: high,
            l: low,
            c: close
        });

        price = prevPrice;
    }

    // Populate arrays
    tempCandles.forEach(candle => {
        data.t.push(candle.t);
        data.o.push(candle.o);
        data.h.push(candle.h);
        data.l.push(candle.l);
        data.c.push(candle.c);
    });

    return data;
};

const fetchFinnhubQuote = async (symbol) => {
    // Update global price state for next call
    currentPrice = simulateNextPrice(currentPrice);

    return {
        c: currentPrice,
        h: currentPrice * 1.001,
        l: currentPrice * 0.999,
        o: currentPrice,
        pc: currentPrice, // previous close
        d: 0,
        dp: 0
    };
};

const fetchFinnhubNews = async (symbol) => {
    // Return some mock news
    return [
        {
            category: "technology",
            datetime: Math.floor(Date.now() / 1000) - 3600,
            headline: `${symbol || 'Market'} sees significant movement today`,
            id: 123456,
            image: "https://via.placeholder.com/150",
            related: symbol || "General",
            source: "Simulated News",
            summary: "Market analysts are watching the trends closely as volatility increases.",
            url: "https://example.com/news/1"
        },
        {
            category: "business",
            datetime: Math.floor(Date.now() / 1000) - 7200,
            headline: "Global markets react to economic data",
            id: 123457,
            image: "https://via.placeholder.com/150",
            related: "Global",
            source: "Simulated Financials",
            summary: "Investors are cautious amidst new economic reports released this morning.",
            url: "https://example.com/news/2"
        },
        {
            category: "technology",
            datetime: Math.floor(Date.now() / 1000) - 10800,
            headline: "Tech sector rallies ahead of earnings",
            id: 123458,
            image: "https://via.placeholder.com/150",
            related: "Technology",
            source: "Tech Daily",
            summary: "Major tech companies are expected to announce strong earnings this quarter.",
            url: "https://example.com/news/3"
        }
    ];
};

module.exports = {
    fetchFinnhubCandles,
    fetchFinnhubQuote,
    fetchFinnhubNews
};
