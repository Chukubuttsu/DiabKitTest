
import React, { useState, useEffect } from 'react';
import { 
  AppScreen, 
  UserProfile, 
  UserType, 
  MealRecord, 
  Lesson, 
  QuizQuestion 
} from './types';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { AuthFlow } from './components/AuthFlow';
import { CameraCapture } from './components/CameraCapture';
import { LearningModule } from './components/LearningModule';
import { RecordHistory } from './components/RecordHistory';
import { SettingsPage } from './components/SettingsPage';
import { NotificationSettings } from './components/NotificationSettings';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.Splash);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [meals, setMeals] = useState<MealRecord[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [quizScore, setQuizScore] = useState<{score: number, total: number} | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // Persistence (Simulated)
  useEffect(() => {
    const savedUser = localStorage.getItem('diabkit_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentScreen(AppScreen.Home);
    }
  }, []);

  const handleLogin = (u: UserProfile) => {
    setUser(u);
    if (!u.isGuest) localStorage.setItem('diabkit_user', JSON.stringify(u));
    setCurrentScreen(AppScreen.Home);
  };

  const navigateTo = (screen: AppScreen) => setCurrentScreen(screen);

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.Splash:
      case AppScreen.Login:
      case AppScreen.OnboardingType:
      case AppScreen.OnboardingStats:
      case AppScreen.Register:
        return <AuthFlow currentScreen={currentScreen} navigateTo={navigateTo} onLogin={handleLogin} />;
      
      case AppScreen.Home:
        return <Dashboard user={user} meals={meals} navigateTo={navigateTo} />;

      case AppScreen.Camera:
        return <CameraCapture 
                onCaptured={(img, data) => {
                  setCapturedImage(img);
                  setAnalysisData(data);
                  setCurrentScreen(AppScreen.AnalysisResult);
                }}
                onBack={() => setCurrentScreen(AppScreen.Home)} 
              />;

      case AppScreen.AnalysisResult:
        return (
          <div className="p-6 bg-white min-h-screen">
            <h2 className="text-2xl font-bold mb-4 text-emerald-800">Meal Analysis</h2>
            {capturedImage && <img src={capturedImage} className="w-full rounded-2xl mb-4 shadow-lg" alt="Food" />}
            <div className="bg-emerald-50 p-4 rounded-xl space-y-3 mb-6">
              <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
                <span className="font-medium">Food Name:</span>
                <span className="text-emerald-700 font-bold">{analysisData?.foodName || 'Unknown'}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-xs text-slate-500">Calories</p>
                  <p className="text-lg font-bold">{analysisData?.calories} kcal</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-xs text-slate-500">Carbs</p>
                  <p className="text-lg font-bold">{analysisData?.carbohydrates}g</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-xs text-slate-500">Protein</p>
                  <p className="text-lg font-bold">{analysisData?.protein}g</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-xs text-slate-500">Sugar</p>
                  <p className="text-lg font-bold text-orange-600">{analysisData?.sugar}g</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  const newMeal: MealRecord = {
                    id: Date.now().toString(),
                    timestamp: new Date(),
                    imageUrl: capturedImage!,
                    name: analysisData?.foodName || 'Meal',
                    calories: analysisData?.calories,
                    carbs: analysisData?.carbohydrates,
                    protein: analysisData?.protein,
                    fat: analysisData?.fat,
                    sugar: analysisData?.sugar,
                    portion: 1.0
                  };
                  setMeals([...meals, newMeal]);
                  setCurrentScreen(AppScreen.Home);
                }}
                className="flex-1 bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition"
              >
                Save Meal
              </button>
              <button 
                onClick={() => setCurrentScreen(AppScreen.Home)}
                className="flex-1 border border-slate-200 py-4 rounded-xl font-bold text-slate-600"
              >
                Discard
              </button>
            </div>
          </div>
        );

      case AppScreen.Learning:
      case AppScreen.LessonDetail:
      case AppScreen.Quiz:
      case AppScreen.QuizResult:
        return <LearningModule 
                currentScreen={currentScreen} 
                navigateTo={navigateTo} 
                selectedLesson={selectedLesson}
                onSelectLesson={setSelectedLesson}
                onQuizComplete={(score, total) => {
                  setQuizScore({score, total});
                  setCurrentScreen(AppScreen.QuizResult);
                }}
                quizScore={quizScore}
              />;

      case AppScreen.History:
        return <RecordHistory meals={meals} navigateTo={navigateTo} />;

      case AppScreen.Settings:
        return <SettingsPage user={user} navigateTo={navigateTo} onLogout={() => {
          localStorage.removeItem('diabkit_user');
          setUser(null);
          setCurrentScreen(AppScreen.Login);
        }} />;

      case AppScreen.Notifications:
        return <NotificationSettings onBack={() => setCurrentScreen(AppScreen.Settings)} />;

      default:
        return <div>Screen not implemented</div>;
    }
  };

  const showNav = ![
    AppScreen.Splash, 
    AppScreen.Login, 
    AppScreen.OnboardingType, 
    AppScreen.OnboardingStats, 
    AppScreen.Register,
    AppScreen.Camera
  ].includes(currentScreen);

  return (
    <div className="max-w-md mx-auto min-h-screen relative shadow-2xl bg-white overflow-hidden flex flex-col">
      <main className="flex-1 overflow-y-auto pb-24">
        {renderScreen()}
      </main>
      {showNav && <Layout currentScreen={currentScreen} navigateTo={navigateTo} />}
    </div>
  );
};

export default App;
