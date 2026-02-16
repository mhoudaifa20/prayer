import React, { useState } from 'react';
import { Search, Play, MoreVertical, Bookmark, Share2 } from 'lucide-react';
import { Surah } from '../types';

// Mock Surah Data
const surahs: Surah[] = [
  { number: 1, name: "الفاتحة", englishName: "Al-Fatiha", englishNameTranslation: "The Opening", numberOfAyahs: 7, revelationType: "Meccan" },
  { number: 2, name: "البقرة", englishName: "Al-Baqarah", englishNameTranslation: "The Cow", numberOfAyahs: 286, revelationType: "Medinan" },
  { number: 3, name: "آل عمران", englishName: "Ali 'Imran", englishNameTranslation: "Family of Imran", numberOfAyahs: 200, revelationType: "Medinan" },
  { number: 4, name: "النساء", englishName: "An-Nisa", englishNameTranslation: "The Women", numberOfAyahs: 176, revelationType: "Medinan" },
  { number: 5, name: "المائدة", englishName: "Al-Ma'idah", englishNameTranslation: "The Table Spread", numberOfAyahs: 120, revelationType: "Medinan" },
  { number: 18, name: "الكهف", englishName: "Al-Kahf", englishNameTranslation: "The Cave", numberOfAyahs: 110, revelationType: "Meccan" },
  { number: 36, name: "يس", englishName: "Ya-Sin", englishNameTranslation: "Ya Sin", numberOfAyahs: 83, revelationType: "Meccan" },
  { number: 67, name: "الملك", englishName: "Al-Mulk", englishNameTranslation: "The Sovereignty", numberOfAyahs: 30, revelationType: "Meccan" },
];

const QuranScreen: React.FC = () => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);

  const handleSurahClick = (surah: Surah) => {
    setSelectedSurah(surah);
    setView('detail');
  };

  if (view === 'detail' && selectedSurah) {
    return (
      <div className="h-full flex flex-col bg-cream dark:bg-slate-950">
        {/* Detail Header */}
        <div className="sticky top-0 glass-card z-20 px-4 py-3 border-b border-gray-200 dark:border-white/5 flex justify-between items-center">
          <button onClick={() => setView('list')} className="text-emerald-600 dark:text-emerald-400 font-medium">Back</button>
          <div className="text-center">
            <h3 className="font-bold text-slate-800 dark:text-white">{selectedSurah.englishName}</h3>
            <p className="text-xs text-gray-500">{selectedSurah.revelationType} • {selectedSurah.numberOfAyahs} Ayahs</p>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Bismillah */}
        <div className="flex justify-center py-8">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/27/Basmala.svg" alt="Bismillah" className="h-12 opacity-80 dark:invert" />
        </div>

        {/* Verses Mockup */}
        <div className="px-5 space-y-8 pb-10">
          {[1, 2, 3].map((ayah) => (
            <div key={ayah} className="flex flex-col gap-4 border-b border-gray-100 dark:border-white/5 pb-6">
              <div className="flex justify-between items-start bg-emerald-50/50 dark:bg-emerald-900/10 p-2 rounded-lg">
                <div className="flex gap-3">
                   <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-sm font-bold">{ayah}</span>
                   <button className="p-1.5 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-800 text-emerald-600 dark:text-emerald-400"><Play size={16} fill="currentColor" /></button>
                </div>
                <div className="flex gap-2 text-gray-400">
                  <Bookmark size={18} />
                  <Share2 size={18} />
                </div>
              </div>
              
              <p className="text-right font-serif text-3xl leading-[2.5] text-slate-800 dark:text-gray-100 dir-rtl" style={{ direction: 'rtl' }}>
                {ayah === 1 ? "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ" : 
                 ayah === 2 ? "الرَّحْمَٰنِ الرَّحِيمِ" : 
                 "مَالِكِ يَوْمِ الدِّينِ"}
              </p>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {ayah === 1 ? "All praise is due to Allah, Lord of the worlds." :
                 ayah === 2 ? "The Entirely Merciful, the Especially Merciful." :
                 "Sovereign of the Day of Recompense."}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pt-4 pb-20">
      <div className="relative mb-6">
        <input 
          type="text" 
          placeholder="Search Surah, Ayah..." 
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white placeholder-gray-400 shadow-sm"
        />
        <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
      </div>

      <div className="space-y-3">
        {surahs.map((surah) => (
          <div 
            key={surah.number}
            onClick={() => handleSurahClick(surah)}
            className="group flex items-center gap-4 p-4 rounded-2xl glass-card hover:bg-white hover:shadow-md dark:hover:bg-white/5 transition-all cursor-pointer border-transparent hover:border-emerald-500/30"
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
              <span className="relative font-bold text-emerald-800 dark:text-emerald-400">{surah.number}</span>
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-slate-800 dark:text-gray-100">{surah.englishName}</h4>
              <p className="text-xs text-gray-500 uppercase tracking-wide">{surah.revelationType} • {surah.numberOfAyahs} Ayahs</p>
            </div>

            <div className="text-right">
              <p className="font-serif text-xl text-emerald-600 dark:text-emerald-400 font-medium">{surah.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuranScreen;
