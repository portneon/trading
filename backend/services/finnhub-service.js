const finnhub = require('finnhub');
require('dotenv').config();

const getFinnhubClient = () => {
    const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
    console.log(`[DEBUG] Loading Finnhub Client. Key present: ${!!apiKey}`);
    if (apiKey) {
        console.log(`[DEBUG] Key value (masked): ${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`);
    } else {
        console.error("[DEBUG] Start: Environment Variables Loaded:");
        console.error(process.env);
        console.error("[DEBUG] End: Environment Variables Loaded");
    }

    if (!apiKey) {
        throw new Error("Finnhub API Key missing");
    }
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = apiKey;
    return new finnhub.DefaultApi();
};

const fetchFinnhubCandles = async (symbol, resolution, from, to) => {
    const client = getFinnhubClient();
    return new Promise((resolve, reject) => {
        client.stockCandles(symbol, resolution, from, to, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
};

const fetchFinnhubQuote = async (symbol) => {
    const client = getFinnhubClient();
    return new Promise((resolve, reject) => {
        client.quote(symbol, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
};

module.exports = {
    fetchFinnhubCandles,
    fetchFinnhubQuote
};
