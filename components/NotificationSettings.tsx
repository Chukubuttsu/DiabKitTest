
import React, { useState } from 'react';
import { ChevronLeft, Bell, Clock, Pill } from 'lucide-react';

// Interface defining the structure of a meal reminder
interface MealReminder {
  active: boolean;
  time: string;
}

export const NotificationSettings: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  // Adding explicit type to fix 'unknown' type errors when iterating with Object.entries
  const [mealReminders, setMealReminders] = useState<Record<string, MealReminder>>({
    breakfast: { active: true, time: '07:30' },
    lunch: { active: true, time: '12:00' },
    dinner: { active: true, time: '18:30' },
  });

  const [medReminders, setMedReminders] = useState([
    { name: 'Metformin', time: '08:00', active: true },
    { name: 'Vitamin D', time: '20:00', active: false },
  ]);

  return (
    <div className="p-6">
      <button onClick={onBack} className="mb-8 flex items-center gap-2 text-slate-500 font-medium">
        <ChevronLeft className="w-5 h-5" /> Settings
      </button>

      <h1 className="text-2xl font-black text-slate-800 mb-8">Notifications</h1>

      <section className="mb-10">
        <h2 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-4">Meal Reminders</h2>
        <div className="space-y-3">
          {Object.entries(mealReminders).map(([key, val]) => (
            <div key={key} className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 capitalize">{key}</p>
                  {/* Property 'time' is now accessible because 'val' is typed as MealReminder */}
                  <p className="text-xs text-slate-400 font-medium">{val.time}</p>
                </div>
              </div>
              {/* Property 'active' is now accessible because 'val' is typed as MealReminder */}
              <input type="checkbox" checked={val.active} className="w-6 h-6 accent-emerald-500 cursor-pointer" readOnly />
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xs font-black text-slate-300 uppercase tracking-widest">Medication Alerts</h2>
          <button className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">+ Add New</button>
        </div>
        <div className="space-y-3">
          {medReminders.map((med, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">{med.name}</p>
                  <p className="text-xs text-slate-400 font-medium">{med.time}</p>
                </div>
              </div>
              <input type="checkbox" checked={med.active} className="w-6 h-6 accent-blue-500 cursor-pointer" readOnly />
            </div>
          ))}
        </div>
      </section>
      
      <div className="bg-slate-50 p-6 rounded-[30px] flex items-center gap-4 opacity-70">
        <Bell className="text-slate-400 w-6 h-6" />
        <p className="text-xs text-slate-500 leading-relaxed font-medium">
          Make sure your phone notifications are enabled in your device settings to receive these alerts.
        </p>
      </div>
    </div>
  );
};
