'use client';

import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { DataFeed } from '@/lib/data-feed';
import { useTrading } from '@/context/TradingContext';
import { MarketStats } from './MarketStats';
import { OrderForm } from './OrderForm';
import { TransactionHistory } from './TransactionHistory';
import FinancialNewsFeed from './FinancialNewsFeed';
import { Footer } from './Footer';
import { Activity, Power } from 'lucide-react';

// Dynamic import for Chart to avoid SSR issues
const PriceChart = dynamic(() => import('./PriceChart').then(mod => mod.PriceChart), {
    ssr: false,
    loading: () => <div className="w-full h-[500px] bg-slate-50 rounded-2xl animate-pulse" />
});

export default function Dashboard() {
    // --- STATE & LOGIC ---
    const [data, setData] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const dataFeedRef = useRef(null);
    const { balance, holdings, transactions, buyStock, sellStock } = useTrading();

    const symbol = 'BINANCE:BTCUSDT';

    useEffect(() => {
        const feed = new DataFeed();
        dataFeedRef.current = feed;

        feed.fetchHistory(symbol, '1', 100).then(initialData => {
            setData(initialData);
            feed.start(symbol, 2000);
            setIsRunning(true);
        });

        const unsubscribe = feed.subscribe((newCandle) => {
            setData((prevData) => {
                const newData = [...prevData, newCandle];
                return newData.slice(-200); // Keep last 200 candles for performance
            });
        });

        return () => {
            feed.stop();
            unsubscribe();
        };
    }, []);

    const toggleFeed = () => {
        if (!dataFeedRef.current) return;
        if (isRunning) {
            dataFeedRef.current.stop();
        } else {
            dataFeedRef.current.start(symbol, 2000);
        }
        setIsRunning(!isRunning);
    };

    const currentPrice = data.length > 0 ? data[data.length - 1].close : 0;
    const previousPrice = data.length > 1 ? data[data.length - 2].close : currentPrice;

    // --- RENDER ---
    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-20">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 relative bg-white rounded-lg overflow-hidden shrink-0">
                            <img src="/logo.png" alt="Trade-IN Logo" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-slate-900">Trade<span className="text-indigo-600">-IN</span></h1>
                            <p className="text-xs text-slate-500 font-medium">BTC/USDT Live Market</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Wallet Balance</p>
                            <p className="text-xl font-bold text-slate-800">${balance.toFixed(2)}</p>
                        </div>
                        <button
                            onClick={toggleFeed}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${isRunning
                                ? 'bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100'
                                : 'bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100'
                                }`}
                        >
                            <Power size={16} />
                            {isRunning ? 'Stop Feed' : 'Start Feed'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

                {/* Stats Row */}
                <MarketStats
                    currentPrice={currentPrice}
                    previousPrice={previousPrice}
                    holdings={holdings}
                    symbol={symbol}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Chart */}
                    <div className="lg:col-span-2 space-y-6">
                        <PriceChart data={data} />
                    </div>

                    {/* Right Column: Trading & History */}
                    <div className="space-y-6">
                        <OrderForm
                            symbol={symbol}
                            quantity={quantity}
                            setQuantity={setQuantity}
                            currentPrice={currentPrice}
                            onBuy={() => buyStock(symbol, currentPrice, Number(quantity))}
                            onSell={() => sellStock(symbol, currentPrice, Number(quantity))}
                        />
                        <TransactionHistory transactions={transactions} />
                    </div>
                </div>

                {/* News Section */}
                <div className="pt-8 border-t border-slate-200">
                    <FinancialNewsFeed />
                </div>
            </main>

            <Footer />
        </div>
    );
}