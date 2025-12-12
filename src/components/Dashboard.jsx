'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ChartComponent } from './Chart';
import { DataFeed } from '@/lib/data-feed';
import { useTrading } from '@/context/TradingContext';

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const dataFeedRef = useRef(null);
    const { balance, holdings, transactions, buyStock, sellStock } = useTrading();
    const [quantity, setQuantity] = useState(1);

    const symbol = 'BINANCE:BTCUSDT'; // Hardcoded for this demo

    useEffect(() => {
        // Initialize DataFeed on mount
        const feed = new DataFeed();
        dataFeedRef.current = feed;

        // Fetch initial history
        feed.fetchHistory(symbol, '1', 100).then(initialData => {
            setData(initialData);
            // Auto-start live feed
            feed.start(symbol, 2000);
            setIsRunning(true);
        });

        // Subscribe to updates
        const unsubscribe = feed.subscribe((newCandle) => {
            setData((prevData) => {
                const newData = [...prevData, newCandle];
                if (newData.length > 2000) {
                    return newData.slice(newData.length - 2000);
                }
                return newData;
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
            // Updated to match new signature: symbol, interval
            dataFeedRef.current.start(symbol, 2000);
        }
        setIsRunning(!isRunning);
    };

    const currentPrice = data.length > 0 ? data[data.length - 1].close : 0;

    const handleBuy = () => {
        if (currentPrice > 0) {
            buyStock(symbol, currentPrice, Number(quantity));
        }
    };

    const handleSell = () => {
        if (currentPrice > 0) {
            sellStock(symbol, currentPrice, Number(quantity));
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Market Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400">Trading System with Finnhub Integration</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Wallet Balance</p>
                        <p className="text-xl font-bold text-green-600">${balance.toFixed(2)}</p>
                    </div>
                    <button
                        onClick={toggleFeed}
                        className={`px-4 py-2 rounded font-semibold transition-colors ${isRunning
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                            }`}
                    >
                        {isRunning ? 'Stop Feed' : 'Start Feed'}
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart Area */}
                <div className="lg:col-span-2 space-y-4">
                    <main className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
                        <ChartComponent
                            data={data}
                            colors={{
                                backgroundColor: 'transparent',
                                textColor: '#333',
                            }}
                        />
                    </main>

                    {/* Market Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow border border-gray-200 dark:border-gray-700">
                            <h3 className="text-sm font-medium text-gray-500">Current Price</h3>
                            <p className="text-2xl font-bold">{currentPrice > 0 ? currentPrice.toFixed(2) : '---'}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow border border-gray-200 dark:border-gray-700">
                            <h3 className="text-sm font-medium text-gray-500">24h Change</h3>
                            <p className={`text-2xl font-bold ${data.length > 1 && data[data.length - 1].close >= data[data.length - 2].close
                                ? 'text-green-500'
                                : 'text-red-500'
                                }`}>
                                {data.length > 1
                                    ? (data[data.length - 1].close - data[data.length - 2].close).toFixed(2)
                                    : '0.00'}
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow border border-gray-200 dark:border-gray-700">
                            <h3 className="text-sm font-medium text-gray-500">Your Position</h3>
                            <p className="text-2xl font-bold">{holdings[symbol] || 0} Units</p>
                        </div>
                    </div>
                </div>

                {/* Trading Controls & History */}
                <div className="space-y-6">
                    {/* Trade Box */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold mb-4">Trade {symbol}</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={handleBuy}
                                    disabled={currentPrice <= 0}
                                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md disabled:opacity-50 transition-colors"
                                >
                                    BUY
                                </button>
                                <button
                                    onClick={handleSell}
                                    disabled={currentPrice <= 0}
                                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md disabled:opacity-50 transition-colors"
                                >
                                    SELL
                                </button>
                            </div>
                            <div className="text-sm text-gray-500 text-center">
                                Estimated Total: ${(currentPrice * quantity).toFixed(2)}
                            </div>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-[400px] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
                        <div className="space-y-3">
                            {transactions.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">No transactions yet</p>
                            ) : (
                                transactions.map(tx => (
                                    <div key={tx.id} className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0">
                                        <div>
                                            <p className={`font-bold ${tx.type === 'BUY' ? 'text-green-600' : 'text-red-600'}`}>
                                                {tx.type} {tx.symbol}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {new Date(tx.timestamp).toLocaleTimeString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">{tx.quantity} @ {tx.price.toFixed(2)}</p>
                                            <p className="text-xs text-gray-500">Total: ${tx.total.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
