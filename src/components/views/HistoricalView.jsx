import React from 'react';
import { History, Calendar, Thermometer, Droplets, Wind } from 'lucide-react';

const HistoricalView = ({ data }) => {
    // Priority: Real data, then mock data
    const historicalStats = data?.historical ? Object.entries(data.historical).map(([date, details]) => ({
        date,
        temp: details.avgtemp,
        humidity: details.humidity,
        wind: details.wind_speed,
        condition: details.condition || 'Clear'
    })) : [
        { date: '2025-02-28', temp: 21, humidity: 45, wind: 12, condition: 'Sunny' },
        { date: '2025-02-27', temp: 19, humidity: 55, wind: 18, condition: 'Cloudy' },
        { date: '2025-02-26', temp: 18, humidity: 60, wind: 22, condition: 'Showers' },
        { date: '2025-02-25', temp: 22, humidity: 40, wind: 10, condition: 'Clear' },
        { date: '2025-02-24', temp: 20, humidity: 50, wind: 14, condition: 'Partly Cloudy' },
    ];

    return (
        <div className="flex flex-col gap-10 animate-fade-in">
            <div className="glass-panel p-10 lg:p-12 shadow-2xl">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-bold font-accent text-white tracking-tight uppercase">Climate History Report</h2>
                        <p className="text-text-secondary mt-2">Archived meteorological data for {data?.location?.name}</p>
                    </div>
                    <div className="px-5 py-2.5 bg-accent-main/10 border border-accent-main/20 rounded-xl text-accent-main text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
                        Institutional Archives
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="pb-6 text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] opacity-60">Archive Date</th>
                                <th className="pb-6 text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] opacity-60">Avg Temp</th>
                                <th className="pb-6 text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] opacity-60">Humidity</th>
                                <th className="pb-6 text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] opacity-60">Wind Velocity</th>
                                <th className="pb-6 text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] opacity-60">Condition</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historicalStats.map((stat, index) => (
                                <tr key={index} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                    <td className="py-6 font-bold text-white flex items-center gap-3">
                                        <Calendar size={16} className="text-accent-main opacity-60" />
                                        {stat.date}
                                    </td>
                                    <td className="py-6 font-bold text-white"><span className="text-accent-main/80 mr-1">↑</span>{stat.temp}°C</td>
                                    <td className="py-6 text-text-secondary font-medium">{stat.humidity}%</td>
                                    <td className="py-6 text-text-secondary font-medium">{stat.wind} km/h</td>
                                    <td className="py-6">
                                        <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-white uppercase tracking-widest group-hover:border-accent-main/30 transition-all">
                                            {stat.condition}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-10 flex flex-col justify-between group h-64">
                    <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.4em] mb-6 opacity-60">Monthly Temperature Delta</h3>
                    <div className="flex items-end gap-3 h-32">
                        {[40, 70, 45, 90, 65, 85, 50, 75].map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-accent-main/20 hover:bg-accent-main rounded-t-lg transition-all duration-500 cursor-help"
                                style={{ height: `${h}%` }}
                                title={`Delta: ${h / 10}°C`}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-10 flex items-center gap-8 group h-64">
                    <div className="w-24 h-24 rounded-full border-[10px] border-accent-main/10 border-t-accent-main flex items-center justify-center relative">
                        <Thermometer size={32} className="text-accent-main" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-white mb-2">Climate Stability</h4>
                        <p className="text-sm text-text-secondary font-medium leading-relaxed">The regional climate has maintained an 84% stability rating over the last fiscal quarter with minimal thermal variance.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoricalView;
