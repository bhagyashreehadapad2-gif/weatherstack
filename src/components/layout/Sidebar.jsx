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
        <aside className="w-80 glass-panel p-8 flex flex-col gap-10 h-[calc(100vh-4rem)] sticky top-8">
            <div className="flex items-center gap-4 px-2 mb-4">
                <div className="w-10 h-10 bg-accent-main rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <span className="text-white font-bold text-2xl font-accent italic">W</span>
                </div>
                <h1 className="text-2xl font-bold font-accent tracking-tighter text-white">SkyCast<span className="text-accent-main italic">Pro</span></h1>
            </div>

            <nav className="flex flex-col gap-3">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 border border-transparent ${activeTab === item.id
                            ? 'bg-accent-main text-white shadow-xl shadow-indigo-500/30 border-white/10'
                            : 'text-text-secondary hover:bg-glass-bg hover:text-text-primary hover:border-glass-border'
                            }`}
                    >
                        <item.icon size={22} />
                        <span className="font-semibold">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-glass-border">
                <button className="flex items-center gap-4 px-5 py-4 rounded-2xl text-text-secondary hover:bg-glass-bg hover:text-text-primary w-full transition-all border border-transparent hover:border-glass-border">
                    <Settings size={22} />
                    <span className="font-semibold">Settings</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
