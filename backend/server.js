const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { fetchFinnhubQuote, fetchFinnhubCandles } = require('./services/finnhub-service');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// 1. Get Quote
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

// 2. Get Candles
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

// 3. Webhook (Placeholder - implement logic as needed)
app.post('/api/webhook', (req, res) => {
    console.log("Webhook received:", req.body);
    res.status(200).json({ message: 'Webhook received' });
});

// Health check
app.get('/', (req, res) => {
    res.send('Trading Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
