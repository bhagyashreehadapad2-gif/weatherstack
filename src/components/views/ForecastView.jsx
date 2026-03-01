import React from 'react';
import { CloudRain, Sun, Wind, Droplets } from 'lucide-react';

const ForecastView = ({ data }) => {
    // Mocking forecast data if not available in free tier
    const mockForecast = [
        { day: 'Mon', temp: 22, condition: 'Sunny', icon: Sun },
        { day: 'Tue', temp: 19, condition: 'Cloudy', icon: Wind },
        { day: 'Wed', temp: 21, condition: 'Rain', icon: CloudRain },
        { day: 'Thu', temp: 24, condition: 'Clear', icon: Sun },
        { day: 'Fri', temp: 18, condition: 'Showers', icon: Droplets },
        { day: 'Sat', temp: 23, condition: 'Partly Cloudy', icon: Wind },
        { day: 'Sun', temp: 25, condition: 'Sunny', icon: Sun },
    ];

    return (
        <div className="flex flex-col gap-10 animate-fade-in">
            <div className="glass-panel p-10 lg:p-12 shadow-2xl">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-bold font-accent text-white tracking-tight uppercase">Extended Climate Forecast</h2>
                    <div className="px-4 py-2 bg-accent-main/10 border border-accent-main/20 rounded-xl text-accent-main text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
                        7-Day Projection
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
                    {mockForecast.map((item, index) => (
                        <div key={index} className="glass-card p-4 flex flex-col items-center gap-3 text-center">
                            <span className="text-sm font-semibold text-text-secondary uppercase">{item.day}</span>
                            <item.icon className="w-8 h-8 text-accent-main" />
                            <div className="text-xl font-bold">{item.temp}°</div>
                            <span className="text-xs text-text-secondary">{item.condition}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <ForecastDetailCard title="Precipitation" value="12%" icon={Droplets} />
                <ForecastDetailCard title="Humidity" value="64%" icon={Wind} />
                <ForecastDetailCard title="UV Index" value="High" icon={Sun} />
            </div>
        </div>
    );
};

const ForecastDetailCard = ({ title, value, icon: Icon }) => (
    <div className="glass-card p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-glass-bg flex items-center justify-center">
            <Icon className="text-accent-main w-6 h-6" />
        </div>
        <div>
            <p className="text-xs text-text-secondary uppercase tracking-widest font-semibold">{title}</p>
            <p className="text-xl font-bold">{value}</p>
        </div>
    </div>
);

export default ForecastView;
