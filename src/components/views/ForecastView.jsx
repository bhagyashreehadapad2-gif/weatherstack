import { motion } from 'framer-motion';

const ForecastView = ({ data }) => {
    // Priority: Real data from API, then mock data for free tier
    const forecastDays = data?.forecast ? Object.entries(data.forecast).map(([date, details]) => ({
        day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        temp: details.avgtemp,
        condition: details.condition || 'Clear',
        icon: Sun
    })) : [
        { day: 'Mon', temp: 22, condition: 'Sunny', icon: Sun },
        { day: 'Tue', temp: 19, condition: 'Cloudy', icon: Wind },
        { day: 'Wed', temp: 21, condition: 'Rain', icon: CloudRain },
        { day: 'Thu', temp: 24, condition: 'Clear', icon: Sun },
        { day: 'Fri', temp: 18, condition: 'Showers', icon: Droplets },
        { day: 'Sat', temp: 23, condition: 'Partly Cloudy', icon: Wind },
        { day: 'Sun', temp: 25, condition: 'Sunny', icon: Sun },
    ];

    return (
        <div className="flex flex-col gap-10">
            <div className="glass-panel p-10 lg:p-16 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-main/5 blur-[120px] rounded-full"></div>

                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="px-4 py-1.5 bg-accent-main/10 border border-accent-main/20 rounded-full text-accent-main text-[10px] font-black uppercase tracking-[0.3em] mb-4 inline-block">
                            Climate Intelligence
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-extrabold heading-premium text-white tracking-tighter text-gradient leading-none">Extended Forecast</h2>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-black text-white heading-premium mb-1">7 Days</p>
                        <p className="text-[10px] font-black text-text-dim uppercase tracking-widest">Confidence: 94%</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
                    {forecastDays.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-8 flex flex-col items-center gap-6 text-center border-white/5 hover:border-accent-main/20"
                        >
                            <span className="text-[10px] font-black text-text-dim uppercase tracking-[0.3em]">{item.day}</span>
                            <div className="w-16 h-16 bg-white/[0.02] rounded-2xl flex items-center justify-center p-3">
                                <item.icon className="w-full h-full text-accent-main" />
                            </div>
                            <div className="text-3xl font-extrabold heading-premium text-white">{item.temp}°</div>
                            <span className="text-[10px] font-black text-text-dim uppercase tracking-widest">{item.condition}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
                <ForecastDetailCard title="Probability of Precipitation" value="12%" icon={Droplets} />
                <ForecastDetailCard title="Atmospheric Humidity" value="64%" icon={Wind} />
                <ForecastDetailCard title="Solar Radiation Index" value="High" icon={Sun} />
            </div>
        </div>
    );
};

const ForecastDetailCard = ({ title, value, icon: Icon }) => (
    <div className="glass-card p-8 flex items-center gap-6 group">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.02] flex items-center justify-center border border-white/5 transition-all duration-500 group-hover:border-accent-main/20 group-hover:bg-accent-main/5">
            <Icon className="text-accent-main w-8 h-8 group-hover:scale-110 transition-transform" />
        </div>
        <div>
            <p className="text-[10px] text-text-dim uppercase tracking-[0.3em] font-black mb-1">{title}</p>
            <p className="text-2xl font-black heading-premium text-white">{value}</p>
        </div>
    </div>
);

export default ForecastView;
