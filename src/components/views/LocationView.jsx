import React from 'react';
import { MapPin, Globe, Clock, Navigation } from 'lucide-react';

const LocationView = ({ data }) => {
    return (
        <div className="flex flex-col gap-8 animate-fade-in">
            <div className="glass-panel p-8">
                <h2 className="text-2xl font-bold font-accent mb-6 flex items-center gap-2">
                    <MapPin className="text-accent-main" /> Location Intelligence
                </h2>

                <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <LocationDetailItem label="City" value={data?.location?.name} />
                        <LocationDetailItem label="Region" value={data?.location?.region} />
                        <LocationDetailItem label="Country" value={data?.location?.country} />
                        <LocationDetailItem label="Coordinates" value={`${data?.location?.lat}, ${data?.location?.lon}`} />
                    </div>

                    <div className="space-y-6">
                        <LocationDetailItem label="Timezone" value={data?.location?.timezone_id} icon={Globe} />
                        <LocationDetailItem label="Local Time" value={data?.location?.localtime} icon={Clock} />
                        <LocationDetailItem label="UTC Offset" value={data?.location?.utc_offset} icon={Navigation} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 h-48 flex flex-col justify-end overflow-hidden relative group">
                    <div className="absolute top-4 left-4 text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] opacity-60">Precipitation Probability</div>
                    <div className="text-4xl font-bold font-accent text-white">{data?.current?.precip > 0 ? 'High' : 'Low'} <span className="text-sm opacity-60 tracking-widest">{data?.current?.precip} mm/h</span></div>
                    <div className="w-full h-1.5 mt-4 bg-white/5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-accent-main transition-all duration-1000 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                            style={{ width: data?.current?.precip > 0 ? '80%' : '5%' }}
                        ></div>
                    </div>
                </div>

                <div className="glass-card p-6 h-48 flex flex-col justify-end group">
                    <div className="absolute top-4 left-4 text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] opacity-60">Atmospheric Stability</div>
                    <div className="text-4xl font-bold font-accent text-white">Optimal</div>
                    <div className="flex gap-1.5 mt-4 h-10 items-end">
                        {[30, 50, 70, 90, 100].map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-gradient-to-t from-accent-main/40 to-accent-main rounded-md transition-all duration-500 group-hover:scale-y-110 origin-bottom"
                                style={{ height: `${h}%` }}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-6 h-48 flex flex-col justify-center items-center gap-4 group cursor-default">
                    <div className="w-14 h-14 rounded-2xl bg-accent-main/10 border border-accent-main/20 flex items-center justify-center group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-indigo-500/10">
                        <Globe className="text-accent-main" size={24} />
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] opacity-60 mb-1">Global Climate Sync</p>
                        <span className="text-sm font-bold text-white uppercase tracking-widest">Active nodes: 1,420+</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LocationDetailItem = ({ label, value, icon: Icon }) => (
    <div className="flex justify-between items-center border-b border-glass-border pb-4">
        <span className="text-sm font-medium text-text-secondary uppercase tracking-widest">{label}</span>
        <span className="text-lg font-bold flex items-center gap-2">
            {Icon && <Icon size={16} className="text-accent-main" />}
            {value}
        </span>
    </div>
);

export default LocationView;
