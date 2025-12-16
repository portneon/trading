let newsCache = [];
let lastFetchTime = 0;
const CACHE_DURATION = 15 * 60 * 1000; 

const TOKEN = process.env.MY_TOKEN;
async function getNews(req, res) {
    try {
        // Check cache
        const now = Date.now();
        if (newsCache.length === 0 || now - lastFetchTime > CACHE_DURATION) {
            console.log('Fetching fresh news from Finnhub...');
            const data = await fetch(`https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2025-05-15&to=2025-06-20&token=${TOKEN}`);
            const result = await data.json();

            if (Array.isArray(result)) {
                newsCache = result;
                lastFetchTime = now;
            }
        }

        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedNews = newsCache.slice(startIndex, endIndex);

        res.json({
            data: paginatedNews,
            total: newsCache.length,
            page: page,
            hasMore: endIndex < newsCache.length
        });

    } catch (error) {
        console.error('News Error:', error);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
}

module.exports = {
    getNews
};  
