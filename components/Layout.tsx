
import React from 'react';
import { Home, BookOpen, Camera, History, Settings } from 'lucide-react';
import { AppScreen } from '../types';

interface LayoutProps {
  currentScreen: AppScreen;
  navigateTo: (screen: AppScreen) => void;
}

export const Layout: React.FC<LayoutProps> = ({ currentScreen, navigateTo }) => {
  const navItems = [
    { icon: Home, label: 'Home', screen: AppScreen.Home },
    { icon: BookOpen, label: 'Learn', screen: AppScreen.Learning },
    { icon: Camera, label: '', screen: AppScreen.Camera, special: true },
    { icon: History, label: 'History', screen: AppScreen.History },
    { icon: Settings, label: 'Settings', screen: AppScreen.Settings },
  ];

  return (
    <nav className="fixed bottom-0 max-w-md w-full bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-end z-50">
      {navItems.map((item, idx) => {
        const isActive = currentScreen === item.screen;
        if (item.special) {
          return (
            <button 
              key={idx}
              onClick={() => navigateTo(item.screen)}
              className="bg-emerald-500 p-4 rounded-full -mt-8 shadow-xl shadow-emerald-200 border-4 border-white transform transition active:scale-95"
            >
              <item.icon className="text-white w-7 h-7" />
            </button>
          );
        }

        return (
          <button 
            key={idx}
            onClick={() => navigateTo(item.screen)}
            className={`flex flex-col items-center transition ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}
          >
            <item.icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : ''}`} />
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
