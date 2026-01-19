
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  PlusCircle, ArrowUpRight, ChevronRight, Droplets, Utensils, Scale, Info 
} from 'lucide-react';
import { AppScreen, UserProfile, MealRecord } from '../types';
import { DTX_MOCK_DATA } from '../constants';

interface DashboardProps {
  user: UserProfile | null;
  meals: MealRecord[];
  navigateTo: (screen: AppScreen) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, meals, navigateTo }) => {
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const bmi = user ? (user.weight / ((user.height / 100) ** 2)).toFixed(1) : '22.5';
  
  const getBMICategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-blue-500' };
    if (val < 25) return { label: 'Normal', color: 'text-emerald-500' };
    if (val < 30) return { label: 'Overweight', color: 'text-yellow-500' };
    return { label: 'Obese', color: 'text-red-500' };
  };

  const bmiInfo = getBMICategory(parseFloat(bmi));

  return (
    <div className="p-5 pb-10">
      <header className="flex justify-between items-center mb-8 pt-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Hello, {user?.name || 'Guest'}</h1>
          <p className="text-slate-500 text-sm">Track your health progress today</p>
        </div>
        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <Droplets className="text-emerald-600 w-6 h-6" />
        </div>
      </header>

      {/* DTX Progress */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <Droplets className="w-4 h-4 text-emerald-500" /> DTX Level
          </h2>
          <button className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full">
            History
          </button>
        </div>
        <div className="h-40 w-full mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={DTX_MOCK_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                labelStyle={{ fontWeight: 'bold', color: '#334155' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#10b981" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#10b981' }} 
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between items-center pt-2">
          <p className="text-sm text-slate-500">Last reading: <span className="font-bold text-slate-700">{user?.lastDTX || 120} mg/dL</span></p>
          <button className="bg-emerald-600 p-2 rounded-xl text-white hover:bg-emerald-700">
            <PlusCircle className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Calories Today */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <Utensils className="w-4 h-4 text-orange-500" /> Today's Calories
          </h2>
        </div>
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-emerald-100 text-sm">Consumed so far</p>
            <h3 className="text-4xl font-black mt-1">{totalCalories} <span className="text-lg font-normal opacity-80">kcal</span></h3>
            <div className="mt-4 flex gap-4">
               <div className="text-center">
                  <p className="text-[10px] uppercase opacity-70">Carbs</p>
                  <p className="font-bold">{meals.reduce((s, m) => s + m.carbs, 0)}g</p>
               </div>
               <div className="text-center">
                  <p className="text-[10px] uppercase opacity-70">Protein</p>
                  <p className="font-bold">{meals.reduce((s, m) => s + m.protein, 0)}g</p>
               </div>
               <div className="text-center">
                  <p className="text-[10px] uppercase opacity-70">Sugar</p>
                  <p className="font-bold">{meals.reduce((s, m) => s + m.sugar, 0)}g</p>
               </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-1/4 -translate-y-1/4">
            <Utensils className="w-32 h-32" />
          </div>
        </div>
        
        <div className="mt-4 space-y-3">
          {meals.length === 0 && <p className="text-center text-slate-400 py-6 text-sm italic">No meals recorded today. Tap the camera to start.</p>}
          {meals.slice(0, 3).map((meal) => (
            <div key={meal.id} className="bg-white p-3 rounded-2xl flex items-center gap-4 shadow-sm border border-slate-50">
              <img src={meal.imageUrl} className="w-16 h-16 rounded-xl object-cover" alt={meal.name} />
              <div className="flex-1">
                <h4 className="font-bold text-slate-700 text-sm">{meal.name}</h4>
                <p className="text-xs text-slate-500">{new Date(meal.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              </div>
              <div className="text-right">
                <p className="font-black text-emerald-600">{meal.calories} kcal</p>
                <button className="text-[10px] text-slate-400 flex items-center gap-1 justify-end">Details <ChevronRight className="w-3 h-3" /></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BMI Info */}
      <section className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="font-bold flex items-center gap-2 mb-1">
              <Scale className="w-4 h-4 text-emerald-400" /> BMI Status
            </h2>
            <p className="text-xs text-slate-400">Based on your recent profile</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold bg-white/10 ${bmiInfo.color}`}>
            {bmiInfo.label}
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-700" />
              <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - Math.min(parseFloat(bmi)/40, 1))} className="text-emerald-500" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black">{bmi}</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-300 leading-relaxed italic">
              "Maintaining a healthy BMI is crucial for long-term diabetes management."
            </p>
            <button className="mt-3 flex items-center gap-1 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              Why it matters <Info className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Weekly Overview - Simplified */}
      <section className="mb-6">
        <h2 className="font-bold text-slate-800 mb-4">This Week Overview</h2>
        <div className="flex justify-between gap-2">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
            const colors = ['bg-emerald-500', 'bg-emerald-500', 'bg-yellow-400', 'bg-emerald-500', 'bg-red-500', 'bg-emerald-500', 'bg-emerald-500'];
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className={`w-full h-12 rounded-lg ${colors[i]} opacity-80`}></div>
                <span className="text-[10px] font-bold text-slate-400">{day}</span>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  );
};
