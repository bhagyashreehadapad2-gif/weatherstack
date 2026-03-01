import React, { useState } from 'react';
import { Search, Filter, Bell, User } from 'lucide-react';

const Header = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <header className="flex items-center justify-between gap-10 animate-fade-in py-2 w-full z-50">
            <form onSubmit={handleSubmit} className="flex-1 relative max-w-3xl group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
                    <Search className="text-text-secondary w-6 h-6 group-focus-within:text-accent-main transition-colors duration-300" />
                    <div className="h-6 w-px bg-glass-border hidden sm:block"></div>
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search global destinations, cities, or areas..."
                    className="w-full bg-glass-bg border-2 border-glass-border rounded-[2rem] py-5 pl-20 pr-10 text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-main/50 focus:bg-white/[0.04] focus:ring-[15px] focus:ring-indigo-500/5 transition-all duration-500 font-semibold text-xl shadow-2xl"
                />
                <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-accent-main hover:bg-accent-main/80 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-500/20 transition-all active:scale-95 flex items-center gap-2"
                >
                    <Filter className="w-4 h-4" />
                    <span className="hidden md:inline antialiased">Search</span>
                </button>
            </form>

            <div className="flex items-center gap-8 shrink-0">
                <button className="p-5 bg-glass-bg border-2 border-glass-border rounded-[1.5rem] text-text-secondary hover:text-accent-main hover:bg-white/[0.04] hover:border-accent-main/30 transition-all duration-500 relative group">
                    <Bell size={26} className="group-hover:rotate-12 transition-transform" />
                    <span className="absolute top-4 right-4 w-3.5 h-3.5 bg-accent-alt rounded-full border-[3px] border-bg-primary shadow-[0_0_15px_rgba(244,63,94,0.6)]"></span>
                </button>

                <div className="flex items-center gap-6 pl-8 border-l-2 border-glass-border">
                    <div className="text-right hidden sm:block">
                        <p className="text-lg font-black text-white leading-tight mb-1 antialiased tracking-tight">Bhagyashree</p>
                        <p className="text-[10px] font-black text-accent-main tracking-[0.25em] uppercase opacity-90 antialiased">Enterprise Pro</p>
                    </div>
                    <div className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-[2px] shadow-2xl shadow-indigo-500/30 hover:scale-105 transition-transform cursor-pointer">
                        <div className="w-full h-full rounded-[1.35rem] bg-bg-primary flex items-center justify-center">
                            <User size={28} className="text-accent-main" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
