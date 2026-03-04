import React from 'react';
import { Anchor, Waves, Wind, Navigation, Thermometer, Droplets, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const MarineView = ({ data }) => {
    // Mock data for premium marine view
    const marineStats = [
        { label: 'Wave Height', value: '1.2m', icon: Waves, detail: 'Slight North swell' },
        { label: 'Water Temp', value: '24°C', icon: Thermometer, detail: 'Tropical gradient' },
        { label: 'Tide Level', value: 'High', icon: Droplets, detail: 'Peak cycle reached' },
        { label: 'Visibility', value: '8nm', icon: Eye, detail: 'Clear horizon' },
        { label: 'Wind Gusts', value: '15kts', icon: Wind, detail: 'Offshore breeze' },
        { label: 'Vessel Safety', value: 'Prime', icon: Anchor, detail: 'Conditions optimal' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <motion.div
            className="flex flex-col gap-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="glass-panel p-10 lg:p-16 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-accent-main/5"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full"></div>

                <div className="relative z-10 text-center max-w-2xl mx-auto mb-16">
                    <span className="px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6 inline-block">
                        Oceanic Intelligence
                    </span>
                    <h2 className="text-5xl lg:text-7xl font-extrabold heading-premium text-white tracking-tighter text-gradient leading-tight mb-6">Marine Operations</h2>
                    <p className="text-text-dim font-bold uppercase tracking-[0.2em] text-xs">Real-time condition monitoring for maritime assets</p>
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {marineStats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="glass-card p-10 bg-white/[0.015] border-white/5 hover:border-blue-500/30 transition-all duration-500 group"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="p-4 bg-blue-500/5 rounded-2xl group-hover:bg-blue-500/20 transition-all duration-500">
                                    <stat.icon className="text-blue-400 w-8 h-8 group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="text-[10px] font-black text-blue-400/50 uppercase tracking-widest">{stat.label}</span>
                            </div>
                            <p className="text-5xl font-black heading-premium text-white mb-3 text-gradient group-hover:from-white group-hover:to-blue-200">{stat.value}</p>
                            <p className="text-[10px] font-black text-text-dim uppercase tracking-[0.2em]">{stat.detail}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.div
                variants={itemVariants}
                className="glass-card p-12 flex flex-col md:flex-row items-center justify-between gap-12 bg-gradient-to-r from-blue-500/5 via-white/[0.01] to-accent-main/5 border-white/5"
            >
                <div className="flex items-center gap-10">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
                        <Anchor className="text-emerald-400 w-10 h-10" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black heading-premium text-white tracking-tight mb-2">Navigation Safety Notice</h3>
                        <p className="text-text-dim font-bold text-sm uppercase tracking-widest leading-relaxed">System protocols confirm safe operational window for all vessel classes.</p>
                    </div>
                </div>
                <button className="px-10 py-5 bg-blue-500 hover:bg-blue-400 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-[0_20px_40px_-10px_rgba(59,130,246,0.5)] transition-all active:scale-95 whitespace-nowrap">
                    Download Report
                </button>
            </motion.div>
        </motion.div>
    );
};

export default MarineView;
