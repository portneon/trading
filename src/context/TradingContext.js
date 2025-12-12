"use client";

import React, { createContext, useContext, useState } from 'react';

const TradingContext = createContext();

export const TradingProvider = ({ children }) => {
    const [balance, setBalance] = useState(10000); // Default $10,000
    const [holdings, setHoldings] = useState({});
    const [transactions, setTransactions] = useState([]);

    const buyStock = (symbol, price, quantity) => {
        const totalCost = price * quantity;
        if (totalCost > balance) {
            alert("Insufficient funds");
            return;
        }

        setBalance((prev) => prev - totalCost);
        setHoldings((prev) => ({
            ...prev,
            [symbol]: (prev[symbol] || 0) + quantity,
        }));

        const newTransaction = {
            id: Math.random().toString(36).substr(2, 9),
            type: 'BUY',
            symbol,
            price,
            quantity,
            timestamp: Date.now(),
            total: totalCost,
        };
        setTransactions((prev) => [newTransaction, ...prev]);
    };

    const sellStock = (symbol, price, quantity) => {
        const currentHolding = holdings[symbol] || 0;
        if (currentHolding < quantity) {
            alert("Insufficient holdings");
            return;
        }

        const totalValue = price * quantity;

        setBalance((prev) => prev + totalValue);
        setHoldings((prev) => {
            const newHoldings = { ...prev, [symbol]: prev[symbol] - quantity };
            if (newHoldings[symbol] === 0) {
                delete newHoldings[symbol];
            }
            return newHoldings;
        });

        const newTransaction = {
            id: Math.random().toString(36).substr(2, 9),
            type: 'SELL',
            symbol,
            price,
            quantity,
            timestamp: Date.now(),
            total: totalValue,
        };
        setTransactions((prev) => [newTransaction, ...prev]);
    };

    return (
        <TradingContext.Provider value={{ balance, holdings, transactions, buyStock, sellStock }}>
            {children}
        </TradingContext.Provider>
    );
};

export const useTrading = () => {
    const context = useContext(TradingContext);
    if (!context) {
        throw new Error("useTrading must be used within a TradingProvider");
    }
    return context;
};
