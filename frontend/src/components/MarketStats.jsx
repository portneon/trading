import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';

const StatCard = ({ label, value, subValue, type = 'neutral', icon: Icon }) => {
    const colors = {
        neutral: 'bg-white border-slate-100 text-slate-900',
        positive: 'bg-emerald-50/50 border-emerald-100 text-emerald-900',
        negative: 'bg-rose-50/50 border-rose-100 text-rose-900',
    };

    return (
        <div className={`p-5 rounded-2xl border ${colors[type]} shadow-sm flex items-center justify-between`}>
            <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">{label}</p>
                <h3 className="text-2xl font-bold">{value}</h3>
                {subValue && <p className="text-sm font-medium opacity-80 mt-1">{subValue}</p>}
            </div>
            {Icon && <div className="p-3 bg-white rounded-xl shadow-sm"><Icon size={20} className="opacity-70" /></div>}
        </div>
    );
};

export const MarketStats = ({ currentPrice, previousPrice, holdings, symbol }) => {
    const diff = currentPrice - previousPrice;
    const isUp = diff >= 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
                label="Market Price"
                value={`$${currentPrice.toFixed(2)}`}
                icon={DollarSign}
            />
            <StatCard
                label="24h Change"
                value={diff.toFixed(2)}
                subValue={`${(diff / previousPrice * 100).toFixed(2)}%`}
                type={isUp ? 'positive' : 'negative'}
                icon={isUp ? TrendingUp : TrendingDown}
            />
            <StatCard
                label="Your Position"
                value={`${holdings[symbol] || 0} Units`}
                subValue={`Value: $${((holdings[symbol] || 0) * currentPrice).toFixed(2)}`}
                icon={Wallet}
            />
        </div>
    );
};