import React from 'react';
import { ArrowUpRight, ArrowDownLeft, History } from 'lucide-react';

export const TransactionHistory = ({ transactions }) => {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-[400px] flex flex-col">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <History size={18} className="text-slate-400" /> Recent Activity
            </h2>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {transactions.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                        <p className="text-sm">No transactions yet</p>
                    </div>
                ) : (
                    transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${tx.type === 'BUY' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                    {tx.type === 'BUY' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-700">{tx.type} BTC</p>
                                    <p className="text-xs text-slate-400">{new Date(tx.timestamp).toLocaleTimeString()}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-slate-900">${tx.total.toFixed(2)}</p>
                                <p className="text-xs text-slate-500">{tx.quantity} units @ {tx.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};