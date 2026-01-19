
import React, { useState } from 'react';
import { Play, CheckCircle, Award, RefreshCw, ChevronLeft, Brain, Video } from 'lucide-react';
import { AppScreen, Lesson } from '../types';
import { LESSONS } from '../constants';

interface LearningModuleProps {
  currentScreen: AppScreen;
  navigateTo: (screen: AppScreen) => void;
  selectedLesson: Lesson | null;
  onSelectLesson: (l: Lesson) => void;
  onQuizComplete: (score: number, total: number) => void;
  quizScore: {score: number, total: number} | null;
}

export const LearningModule: React.FC<LearningModuleProps> = ({ 
  currentScreen, 
  navigateTo, 
  selectedLesson, 
  onSelectLesson,
  onQuizComplete,
  quizScore
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleStartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowExplanation(false);
    navigateTo(AppScreen.Quiz);
  };

  const handleAnswer = (idx: number) => {
    if (showExplanation) return;
    setUserAnswers([...userAnswers, idx]);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex + 1 < (selectedLesson?.quiz.length || 0)) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const correctCount = userAnswers.reduce((acc, ans, idx) => {
        return acc + (ans === selectedLesson!.quiz[idx].correctIndex ? 1 : 0);
      }, 0);
      onQuizComplete(correctCount, selectedLesson!.quiz.length);
    }
  };

  if (currentScreen === AppScreen.Learning) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Learning Center</h1>
        <div className="space-y-4">
          {LESSONS.map((lesson) => (
            <div 
              key={lesson.id} 
              onClick={() => { onSelectLesson(lesson); navigateTo(AppScreen.LessonDetail); }}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center gap-4 active:scale-[0.98] transition cursor-pointer"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Play className="text-blue-500 fill-blue-500 w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${lesson.level === 'Easy' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                  {lesson.level}
                </span>
                <h3 className="font-bold text-slate-800 mt-1">{lesson.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-1">{lesson.description}</p>
              </div>
              <CheckCircle className="text-slate-200 w-6 h-6" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentScreen === AppScreen.LessonDetail && selectedLesson) {
    return (
      <div className="p-6">
        <button onClick={() => navigateTo(AppScreen.Learning)} className="mb-6 flex items-center gap-2 text-slate-500 font-medium">
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        <div className="bg-black aspect-video rounded-3xl overflow-hidden mb-6 shadow-xl relative">
          <iframe 
            className="w-full h-full" 
            src={selectedLesson.videoUrl} 
            title="Video" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">{selectedLesson.title}</h1>
        <p className="text-slate-600 leading-relaxed mb-8">{selectedLesson.description}</p>
        
        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
             <div className="bg-blue-500 p-2 rounded-xl text-white"><Brain className="w-5 h-5" /></div>
             <h3 className="font-bold text-blue-900">Knowledge Check</h3>
          </div>
          <p className="text-sm text-blue-800 mb-6 opacity-80">Test what you just learned with a quick quiz and earn your badge.</p>
          <button 
            onClick={handleStartQuiz}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (currentScreen === AppScreen.Quiz && selectedLesson) {
    const q = selectedLesson.quiz[currentQuestionIndex];
    const isAnswered = userAnswers[currentQuestionIndex] !== undefined;

    return (
      <div className="p-6 min-h-screen flex flex-col">
        <div className="flex justify-between items-center mb-10">
          <span className="text-xs font-bold text-slate-400">QUESTION {currentQuestionIndex + 1}/{selectedLesson.quiz.length}</span>
          <div className="flex gap-1">
            {selectedLesson.quiz.map((_, i) => (
              <div key={i} className={`w-6 h-1.5 rounded-full ${i <= currentQuestionIndex ? 'bg-blue-500' : 'bg-slate-100'}`}></div>
            ))}
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-8">{q.question}</h2>
        
        <div className="space-y-3 flex-1">
          {q.options.map((opt, idx) => {
            const isSelected = userAnswers[currentQuestionIndex] === idx;
            const isCorrect = idx === q.correctIndex;
            let btnClass = "bg-white border-2 border-slate-100 text-slate-700";
            if (showExplanation) {
              if (isCorrect) btnClass = "bg-emerald-50 border-emerald-500 text-emerald-800 ring-4 ring-emerald-50";
              else if (isSelected) btnClass = "bg-red-50 border-red-500 text-red-800";
            } else if (isSelected) {
              btnClass = "border-blue-500 bg-blue-50 text-blue-800";
            }

            return (
              <button 
                key={idx}
                disabled={showExplanation}
                onClick={() => handleAnswer(idx)}
                className={`w-full p-5 rounded-2xl text-left font-medium transition flex justify-between items-center ${btnClass}`}
              >
                {opt}
                {showExplanation && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-500" />}
              </button>
            )
          })}
        </div>

        {showExplanation && (
          <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className={`p-5 rounded-3xl ${userAnswers[currentQuestionIndex] === q.correctIndex ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'} mb-6`}>
              <p className="text-xs font-bold uppercase mb-1">{userAnswers[currentQuestionIndex] === q.correctIndex ? 'Correct!' : 'Try again next time'}</p>
              <p className="text-sm font-medium">{q.explanation}</p>
            </div>
            <button 
              onClick={nextQuestion}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl"
            >
              {currentQuestionIndex + 1 === selectedLesson.quiz.length ? 'See Results' : 'Next Question'}
            </button>
          </div>
        )}
      </div>
    );
  }

  if (currentScreen === AppScreen.QuizResult && quizScore) {
    const percent = (quizScore.score / quizScore.total) * 100;
    let feedback = { color: 'text-emerald-500', bg: 'bg-emerald-50', msg: 'Excellent Work!', sub: 'You truly understand this chapter.' };
    if (percent < 50) feedback = { color: 'text-red-500', bg: 'bg-red-50', msg: 'Keep trying!', sub: 'Practice makes perfect. Review the video again.' };
    else if (percent < 80) feedback = { color: 'text-yellow-600', bg: 'bg-yellow-50', msg: 'Almost there!', sub: 'A quick review will get you a perfect score.' };

    return (
      <div className="p-10 text-center flex flex-col items-center justify-center min-h-screen">
        <div className={`w-32 h-32 ${feedback.bg} rounded-full flex items-center justify-center mb-8 relative`}>
           <Award className={`w-16 h-16 ${feedback.color}`} />
           <div className="absolute -bottom-2 bg-slate-900 text-white px-4 py-1 rounded-full font-black text-lg">
             {quizScore.score}/{quizScore.total}
           </div>
        </div>
        <h2 className={`text-3xl font-black mb-2 ${feedback.color}`}>{feedback.msg}</h2>
        <p className="text-slate-500 mb-12">{feedback.sub}</p>

        <div className="space-y-4 w-full">
          <button 
            onClick={() => navigateTo(AppScreen.Learning)}
            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-100"
          >
            Continue Learning
          </button>
          <button 
            onClick={handleStartQuiz}
            className="w-full flex items-center justify-center gap-2 border border-slate-200 py-4 rounded-2xl font-bold text-slate-600"
          >
            <RefreshCw className="w-4 h-4" /> Try Quiz Again
          </button>
        </div>
      </div>
    );
  }

  return null;
};
