import React from 'react';

export const OrderForm = ({ symbol, quantity, setQuantity, currentPrice, onBuy, onSell }) => {
    const total = (currentPrice * quantity).toFixed(2);

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/50 h-fit">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800">Trade {symbol.split(':')[1]}</h2>
                <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded-md">Spot</span>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                        Quantity
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">Units</span>
                    </div>
                </div>

                <div className="py-3 px-4 bg-slate-50 rounded-xl flex justify-between items-center">
                    <span className="text-sm text-slate-500">Estimated Total</span>
                    <span className="text-lg font-bold text-slate-800">${total}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                        onClick={onBuy}
                        disabled={currentPrice <= 0}
                        className="py-3.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20"
                    >
                        Buy
                    </button>
                    <button
                        onClick={onSell}
                        disabled={currentPrice <= 0}
                        className="py-3.5 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-rose-500/20"
                    >
                        Sell
                    </button>
                </div>
            </div>
        </div>
    );
};