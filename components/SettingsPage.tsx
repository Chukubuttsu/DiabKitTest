
import React from 'react';
import { User, Bell, Shield, LogOut, ChevronRight, HelpCircle, ExternalLink } from 'lucide-react';
import { AppScreen, UserProfile } from '../types';

interface SettingsPageProps {
  user: UserProfile | null;
  navigateTo: (screen: AppScreen) => void;
  onLogout: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ user, navigateTo, onLogout }) => {
  const menuItems = [
    { icon: Bell, label: 'Notifications', screen: AppScreen.Notifications },
    { icon: Shield, label: 'Privacy & Security' },
    { icon: HelpCircle, label: 'Help Center' },
    { icon: ExternalLink, label: 'About Diabkit' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-black text-slate-800 mb-8">Settings</h1>
      
      <div className="bg-emerald-50 p-6 rounded-[40px] flex items-center gap-5 mb-10 border border-emerald-100">
        <div className="w-16 h-16 bg-white rounded-[25px] flex items-center justify-center shadow-lg border-2 border-emerald-200 overflow-hidden">
          <User className="text-emerald-500 w-8 h-8" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-emerald-900">{user?.name || 'Guest User'}</h3>
          <p className="text-xs text-emerald-600 font-medium">{user?.type || 'User'}</p>
        </div>
        {!user?.isGuest && (
          <button className="bg-white p-2 rounded-xl shadow-sm text-emerald-600">
            <User className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-2">
        {menuItems.map((item, idx) => (
          <button 
            key={idx}
            onClick={() => item.screen && navigateTo(item.screen)}
            className="w-full flex items-center justify-between p-5 rounded-3xl hover:bg-slate-50 transition active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                <item.icon className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-700">{item.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300" />
          </button>
        ))}
      </div>

      <button 
        onClick={onLogout}
        className="w-full mt-10 flex items-center justify-center gap-2 p-5 rounded-3xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition"
      >
        <LogOut className="w-5 h-5" /> Logout
      </button>

      <p className="text-center text-[10px] text-slate-300 font-bold uppercase mt-10 tracking-[0.2em]">Version 1.0.0 (Alpha)</p>
    </div>
  );
};
