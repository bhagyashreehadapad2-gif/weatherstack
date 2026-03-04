import React from 'react';
import { LayoutDashboard, Calendar, History, Anchor, MapPin, Settings } from 'lucide-react';

const Sidebar = ({ activeTab, onTabChange }) => {
    const menuItems = [
        { id: 'current', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'forecast', label: 'Forecast', icon: Calendar },
        { id: 'historical', label: 'Historical', icon: History },
        { id: 'marine', label: 'Marine', icon: Anchor },
        { id: 'location', label: 'Location', icon: MapPin },
    ];

    return (
        <aside className="w-80 glass-panel p-10 flex flex-col gap-12 h-[calc(100vh-6rem)] sticky top-12">
            <div className="flex items-center gap-5 px-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-accent-main to-accent-soft rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/40 relative group/logo">
                    <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover/logo:opacity-100 transition-opacity"></div>
                    <span className="text-white font-black text-2xl font-accent italic relative z-10">W</span>
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold heading-premium tracking-tighter text-white leading-none">SkyCast<span className="text-accent-main italic font-black">Pro</span></h1>
                    <p className="text-[10px] font-black text-text-dim uppercase tracking-[0.2em] mt-1">Intelligence Layer</p>
                </div>
            </div>

            <nav className="flex flex-col gap-4">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={`nav-item flex items-center gap-5 px-6 py-5 transition-all duration-500 border border-transparent ${activeTab === item.id
                            ? 'active'
                            : 'text-text-secondary'
                            }`}
                    >
                        <item.icon size={20} className={`${activeTab === item.id ? 'opacity-100' : 'opacity-60'}`} />
                        <span className={`font-extrabold tracking-tight ${activeTab === item.id ? 'text-white' : 'text-inherit'}`}>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-white/5">
                <button className="nav-item flex items-center gap-5 px-6 py-5 text-text-dim hover:text-white group">
                    <Settings size={20} className="opacity-60 group-hover:rotate-45 transition-transform duration-500" />
                    <span className="font-extrabold tracking-tight">System Settings</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
