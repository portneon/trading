/**
 * Frontend API Client
 * Centralizes all calls to the backend API.
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://trading-yuwf.onrender.com/api';

export async function getCandles(symbol, resolution, count) {
    const to = Math.floor(Date.now() / 1000);
    const from = to - (count * 60);

    // Construct query parameters
    const params = new URLSearchParams({
        symbol,
        resolution,
        from: from.toString(),
        to: to.toString()
    });

    const response = await fetch(`${BACKEND_URL}/candles?${params.toString()}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch candles: ${response.statusText}`);
    }
    return response.json();
}

export async function getQuote(symbol) {
    const params = new URLSearchParams({ symbol });
    const response = await fetch(`${BACKEND_URL}/quote?${params.toString()}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch quote: ${response.statusText}`);
    }
    return response.json();
}
