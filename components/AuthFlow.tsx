
import React, { useState } from 'react';
import { 
  AppScreen, 
  UserProfile, 
  UserType 
} from '../types';
import { Mail, Phone, Lock, ChevronRight, User, AlertCircle, ShieldCheck } from 'lucide-react';

interface AuthFlowProps {
  currentScreen: AppScreen;
  navigateTo: (screen: AppScreen) => void;
  onLogin: (user: UserProfile) => void;
}

export const AuthFlow: React.FC<AuthFlowProps> = ({ currentScreen, navigateTo, onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    type: 'Patient' as UserType,
    gender: 'Male',
    height: 170,
    weight: 70,
    lastDTX: 100
  });

  if (currentScreen === AppScreen.Splash) {
    return (
      <div className="bg-emerald-600 min-h-screen flex flex-col items-center justify-center p-10 text-white">
        <div className="w-24 h-24 bg-white/20 rounded-[35px] flex items-center justify-center mb-8 backdrop-blur-md">
           <ShieldCheck className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-black mb-4 tracking-tight">Diabkit</h1>
        <p className="text-center opacity-80 mb-12 text-sm leading-relaxed">
          Your personal AI companion for smarter diabetes management and healthy living.
        </p>
        
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 w-full mb-10">
          <h3 className="font-bold mb-3 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Privacy Policy</h3>
          <p className="text-[11px] opacity-70 leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy regarding your health data processing for AI nutritional analysis.
          </p>
        </div>

        <button 
          onClick={() => navigateTo(AppScreen.Login)}
          className="w-full bg-white text-emerald-700 font-bold py-4 rounded-2xl shadow-xl active:scale-95 transition"
        >
          Get Started
        </button>
      </div>
    );
  }

  if (currentScreen === AppScreen.Login) {
    return (
      <div className="p-8 pt-20">
        <h2 className="text-3xl font-black text-slate-800 mb-2">Welcome Back</h2>
        <p className="text-slate-500 mb-10">Sign in to track your progress</p>

        <div className="space-y-4 mb-8">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="email" placeholder="Email or Phone Number" className="w-full bg-slate-50 border-0 p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition" />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="password" placeholder="Password" className="w-full bg-slate-50 border-0 p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition" />
          </div>
          <button className="w-full text-right text-xs font-bold text-emerald-600">Forgot Password?</button>
        </div>

        <button 
          onClick={() => onLogin({
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            type: 'Patient',
            gender: 'Male',
            height: 175,
            weight: 80,
            waist: 90,
            lastDTX: 110,
            isGuest: false
          })}
          className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition mb-6"
        >
          Login
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-slate-100"></div>
          <span className="text-[10px] font-bold text-slate-300 uppercase">Or continue with</span>
          <div className="flex-1 h-px bg-slate-100"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <button className="border border-slate-100 p-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 transition">
             <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" alt="Google" />
             <span className="text-sm font-bold text-slate-600">Google</span>
          </button>
          <button 
            onClick={() => onLogin({
              id: 'guest',
              name: 'Guest User',
              email: '',
              type: 'Patient',
              gender: 'Male',
              height: 170,
              weight: 70,
              waist: 85,
              lastDTX: 100,
              isGuest: true
            })}
            className="border border-slate-100 p-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 transition"
          >
             <User className="w-5 h-5 text-slate-400" />
             <span className="text-sm font-bold text-slate-600">Guest</span>
          </button>
        </div>

        <p className="text-center text-sm text-slate-500">
          New here? <button onClick={() => navigateTo(AppScreen.OnboardingType)} className="text-emerald-600 font-bold">Register Now</button>
        </p>
      </div>
    );
  }

  if (currentScreen === AppScreen.OnboardingType) {
    return (
      <div className="p-8 pt-12">
        <h2 className="text-2xl font-black text-slate-800 mb-8">Who are you?</h2>
        <div className="space-y-4">
          {(['Patient', 'Caregiver', 'AtRisk'] as UserType[]).map(type => (
            <button 
              key={type}
              onClick={() => { setFormData({...formData, type}); navigateTo(AppScreen.OnboardingStats); }}
              className="w-full p-6 rounded-3xl border-2 border-slate-100 text-left hover:border-emerald-500 hover:bg-emerald-50 group transition flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-slate-800 group-hover:text-emerald-800">{type}</h3>
                <p className="text-xs text-slate-500 group-hover:text-emerald-600/70">
                  {type === 'Patient' ? 'Managing my own health' : type === 'Caregiver' ? 'Supporting someone else' : 'Staying ahead of risks'}
                </p>
              </div>
              <ChevronRight className="text-slate-200 group-hover:text-emerald-500" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (currentScreen === AppScreen.OnboardingStats) {
     return (
       <div className="p-8 pt-12">
          <h2 className="text-2xl font-black text-slate-800 mb-2">Almost there!</h2>
          <p className="text-slate-500 mb-10">Help us personalize your experience</p>
          
          <div className="space-y-6">
             <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Gender</label>
                  <select className="w-full bg-slate-50 p-4 rounded-2xl font-medium outline-none">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
               </div>
               <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Last DTX (mg/dL)</label>
                  <input type="number" defaultValue={100} className="w-full bg-slate-50 p-4 rounded-2xl font-medium outline-none" />
               </div>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Height (cm)</label>
                  <input type="number" defaultValue={170} className="w-full bg-slate-50 p-4 rounded-2xl font-medium outline-none" />
               </div>
               <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Weight (kg)</label>
                  <input type="number" defaultValue={70} className="w-full bg-slate-50 p-4 rounded-2xl font-medium outline-none" />
               </div>
             </div>

             <div className="bg-orange-50 p-4 rounded-2xl flex gap-3 border border-orange-100">
               <AlertCircle className="text-orange-500 w-5 h-5 flex-shrink-0" />
               <p className="text-[10px] text-orange-800 font-medium">This info helps us calculate your BMI and nutritional needs more accurately.</p>
             </div>

             <button 
                onClick={() => navigateTo(AppScreen.Register)}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-xl mt-4"
             >
               Next Step
             </button>
          </div>
       </div>
     );
  }

  if (currentScreen === AppScreen.Register) {
    return (
      <div className="p-8 pt-12">
        <h2 className="text-2xl font-black text-slate-800 mb-8">Create Account</h2>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full bg-slate-50 p-4 rounded-2xl outline-none" 
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full bg-slate-50 p-4 rounded-2xl outline-none" 
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-slate-50 p-4 rounded-2xl outline-none" 
          />
          
          <button 
            onClick={() => onLogin({
              ...formData,
              id: Date.now().toString(),
              waist: 0,
              isGuest: false
            })}
            className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-xl mt-6"
          >
            Finish Registration
          </button>
        </div>
      </div>
    );
  }

  return null;
};
