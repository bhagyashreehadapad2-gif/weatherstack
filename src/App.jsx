import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Search, Filter, Bell, User, Thermometer } from 'lucide-react';
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

  const fetchWeather = async (query) => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const data = await weatherService.getCurrent(query);
      setWeatherData(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(location);
  }, []);

  const renderContent = () => {
    if (error) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-12 glass-panel text-center animate-fade-in">
          <div className="w-20 h-20 bg-accent-alt/10 rounded-full flex items-center justify-center mb-6">
            <MapPin className="text-accent-alt w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold font-accent mb-4 text-white">Location Not Found</h2>
          <p className="text-text-secondary max-w-md mx-auto mb-8 font-medium">
            "{location}" could not be resolved. Please check the spelling or try searching for a different city or zip code.
          </p>
          <button
            onClick={() => fetchWeather('New York')}
            className="px-8 py-3 bg-accent-main text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20 hover:scale-105 transition-transform"
          >
            Reset to Default
          </button>
        </div>
      );
    }

    if (!weatherData && !loading) return null;

    switch (activeTab) {
      case 'forecast':
        return <ForecastView data={weatherData} />;
      case 'marine':
        return <MarineView data={weatherData} />;
      case 'location':
        return <LocationView data={weatherData} />;
      case 'historical':
        return <HistoricalView data={weatherData} />;
      case 'current':
      default:
        return (
          <div className="grid grid-cols-12 gap-8 lg:gap-10 animate-fade-in">
            {/* Main Stats Card */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-10">
              <div className="glass-panel p-10 lg:p-12 flex flex-col justify-between min-h-[550px] relative overflow-hidden group shadow-2xl">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent-main/5 blur-[120px] -mr-48 -mt-48 rounded-full group-hover:bg-accent-main/10 transition-all duration-1000"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6">
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-bold font-accent mb-4 text-white tracking-tight leading-none">
                      {weatherData?.location?.name}
                    </h2>
                    <div className="flex items-center gap-3 text-text-secondary">
                      <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <MapPin size={18} className="text-accent-main" />
                      </div>
                      <p className="uppercase tracking-[0.25em] font-extrabold text-xs lg:text-sm opacity-80 antialiased">
                        {weatherData?.location?.region}, {weatherData?.location?.country}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 py-3 bg-accent-main/10 border border-accent-main/20 rounded-full text-accent-main text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md shadow-2xl shadow-indigo-500/10 self-start md:self-auto">
                    Live Data Synced
                  </div>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 lg:gap-24 py-12">
                  <div className="flex flex-col items-center md:items-start group/temp">
                    <span className="text-[12px] font-black text-accent-main uppercase tracking-[0.6em] mb-4 opacity-70 group-hover/temp:opacity-100 transition-opacity">Primary Thermal Reading</span>
                    <div className="text-[12rem] lg:text-[18rem] font-bold font-accent tracking-tighter leading-none text-white filter drop-shadow-[0_20px_60px_rgba(255,255,255,0.15)] transition-transform group-hover/temp:scale-105 duration-700">
                      {weatherData?.current?.temperature}<span className="text-[6rem] lg:text-[9rem] text-accent-main font-light align-top ml-2">°</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center md:items-start gap-8">
                    <div className="w-36 lg:w-48 h-36 lg:h-48 bg-white/[0.03] rounded-[3rem] flex items-center justify-center p-8 lg:p-10 border border-white/10 shadow-3xl backdrop-blur-3xl group-hover:bg-white/10 transition-all duration-700 hover:rotate-3">
                      <img
                        src={weatherData?.current?.weather_icons[0]}
                        alt="weatherIcon"
                        className="w-full h-full object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)]"
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-4xl lg:text-6xl font-bold text-white mb-2 tracking-tight">{weatherData?.current?.weather_descriptions[0]}</p>
                      <div className="flex items-center gap-3">
                        <Thermometer size={24} className="text-accent-main" />
                        <p className="text-2xl text-text-secondary font-medium opacity-80">Apparent Index: {weatherData?.current?.feelslike}°C</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 mt-8 pt-12 border-t border-white/5">
                  <StatItem label="Humidity" value={`${weatherData?.current?.humidity}%`} />
                  <StatItem label="Wind velocity" value={`${weatherData?.current?.wind_speed} km/h`} />
                  <StatItem label="Visibility range" value={`${weatherData?.current?.visibility} km`} />
                  <StatItem label="Barometric pressure" value={`${weatherData?.current?.pressure} hPa`} />
                </div>
              </div>
            </div>

            {/* Side Cards */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-10">
              <div className="glass-card p-10 lg:p-12 flex flex-col justify-between group overflow-hidden relative shadow-2xl min-h-[250px]">
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent-main/10 blur-[80px] rounded-full transition-all duration-1000 group-hover:bg-accent-main/20"></div>
                <div>
                  <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.4em] mb-12 opacity-60 antialiased">Atmospheric Density</h3>
                  <div className="text-6xl lg:text-7xl font-bold font-accent text-white mb-8">
                    {weatherData?.current?.cloudcover}%
                    <span className="text-2xl text-text-secondary opacity-40 font-normal ml-3">Clouds</span>
                  </div>
                </div>
                <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden shadow-inner flex items-center p-1 border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-accent-main to-accent-main rounded-full transition-all duration-1000 shadow-[0_0_35px_rgba(99,102,241,0.7)]"
                    style={{ width: `${weatherData?.current?.cloudcover}%` }}
                  ></div>
                </div>
              </div>

              <div className="glass-card p-10 lg:p-12 flex flex-col justify-between group min-h-[200px] shadow-2xl">
                <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.4em] mb-12 opacity-60 antialiased">Radiation Index</h3>
                <div className="flex items-baseline gap-5">
                  <div className="text-7xl lg:text-8xl font-bold font-accent text-white leading-none tracking-tight">
                    {weatherData?.current?.uv_index}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-xs font-black text-amber-400 py-1.5 px-4 bg-amber-400/10 rounded-xl uppercase tracking-widest border border-amber-400/20 shadow-lg shadow-amber-400/5 antialiased">
                      Moderate Level
                    </div>
                    <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest opacity-50 ml-1">Protective gear advised</p>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-10 overflow-hidden relative group cursor-default shadow-2xl transition-all duration-500 hover:bg-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.4em] mb-8 opacity-60 antialiased">Sync Timestamp</p>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-accent-main/10 rounded-2xl flex items-center justify-center border border-accent-main/20">
                    <Clock className="text-accent-main w-6 h-6 animate-pulse" />
                  </div>
                  <p className="text-3xl lg:text-4xl font-bold font-accent text-white tracking-[0.1em] uppercase leading-none">
                    {weatherData?.current?.observation_time}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app-container p-6 lg:p-12">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="main-content">
        <Header onSearch={(q) => { setLocation(q); fetchWeather(q); }} />

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

const StatItem = ({ label, value }) => (
  <div className="group/stat hover:bg-white/5 p-6 -m-6 rounded-[2rem] transition-all duration-500 cursor-default border border-transparent hover:border-white/5">
    <p className="text-[10px] text-text-secondary uppercase tracking-[0.25em] mb-3 font-black opacity-60 antialiased group-hover/stat:opacity-100 group-hover/stat:text-accent-main transition-all">{label}</p>
    <p className="text-3xl lg:text-4xl font-bold font-accent text-white transition-all group-hover/stat:scale-110 origin-left">{value}</p>
  </div>
);

export default App;
