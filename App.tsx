import React, { useState, useEffect } from 'react';
import { 
  Home, 
  BookOpen, 
  Users, 
  Sparkles, 
  Settings, 
  Compass, 
  Moon, 
  Sun 
} from 'lucide-react';
import HomeScreen from './components/HomeScreen';
import QuranScreen from './components/QuranScreen';
import CommunityScreen from './components/CommunityScreen';
import AiAssistantScreen from './components/AiAssistantScreen';
import ToolsScreen from './components/ToolsScreen';
import { NavItem } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(true); // Default to dark mode for premium feel

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: <Home size={22} /> },
    { id: 'quran', label: 'Quran', icon: <BookOpen size={22} /> },
    { id: 'community', label: 'Community', icon: <Users size={22} /> },
    { id: 'ai', label: 'Assistant', icon: <Sparkles size={22} /> },
    { id: 'tools', label: 'Tools', icon: <Compass size={22} /> },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen onNavigate={setActiveTab} />;
      case 'quran': return <QuranScreen />;
      case 'community': return <CommunityScreen />;
      case 'ai': return <AiAssistantScreen />;
      case 'tools': return <ToolsScreen />;
      default: return <HomeScreen onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex flex-col h-full w-full islamic-pattern transition-colors duration-500">
      {/* Header - Sticky */}
      <header className="flex justify-between items-center px-5 py-4 pt-10 glass-card sticky top-0 z-20 shadow-sm dark:shadow-emerald-900/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <span className="text-white font-serif font-bold text-lg">Q</span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-800 to-emerald-600 dark:from-emerald-400 dark:to-amber-300">
            Smart Quran
          </h1>
        </div>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-amber-400 transition-colors"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative pb-24">
        {renderScreen()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full glass-card border-t border-gray-200 dark:border-white/10 px-2 py-3 z-30 pb-safe">
        <div className="flex justify-between items-center max-w-md mx-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 w-16 ${
                activeTab === item.id
                  ? 'text-emerald-600 dark:text-emerald-400 -translate-y-2'
                  : 'text-gray-400 dark:text-gray-500 hover:text-emerald-500'
              }`}
            >
              <div className={`p-2 rounded-full transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-emerald-100 dark:bg-emerald-900/50 shadow-lg shadow-emerald-500/20' 
                  : 'bg-transparent'
              }`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-medium transition-opacity duration-300 ${
                activeTab === item.id ? 'opacity-100' : 'opacity-0'
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default App;
