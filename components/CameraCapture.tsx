
import React, { useRef, useState } from 'react';
import { Camera, X, RefreshCw, Loader2, Info } from 'lucide-react';
import { analyzeFoodImage } from '../services/geminiService';

interface CameraCaptureProps {
  onCaptured: (img: string, data: any) => void;
  onBack: () => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCaptured, onBack }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [portion, setPortion] = useState<number>(1); // 0.25, 0.5, 1.0

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch (e) {
      alert("Camera access denied or not available.");
      onBack();
    }
  };

  React.useEffect(() => {
    startCamera();
    return () => stream?.getTracks().forEach(t => t.stop());
  }, []);

  const takePhoto = async () => {
    if (!videoRef.current) return;
    setLoading(true);
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(videoRef.current, 0, 0);
    
    const base64 = canvas.toDataURL('image/jpeg').split(',')[1];
    const data = await analyzeFoodImage(base64);
    
    if (data) {
      // Apply portion multiplier
      const adjustedData = {
        ...data,
        calories: Math.round(data.calories * portion),
        carbohydrates: Math.round(data.carbohydrates * portion),
        protein: Math.round(data.protein * portion),
        fat: Math.round(data.fat * portion),
        sugar: Math.round(data.sugar * portion),
      };
      onCaptured(canvas.toDataURL('image/jpeg'), adjustedData);
    } else {
      alert("AI failed to analyze. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-black fixed inset-0 z-[100] flex flex-col max-w-md mx-auto">
      <div className="flex justify-between p-6 z-10 text-white">
        <button onClick={onBack} className="p-2 bg-white/10 rounded-full"><X /></button>
        <div className="text-center">
          <p className="font-bold text-sm">Meal Detection AI</p>
          <p className="text-[10px] opacity-60">Scanning for nutrients...</p>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        <video ref={videoRef} autoPlay playsInline className="h-full w-full object-cover" />
        <div className="absolute inset-0 pointer-events-none border-[30px] border-black/40">
           <div className="w-full h-full border-2 border-white/20 rounded-3xl relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-xl m-4"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-xl m-4"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-xl m-4"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-xl m-4"></div>
           </div>
        </div>
      </div>

      <div className="bg-slate-900 p-8 rounded-t-[40px] space-y-6">
        <div className="flex justify-center gap-3">
          {[
            { label: 'Small (1/4)', val: 0.25 },
            { label: 'Half (1/2)', val: 0.5 },
            { label: 'Whole (1/1)', val: 1 }
          ].map(p => (
            <button 
              key={p.val}
              onClick={() => setPortion(p.val)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition ${portion === p.val ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="flex justify-center items-center">
          <button 
            disabled={loading}
            onClick={takePhoto}
            className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white/20 active:scale-90 transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-8 h-8 text-white animate-spin" /> : <div className="w-16 h-16 rounded-full border-4 border-white/80"></div>}
          </button>
        </div>
        <p className="text-center text-slate-400 text-xs flex items-center justify-center gap-2">
          <Info className="w-3 h-3" /> Gemini AI will analyze your meal nutrients
        </p>
      </div>
    </div>
  );
};
