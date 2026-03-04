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
        <header className="flex items-center justify-between gap-12 animate-reveal py-4 w-full z-50">
            <form onSubmit={handleSubmit} className="flex-1 relative max-w-4xl group">
                <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center gap-5">
                    <Search className="text-text-dim w-6 h-6 group-focus-within:text-accent-main transition-all duration-500 group-focus-within:scale-110" />
                    <div className="h-6 w-px bg-white/5 hidden sm:block group-focus-within:bg-accent-main/30 transition-colors"></div>
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search global destinations, cities, or areas..."
                    className="w-full bg-white/[0.015] border border-white/5 rounded-3xl py-6 pl-24 pr-12 text-text-primary placeholder:text-text-dim/40 focus:outline-none focus:border-accent-main/30 focus:bg-white/[0.03] focus:ring-[20px] focus:ring-accent-main/5 transition-all duration-700 font-bold text-xl shadow-inner backdrop-blur-2xl"
                />
                <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-accent-main hover:bg-accent-soft text-white rounded-2xl shadow-2xl shadow-indigo-500/20 transition-all active:scale-95 group/search"
                >
                    <Filter className="w-5 h-5 group-hover/search:rotate-90 transition-transform duration-500" />
                </button>
            </form>

            <div className="flex items-center gap-10 shrink-0">
                <button className="w-16 h-16 bg-white/[0.02] border border-white/5 rounded-2xl text-text-dim hover:text-white hover:bg-white/[0.04] hover:border-accent-main/20 transition-all duration-500 relative group">
                    <Bell size={24} className="group-hover:shake transition-transform" />
                    <span className="absolute top-4 right-4 w-3 h-3 bg-accent-alt rounded-full border-[3px] border-bg-deep shadow-[0_0_15px_rgba(244,63,94,0.4)]"></span>
                </button>

                <div className="flex items-center gap-8 pl-10 border-l border-white/5">
                    <div className="text-right hidden sm:block">
                        <p className="text-xl font-black text-white leading-none mb-1 antialiased tracking-tighter heading-premium">Bhagyashree</p>
                        <p className="text-[10px] font-black text-accent-main tracking-[0.25em] uppercase opacity-80 antialiased">Enterprise Node</p>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-[1px] hover:from-indigo-500 hover:to-purple-500 transition-all duration-700 cursor-pointer group/avatar shadow-2xl">
                        <div className="w-full h-full rounded-2xl bg-bg-deep flex items-center justify-center border border-white/5 group-hover/avatar:border-white/20 transition-all">
                            <User size={24} className="text-accent-main group-hover:scale-110 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
