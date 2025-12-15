"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { ExternalLink, Clock, Search, TrendingUp, Filter, AlertCircle } from 'lucide-react';



const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

// A helper to assign subtle pastel colors to sources for visual distinction without neon clashes
const getSourceColor = (source) => {
    const colors = {
        'Yahoo': 'bg-purple-50 text-purple-700 border-purple-100',
        'SeekingAlpha': 'bg-orange-50 text-orange-700 border-orange-100',
        'Bloomberg': 'bg-blue-50 text-blue-700 border-blue-100',
        'Reuters': 'bg-emerald-50 text-emerald-700 border-emerald-100',
        'MarketWatch': 'bg-red-50 text-red-700 border-red-100',
        'default': 'bg-slate-50 text-slate-600 border-slate-100'
    };
    return colors[source] || colors['default'];
};

// --- COMPONENTS ---

const NewsCard = ({ article }) => {
    // Filter out the generic placeholder images if you want a cleaner look
    const hasValidImage = article.image && article.image !== "";

    return (
        <div className="group relative flex flex-col justify-between h-full bg-white rounded-2xl overflow-hidden border border-slate-100 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">

            {/* Image Section */}
            {hasValidImage && (
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                        src={article.image}
                        alt="News Thumbnail"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        onError={(e) => e.target.style.display = 'none'} // Hide broken images
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
            )}

            {/* Content Section */}
            <div className="flex flex-col flex-grow p-6">
                <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getSourceColor(article.source)}`}>
                        {article.source}
                    </span>
                    <div className="flex items-center text-slate-400 text-xs font-medium">
                        <Clock size={12} className="mr-1" />
                        {formatDate(article.datetime)}
                    </div>
                </div>

                <h3 className="text-lg font-bold text-slate-800 leading-snug mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {article.headline}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">
                    {article.summary}
                </p>
            </div>

            {/* Footer / Action */}
            <div className="px-6 pb-6 pt-0 mt-auto">
                <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
                >
                    Read Analysis <ExternalLink size={14} className="ml-1" />
                </a>
            </div>
        </div>
    );
};



// --- MAIN APPLICATION ---

export default function FinancialNewsFeed() {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchNews = async (pageNum = 1) => {
        try {
            if (pageNum === 1) setLoading(true);
            else setLoadingMore(true);

            // Using the simulated backend URL with pagination
            const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
            const response = await fetch(`${BACKEND_URL}/api/news?page=${pageNum}&limit=9`);
            if (!response.ok) {
                throw new Error('Failed to fetch news');
            }
            const result = await response.json();

            // Backend now returns { data: [], total: 0, page: 1, hasMore: true }
            if (result.data) {
                setNewsData(prev => pageNum === 1 ? result.data : [...prev, ...result.data]);
                setHasMore(result.hasMore);
            } else if (Array.isArray(result)) {
                // Fallback for old API format if cache hasn't updated yet
                setNewsData(result);
                setHasMore(false);
            }
        } catch (err) {
            console.error("Error fetching news:", err);
            setError(err.message);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchNews(1);
    }, []);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchNews(nextPage);
    };

    // Infinite Scroll Observer
    const observerTarget = React.useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
                    handleLoadMore();
                }
            },
            { threshold: 1.0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [hasMore, loading, loadingMore, page]); // Re-run when dependencies change

    // Efficiently filter data based on search input
    const filteredNews = useMemo(() => {
        if (!searchTerm) return newsData;
        const lowerTerm = searchTerm.toLowerCase();
        return newsData.filter(item =>
            (item.headline && item.headline.toLowerCase().includes(lowerTerm)) ||
            (item.summary && item.summary.toLowerCase().includes(lowerTerm)) ||
            (item.source && item.source.toLowerCase().includes(lowerTerm))
        );
    }, [searchTerm, newsData]);

    // --- RENDER ---
    if (loading && page === 1) {
        return (
            <div className="bg-white rounded-2xl p-8 border border-slate-100 flex items-center justify-center min-h-[400px]">
                <div className="text-slate-500 font-medium animate-pulse">Loading market intelligence...</div>
            </div>
        );
    }

    if (error && page === 1) {
        return (
            <div className="bg-red-50 rounded-2xl p-8 border border-red-100 flex items-center justify-center text-red-600 min-h-[200px]">
                <AlertCircle className="mr-2" /> Error: {error}. Is the backend running?
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <TrendingUp className="text-indigo-600" size={20} />
                    Latest Briefings
                    <span className="ml-2 text-sm font-normal text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200">
                        {filteredNews.length}
                    </span>
                </h2>

                <div className="flex items-center gap-4">
                    <div className="relative group w-full md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Filter news..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl text-sm leading-5 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-200"
                        />
                    </div>
                </div>
            </div>

            {/* Grid */}
            {filteredNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNews.map((article) => (
                        <NewsCard key={article.id} article={article} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-slate-100">
                    <div className="bg-slate-50 p-4 rounded-full mb-4">
                        <Search size={24} className="text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-700">No briefings found</h3>
                    <p className="text-slate-500">Try adjusting your search terms.</p>
                </div>
            )}

            {/* Loading Sentinel */}
            {hasMore && !searchTerm && (
                <div ref={observerTarget} className="flex justify-center py-8">
                    {loadingMore && (
                        <div className="flex items-center text-slate-500 font-medium">
                            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mr-3"></div>
                            Fetching more updates...
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
