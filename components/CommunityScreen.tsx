import React, { useState } from 'react';
import { Users, Globe, Award, TrendingUp } from 'lucide-react';
import { LeaderboardUser } from '../types';

const leaderboardData: LeaderboardUser[] = [
  { rank: 1, name: "Abdullah M.", count: 15420, country: "SA" },
  { rank: 2, name: "Fatima Z.", count: 12300, country: "ID" },
  { rank: 3, name: "Yusuf K.", count: 11050, country: "TR" },
  { rank: 4, name: "Omar H.", count: 9800, country: "UK" },
  { rank: 5, name: "Aisha R.", count: 9500, country: "MY" },
];

const CommunityScreen: React.FC = () => {
  const [salawatCount, setSalawatCount] = useState(0);

  return (
    <div className="px-5 pt-4 space-y-6 pb-20">
      
      {/* Global Live Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-3xl p-6 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 bg-white/10 w-40 h-40 rounded-full blur-2xl"></div>
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-2">
             <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider flex items-center gap-1 animate-pulse">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div> LIVE
             </span>
          </div>
          <h2 className="text-sm font-medium text-emerald-100 uppercase tracking-widest mb-1">Global Salawat</h2>
          <p className="text-4xl font-mono font-bold tracking-tighter tabular-nums">1,240,592</p>
          <p className="text-xs text-emerald-100 mt-2">Muslims reciting right now</p>
        </div>
      </div>

      {/* Personal Counter */}
      <div className="glass-card p-6 rounded-3xl text-center space-y-4">
        <h3 className="text-gray-500 dark:text-gray-400 font-medium">Your Session</h3>
        <div className="text-6xl font-bold text-slate-800 dark:text-white font-mono">{salawatCount}</div>
        <button 
          onClick={() => setSalawatCount(p => p + 1)}
          className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 shadow-xl shadow-amber-500/30 active:scale-95 transition-transform flex items-center justify-center mx-auto border-4 border-amber-100 dark:border-amber-900"
        >
          <TrendingUp className="text-white" size={32} />
        </button>
        <p className="text-xs text-gray-400">Tap to count Salawat</p>
      </div>

      {/* Challenges */}
      <div>
        <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white flex items-center gap-2">
            <Award className="text-amber-500" size={20} />
            Daily Challenges
        </h3>
        <div className="space-y-3">
             <div className="glass-card p-4 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <span className="font-bold">100</span>
                </div>
                <div className="flex-1">
                    <h4 className="font-bold dark:text-gray-100">SubhanAllah</h4>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2">
                        <div className="bg-blue-500 h-2 rounded-full w-[45%]"></div>
                    </div>
                </div>
                <span className="text-xs font-bold text-gray-400">45%</span>
             </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div>
        <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white flex items-center gap-2">
            <Globe className="text-emerald-500" size={20} />
            Top Contributors
        </h3>
        <div className="glass-card rounded-2xl overflow-hidden">
            {leaderboardData.map((user, idx) => (
                <div key={idx} className={`flex items-center p-4 ${idx !== leaderboardData.length -1 ? 'border-b border-gray-100 dark:border-white/5' : ''}`}>
                    <div className={`w-8 font-bold ${idx === 0 ? 'text-amber-500' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-orange-700' : 'text-gray-600'} `}>
                        #{user.rank}
                    </div>
                    <div className="flex-1">
                        <p className="font-medium text-slate-800 dark:text-gray-200">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.country}</p>
                    </div>
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {user.count.toLocaleString()}
                    </div>
                </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default CommunityScreen;
