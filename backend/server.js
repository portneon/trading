const express = require('express');
const cors = require('cors');

const { fetchFinnhubQuote, fetchFinnhubCandles } = require('./services/finnhub-service');

const app = express();
const PORT = process.env.PORT || 8080;


app.use(cors());
app.use(express.json());

const newsRouter = require('./news/news.router');
app.use('/api/news', newsRouter);

app.get('/api/quote', async (req, res) => {
    try {
        const { symbol } = req.query;
        if (!symbol) {
            return res.status(400).json({ error: 'Missing symbol parameter' });
        }
        const data = await fetchFinnhubQuote(symbol);
        res.json(data);
    } catch (error) {
        console.error("Error in /api/quote:", error.message);
        res.status(500).json({ error: error.message || "Failed to fetch quote" });
    }
});


app.get('/api/candles', async (req, res) => {
    try {
        const { symbol, resolution, from, to } = req.query;
        if (!symbol || !resolution || !from || !to) {
            return res.status(400).json({ error: 'Missing parameters' });
        }
        const data = await fetchFinnhubCandles(symbol, resolution, from, to);
        res.json(data);
    } catch (error) {
        console.error("Error in /api/candles:", error.message);
        res.status(500).json({ error: error.message || "Failed to fetch candles" });
    }
});

app.post('/api/webhook', (req, res) => {
    console.log("Webhook received:", req.body);
    res.status(200).json({ message: 'Webhook received' });
});


app.get('/', (req, res) => {
    res.send('Trading Backend is running');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
