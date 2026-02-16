import React, { useEffect, useState } from 'react';
import { Clock, BookOpen, ChevronRight, MapPin, Heart, Target } from 'lucide-react';
import { getPrayerTimes, getHijriDate } from '../services/prayerService';
import { PrayerTime } from '../types';

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const [prayers, setPrayers] = useState<PrayerTime[]>([]);
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('00:00:00');

  useEffect(() => {
    // Load prayers
    getPrayerTimes(0, 0).then(data => {
      setPrayers(data);
      const next = data.find(p => p.isNext) || data[0]; // Default to Fajr if all passed
      setNextPrayer(next);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!nextPrayer) return;
      // Simple countdown simulation for visual effect
      const now = new Date();
      // Logic to calc real diff would go here
      setTimeLeft(`${23 - now.getHours()}:${59 - now.getMinutes()}:${59 - now.getSeconds()}`);
    }, 1000);
    return () => clearInterval(timer);
  }, [nextPrayer]);

  return (
    <div className="px-5 space-y-6">
      {/* Greeting & Date */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Assalamu Alaikum</p>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-cream">Brother Ahmed</h2>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-gray-400">Gregorian</p>
          <p className="text-sm font-semibold dark:text-gray-200">{new Date().toDateString()}</p>
          <p className="text-xs text-emerald-600 dark:text-amber-400 font-serif mt-1">{getHijriDate()}</p>
        </div>
      </div>

      {/* Next Prayer Card - Hero */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/20 group">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-950 z-0"></div>
        {/* Geometric Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] z-0"></div>
        
        <div className="relative z-10 p-6 text-white flex flex-col items-center justify-center py-10">
          <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <MapPin size={10} /> Cairo, EG
          </div>
          
          <p className="text-emerald-200 text-sm uppercase tracking-wider mb-2">Next Prayer</p>
          <h1 className="text-4xl font-bold mb-1 font-serif">{nextPrayer?.name || 'Loading...'}</h1>
          <p className="text-5xl font-mono font-light tracking-tight text-amber-400 my-4 tabular-nums">
             {nextPrayer ? nextPrayer.time : '--:--'}
          </p>
          <p className="text-emerald-200 text-sm">Begins in <span className="font-mono text-white">{timeLeft}</span></p>

          <div className="w-full mt-8 flex justify-between px-4">
            {prayers.filter(p => p.name !== 'Sunrise').slice(0, 5).map((p, idx) => (
              <div key={idx} className={`flex flex-col items-center gap-1 ${p.isNext ? 'opacity-100 scale-110' : 'opacity-50'}`}>
                <span className="text-[10px] uppercase">{p.name[0]}</span>
                <div className={`w-2 h-2 rounded-full ${p.isNext ? 'bg-amber-400' : 'bg-white'}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Reading */}
      <div 
        onClick={() => onNavigate('quran')}
        className="glass-card p-5 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-white/50 dark:hover:bg-emerald-900/40 transition-colors"
      >
        <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
          <BookOpen size={24} />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">Continue Reading</p>
          <h3 className="font-bold text-lg dark:text-gray-100">Surah Al-Kahf</h3>
          <p className="text-xs text-gray-400 dark:text-gray-500">Ayah 45 • Page 298</p>
        </div>
        <ChevronRight className="text-gray-400" />
      </div>

      {/* Global Counters Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 rounded-2xl relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-5 text-emerald-500">
            <Heart size={80} />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Heart size={16} className="text-emerald-500 fill-emerald-500" />
            <span className="text-xs font-bold uppercase text-gray-400">Global Salawat</span>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-white font-mono">1,240,592</p>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400">+452 reading now</p>
        </div>

        <div className="glass-card p-4 rounded-2xl relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-5 text-blue-500">
            <Target size={80} />
          </div>
          <div className="flex items-center gap-2 mb-2">
             <Target size={16} className="text-blue-500" />
            <span className="text-xs font-bold uppercase text-gray-400">Dhikr Goal</span>
          </div>
          <div className="flex items-end gap-1">
             <p className="text-2xl font-bold text-slate-800 dark:text-white">85</p>
             <p className="text-sm text-gray-400 mb-1">/ 100</p>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-2">
            <div className="bg-blue-500 h-1.5 rounded-full w-[85%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
