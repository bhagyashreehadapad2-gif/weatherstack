import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Search, Filter, Bell, User, Thermometer, Wind, Droplets, Cloud, Sun, Eye, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import ForecastView from './components/views/ForecastView';
import MarineView from './components/views/MarineView';
import LocationView from './components/views/LocationView';
import HistoricalView from './components/views/HistoricalView';
import { weatherService } from './services/weatherService';

function App() {
  const [activeTab, setActiveTab] = useState('current');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('New York');
  const [error, setError] = useState(null);

  const fetchWeather = async (query, type = 'current') => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      let data;
      switch (type) {
        case 'forecast':
          data = await weatherService.getForecast(query);
          break;
        case 'marine':
          data = await weatherService.getMarine(query);
          break;
        case 'historical':
          // Using yesterday's date as a default for historical
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const dateStr = yesterday.toISOString().split('T')[0];
          data = await weatherService.getHistorical(query, dateStr);
          break;
        case 'current':
        default:
          data = await weatherService.getCurrent(query);
      }
      setWeatherData(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(location, activeTab);
  }, [activeTab, location]);

  const renderContent = () => {
    if (error) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col items-center justify-center p-12 glass-panel text-center"
        >
          <div className="w-24 h-24 bg-accent-alt/10 rounded-full flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 bg-accent-alt/20 blur-2xl rounded-full"></div>
            <MapPin className="text-accent-alt w-12 h-12 relative z-10" />
          </div>
          <h2 className="text-4xl font-bold heading-premium mb-6 text-white text-gradient">Weather Insight Unavailable</h2>
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl mb-10 max-w-lg backdrop-blur-3xl shadow-2xl">
            <p className="text-accent-main font-black text-xs uppercase tracking-[0.3em] mb-4">Diagnostic Report</p>
            <p className="text-white/90 font-medium text-lg leading-relaxed">
              {error}
            </p>
          </div>
          <p className="text-text-secondary max-w-md mx-auto mb-10 font-medium text-lg">
            We couldn't retrieve intelligence for "{location}". This typically occurs with restricted queries or API protocol mismatches.
          </p>
          <button
            onClick={() => { setLocation('New York'); fetchWeather('New York', activeTab); }}
            className="px-10 py-4 bg-accent-main hover:bg-accent-soft text-white font-extrabold rounded-2xl shadow-2xl shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all duration-300 uppercase tracking-widest text-xs"
          >
            Reconnect to Global Node
          </button>
        </motion.div>
      );
    }

    if (!weatherData && !loading) return null;

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {(() => {
            switch (activeTab) {
              case 'forecast': return <ForecastView data={weatherData} />;
              case 'marine': return <MarineView data={weatherData} />;
              case 'location': return <LocationView data={weatherData} />;
              case 'historical': return <HistoricalView data={weatherData} />;
              case 'current':
              default:
                return (
                  <div className="grid grid-cols-12 gap-8 lg:gap-12">
                    {/* Main Stats Card */}
                    <div className="col-span-12 lg:col-span-8">
                      <div className="glass-panel p-10 lg:p-16 flex flex-col justify-between min-h-[600px] relative overflow-hidden group">
                        {/* Interactive Background Elements */}
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-main/10 blur-[150px] rounded-full group-hover:bg-accent-main/20 transition-all duration-1000"></div>
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full"></div>

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
                          <div>
                            <div className="flex items-center gap-4 mb-4">
                              <span className="px-4 py-1.5 bg-accent-main/10 border border-accent-main/20 rounded-full text-accent-main text-[10px] font-black uppercase tracking-[0.3em]">
                                Active Monitoring
                              </span>
                              <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                <span className="w-1.5 h-1.5 bg-emerald-500/40 rounded-full"></span>
                              </div>
                            </div>
                            <h2 className="text-6xl lg:text-7xl font-extrabold heading-premium text-white text-gradient leading-none tracking-tighter mb-4">
                              {weatherData?.location?.name}
                            </h2>
                            <div className="flex items-center gap-3 text-text-secondary">
                              <Compass size={18} className="text-accent-main opacity-70" />
                              <p className="uppercase tracking-[0.3em] font-black text-xs opacity-60">
                                {weatherData?.location?.region} // {weatherData?.location?.country}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="relative z-10 flex flex-col xl:flex-row items-center gap-12 lg:gap-20 py-16">
                          <div className="flex flex-col items-center md:items-start group/temp">
                            <span className="text-[10px] font-black text-text-dim uppercase tracking-[0.6em] mb-4 opacity-70 group-hover/temp:opacity-100 group-hover/temp:text-accent-main transition-all duration-500">Thermal Index</span>
                            <div className="text-[14rem] lg:text-[18rem] font-extrabold heading-premium tracking-tighter leading-none text-white filter drop-shadow-[0_20px_60px_rgba(255,255,255,0.1)] transition-transform group-hover/temp:scale-[1.02] duration-700">
                              {weatherData?.current?.temperature}<span className="text-[6rem] lg:text-[8rem] text-accent-main/80 font-light align-top ml-2">°</span>
                            </div>
                          </div>

                          <div className="flex flex-col items-center md:items-start gap-10">
                            <motion.div
                              whileHover={{ rotate: 5, scale: 1.05 }}
                              className="w-44 h-44 lg:w-56 lg:h-56 bg-white/[0.02] rounded-[3.5rem] flex items-center justify-center p-10 border border-white/10 shadow-3xl backdrop-blur-3xl relative"
                            >
                              <div className="absolute inset-0 bg-accent-main/5 blur-3xl rounded-full"></div>
                              <img
                                src={weatherData?.current?.weather_icons[0]}
                                alt="Weather State"
                                className="w-full h-full object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] relative z-10"
                              />
                            </motion.div>
                            <div className="text-center md:text-left">
                              <p className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight heading-premium">{weatherData?.current?.weather_descriptions[0]}</p>
                              <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
                                <Thermometer size={20} className="text-accent-main" />
                                <p className="text-lg text-text-secondary font-semibold">Feels like <span className="text-white font-black">{weatherData?.current?.feelslike}°C</span></p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12 pt-12 border-t border-white/10">
                          <StatItem label="Humidity" value={`${weatherData?.current?.humidity}%`} icon={Droplets} />
                          <StatItem label="Wind velocity" value={`${weatherData?.current?.wind_speed}km/h`} icon={Wind} />
                          <StatItem label="Visibility" value={`${weatherData?.current?.visibility}km`} icon={Eye} />
                          <StatItem label="Pressure" value={`${weatherData?.current?.pressure}hPa`} icon={Cloud} />
                        </div>
                      </div>
                    </div>

                    {/* Side Intelligence Column */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-8 lg:gap-12">
                      <div className="glass-card p-12 flex flex-col justify-between group h-full">
                        <div className="absolute -top-20 -right-20 w-48 h-48 bg-accent-main/10 blur-[80px] rounded-full transition-all duration-1000 group-hover:bg-accent-main/20"></div>
                        <div>
                          <p className="text-[10px] font-black text-text-dim uppercase tracking-[0.5em] mb-12 antialiased">Atmospheric Density</p>
                          <div className="text-7xl font-extrabold heading-premium text-white mb-10 text-gradient">
                            {weatherData?.current?.cloudcover}%
                            <span className="text-2xl text-text-dim font-medium ml-4 tracking-tight">Cloud Density</span>
                          </div>
                        </div>
                        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${weatherData?.current?.cloudcover}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-indigo-500 via-accent-soft to-white/40 rounded-full shadow-[0_0_25px_rgba(99,102,241,0.5)]"
                          ></motion.div>
                        </div>
                      </div>

                      <div className="glass-panel p-12 flex flex-col justify-between group shadow-none">
                        <p className="text-[10px] font-black text-text-dim uppercase tracking-[0.5em] mb-12 antialiased">Ultraviolet Exposure</p>
                        <div className="flex items-end justify-between">
                          <div className="text-8xl font-extrabold heading-premium text-white leading-none tracking-tighter text-gradient">
                            {weatherData?.current?.uv_index}
                          </div>
                          <div className="text-right">
                            <span className="inline-block px-4 py-1.5 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[10px] font-black uppercase tracking-widest rounded-lg mb-4">
                              Caution Advised
                            </span>
                            <p className="text-xs text-text-dim font-bold uppercase tracking-widest leading-relaxed">Protective Gear Recommended</p>
                          </div>
                        </div>
                      </div>

                      <div className="glass-card p-8 group border-transparent hover:border-accent-main/20">
                        <div className="flex items-center gap-8">
                          <div className="w-16 h-16 bg-accent-main/10 rounded-3xl flex items-center justify-center border border-accent-main/20 relative">
                            <div className="absolute inset-0 bg-accent-main/10 blur-xl animate-pulse"></div>
                            <Clock className="text-accent-main w-8 h-8 relative z-10" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-text-dim uppercase tracking-[0.4em] mb-2 antialiased">System Sync</p>
                            <p className="text-3xl font-extrabold heading-premium text-white tracking-[0.1em]">
                              {weatherData?.current?.observation_time}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="app-container p-6 lg:p-12">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="main-content">
        <Header onSearch={(q) => { setLocation(q); }} />

        <div className="flex-1 mt-6">
          {loading ? (
            <div className="w-full h-[600px] flex flex-col items-center justify-center gap-6 animate-pulse">
              <div className="relative">
                <div className="w-24 h-24 border-[6px] border-accent-main/10 rounded-full"></div>
                <div className="w-24 h-24 border-[6px] border-accent-main border-t-transparent rounded-full animate-spin absolute top-0"></div>
              </div>
              <p className="text-text-secondary font-bold uppercase tracking-[0.4em] text-xs">Fetching Weather Intelligence...</p>
            </div>
          ) : renderContent()}
        </div>
      </main>
    </div>
  );
}

const StatItem = ({ label, value, icon: Icon }) => (
  <div className="group/stat hover:bg-white/5 p-6 -m-4 rounded-[2rem] transition-all duration-700 cursor-default border border-transparent hover:border-white/5 relative overflow-hidden">
    <div className="absolute inset-0 bg-accent-main/0 group-hover/stat:bg-accent-main/[0.02] transition-colors"></div>
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-white/5 rounded-xl group-hover/stat:bg-accent-main/10 group-hover/stat:text-accent-main transition-all duration-500">
          <Icon size={14} />
        </div>
        <p className="text-[10px] text-text-dim uppercase tracking-[0.25em] font-black opacity-60 antialiased group-hover/stat:opacity-100 transition-all">{label}</p>
      </div>
      <p className="text-3xl lg:text-4xl font-extrabold heading-premium text-white transition-all group-hover/stat:scale-110 origin-left group-hover/stat:text-gradient">
        {value}
      </p>
    </div>
  </div>
);

export default App;
