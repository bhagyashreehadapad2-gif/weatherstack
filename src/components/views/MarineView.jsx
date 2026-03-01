import React from 'react';
import { Anchor, Waves, Wind, Navigation } from 'lucide-react';

const MarineView = ({ data }) => {
    return (
        <div className="flex flex-col gap-10 animate-fade-in">
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8 glass-panel p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Anchor size={120} />
                    </div>
                    <h2 className="text-2xl font-bold font-accent mb-2">Marine Metrics</h2>
                    <p className="text-text-secondary mb-8">Coastal and offshore weather conditions</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/5">
                        <MarineStat label="Wind Velocity" value={`${data?.current?.wind_speed} km/h`} trend={data?.current?.wind_degree + '°'} />
                        <MarineStat label="Pressure" value={`${data?.current?.pressure} hPa`} trend="Stable" />
                        <MarineStat label="Visibility" value={`${data?.current?.visibility} km`} trend="Optimal" />
                    </div>
                </div>

                <div className="col-span-4 glass-card p-8 flex flex-col justify-between">
                    <div>
                        <Wind className="text-accent-main mb-4" />
                        <h3 className="text-lg font-bold">Wind Direction</h3>
                        <p className="text-text-secondary text-sm">North-East (45°)</p>
                    </div>
                    <div className="flex justify-center py-6">
                        <div className="w-24 h-24 rounded-full border-4 border-glass-border flex items-center justify-center relative">
                            <Navigation className="text-accent-main rotate-45" size={40} />
                            <div className="absolute -top-6 text-xs font-bold">N</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-panel p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Waves className="text-accent-main" /> Wave Periods
                </h3>
                <div className="h-32 flex items-end gap-2">
                    {[40, 60, 45, 80, 55, 70, 50, 90, 65, 75, 55, 85].map((h, i) => (
                        <div
                            key={i}
                            style={{ height: `${h}%` }}
                            className="flex-1 bg-gradient-to-t from-accent-main/40 to-accent-main rounded-t-sm opacity-60 hover:opacity-100 transition-opacity"
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const MarineStat = ({ label, value, trend }) => (
    <div>
        <p className="text-xs text-text-secondary uppercase tracking-widest font-semibold mb-1">{label}</p>
        <p className="text-3xl font-bold font-accent">{value}</p>
        <p className="text-xs text-emerald-400 font-medium mt-1">{trend}</p>
    </div>
);

export default MarineView;
