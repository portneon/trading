import React from 'react';
import { Heart } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="mt-12 bg-white border-t border-slate-200 py-8">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                    <p className="font-bold text-slate-900 text-lg">Trade<span className="text-indigo-600">-IN</span></p>
                    <p className="text-slate-500 text-sm mt-1">Next-Gen Trading Platform</p>
                </div>

                <div className="flex items-center text-slate-400 text-sm font-medium">
                    <span>Made for Traders</span>
                </div>

                <div className="text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} Trade-IN. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
