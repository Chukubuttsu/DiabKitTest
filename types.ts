
export type UserType = 'Patient' | 'Caregiver' | 'AtRisk';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  type: UserType;
  gender: string;
  height: number;
  weight: number;
  waist: number;
  lastDTX: number;
  isGuest: boolean;
}

export interface MealRecord {
  id: string;
  timestamp: Date;
  imageUrl: string;
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  sugar: number;
  portion: number; // 0.25, 0.5, 1.0
}

export interface DTXRecord {
  date: string;
  value: number;
}

export interface Lesson {
  id: string;
  title: string;
  level: 'Easy' | 'Medium' | 'Hard';
  videoUrl: string;
  description: string;
  quiz: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export enum AppScreen {
  Splash = 'Splash',
  Login = 'Login',
  OnboardingType = 'OnboardingType',
  OnboardingStats = 'OnboardingStats',
  Register = 'Register',
  Home = 'Home',
  Learning = 'Learning',
  Camera = 'Camera',
  AnalysisResult = 'AnalysisResult',
  History = 'History',
  Settings = 'Settings',
  Notifications = 'Notifications',
  LessonDetail = 'LessonDetail',
  Quiz = 'Quiz',
  QuizResult = 'QuizResult'
}
