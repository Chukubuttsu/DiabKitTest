
import React from 'react';
import { AppScreen, MealRecord } from '../types';
import { Calendar, ChevronRight, Search } from 'lucide-react';

interface RecordHistoryProps {
  meals: MealRecord[];
  navigateTo: (screen: AppScreen) => void;
}

export const RecordHistory: React.FC<RecordHistoryProps> = ({ meals, navigateTo }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black text-slate-800">History</h1>
        <div className="bg-slate-100 p-2 rounded-xl text-slate-400">
           <Calendar className="w-5 h-5" />
        </div>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search meals..." 
          className="w-full bg-white border border-slate-100 p-4 pl-12 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition"
        />
      </div>

      {meals.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
             <Calendar className="text-slate-200 w-8 h-8" />
          </div>
          <p className="text-slate-400 font-medium">No records found yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Mock grouping by date */}
          <div>
            <h3 className="text-xs font-black text-slate-300 uppercase mb-4 tracking-widest">Today</h3>
            <div className="space-y-3">
              {meals.map(meal => (
                <div key={meal.id} className="bg-white p-4 rounded-3xl border border-slate-50 shadow-sm flex items-center gap-4">
                  <img src={meal.imageUrl} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 text-sm">{meal.name}</h4>
                    <p className="text-xs text-slate-400">{new Date(meal.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-emerald-600">{meal.calories} kcal</p>
                    <ChevronRight className="w-4 h-4 text-slate-200 ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
