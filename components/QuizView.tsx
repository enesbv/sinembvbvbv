import React, { useState } from 'react';
import { Question, UserAnswer } from '../types';
import { CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

interface QuizViewProps {
  questions: Question[];
  onComplete: (answers: UserAnswer[]) => void;
}

const QuizView: React.FC<QuizViewProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  // Use a map for instant O(1) lookup of current selected value
  const answersMap = new Map(answers.map(a => [a.questionId, a.value]));

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (value: number) => {
    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex(a => a.questionId === currentQuestion.id);
    
    if (existingIndex >= 0) {
      newAnswers[existingIndex] = { questionId: currentQuestion.id, value };
    } else {
      newAnswers.push({ questionId: currentQuestion.id, value });
    }
    setAnswers(newAnswers);
    
    // Auto advance after short delay for better UX
    setTimeout(() => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    }, 250);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const isCurrentAnswered = answersMap.has(currentQuestion.id);

  // Options scale
  const options = [
    { val: 1, label: "Kesinlikle Katılmıyorum", color: "bg-red-50 border-red-200 text-red-700" },
    { val: 2, label: "Katılmıyorum", color: "bg-orange-50 border-orange-200 text-orange-700" },
    { val: 3, label: "Kararsızım", color: "bg-gray-50 border-gray-200 text-gray-700" },
    { val: 4, label: "Katılıyorum", color: "bg-green-50 border-green-200 text-green-700" },
    { val: 5, label: "Kesinlikle Katılıyorum", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  ];

  return (
    <div className="max-w-2xl mx-auto w-full">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Soru {currentIndex + 1} / {questions.length}</span>
          <span>%{Math.round(progress)} Tamamlandı</span>
        </div>
        <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 leading-snug">
          {currentQuestion.text}
        </h2>

        <div className="space-y-3">
          {options.map((opt) => {
            const isSelected = answersMap.get(currentQuestion.id) === opt.val;
            return (
              <button
                key={opt.val}
                onClick={() => handleSelect(opt.val)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group
                  ${isSelected 
                    ? `border-indigo-600 bg-indigo-50 shadow-sm` 
                    : `border-slate-100 hover:border-slate-300 bg-white hover:bg-slate-50`
                  }`}
              >
                <span className={`font-medium ${isSelected ? 'text-indigo-800' : 'text-slate-600'}`}>
                  {opt.label}
                </span>
                {isSelected && <CheckCircle2 className="text-indigo-600" size={20} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
            ${currentIndex === 0 
              ? 'text-slate-300 cursor-not-allowed' 
              : 'text-slate-600 hover:bg-slate-100'}`}
        >
          <ChevronLeft size={20} />
          Önceki
        </button>

        <button
          onClick={handleNext}
          disabled={!isCurrentAnswered}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all
            ${!isCurrentAnswered 
              ? 'bg-slate-300 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'}`}
        >
          {currentIndex === questions.length - 1 ? 'Testi Bitir' : 'Sonraki'}
          {currentIndex !== questions.length - 1 && <ChevronRight size={20} />}
        </button>
      </div>
    </div>
  );
};

export default QuizView;
