import React, { useState, useEffect } from 'react';
import { Compass, Calculator, Moon, Book } from 'lucide-react';

const ToolsScreen: React.FC = () => {
  const [heading, setHeading] = useState(0);

  // Simple Compass Simulation (DeviceOrientation is tricky in desktop browser)
  useEffect(() => {
    const interval = setInterval(() => {
        // Just drifting animation for demo purposes
        setHeading(prev => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const qiblaDirection = 135; // Example approx direction

  return (
    <div className="px-5 pt-4 space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Tools</h2>
        
        {/* Qibla Finder Card */}
        <div className="glass-card p-6 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden h-72">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 z-10">Qibla Finder</h3>
            <div className="relative w-48 h-48 rounded-full border-4 border-gray-200 dark:border-white/10 flex items-center justify-center z-10 bg-white dark:bg-slate-900 shadow-inner">
                {/* Compass Rose */}
                <div 
                    className="absolute w-full h-full rounded-full transition-transform duration-700 ease-out"
                    style={{ transform: `rotate(${-heading}deg)` }}
                >
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400">N</div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400">S</div>
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">W</div>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">E</div>
                    
                    {/* Qibla Indicator */}
                    <div 
                        className="absolute w-1 h-3 bg-amber-500 top-[15%] left-1/2 -translate-x-1/2 origin-bottom rounded-full"
                        style={{ transform: `rotate(${qiblaDirection}deg) translateY(-20px)` }}
                    ></div>
                    <div 
                        className="absolute text-[10px] font-bold text-amber-500"
                         style={{ 
                             top: '25%', 
                             left: '50%', 
                             transform: `translate(-50%, -50%) rotate(${qiblaDirection}deg) translateY(-35px)` 
                        }}
                    >
                        Kaaba
                    </div>
                </div>
                
                {/* Center Needle */}
                <div className="w-1 h-20 bg-emerald-500 rounded-full relative z-20"></div>
                <div className="w-4 h-4 bg-emerald-600 rounded-full absolute z-30 border-2 border-white"></div>
            </div>
            <p className="text-xs text-gray-400 mt-4 z-10">Point your device to find Qibla</p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4 rounded-2xl flex flex-col items-center gap-3 hover:bg-white/50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                    <Calculator size={24} />
                </div>
                <span className="font-medium text-slate-700 dark:text-gray-200">Zakat Calc</span>
            </div>
            <div className="glass-card p-4 rounded-2xl flex flex-col items-center gap-3 hover:bg-white/50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Book size={24} />
                </div>
                <span className="font-medium text-slate-700 dark:text-gray-200">Hadith</span>
            </div>
            <div className="glass-card p-4 rounded-2xl flex flex-col items-center gap-3 hover:bg-white/50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <Moon size={24} />
                </div>
                <span className="font-medium text-slate-700 dark:text-gray-200">Prayer Tracker</span>
            </div>
             <div className="glass-card p-4 rounded-2xl flex flex-col items-center gap-3 hover:bg-white/50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                    <Compass size={24} />
                </div>
                <span className="font-medium text-slate-700 dark:text-gray-200">Mosques</span>
            </div>
        </div>
    </div>
  );
};

export default ToolsScreen;
