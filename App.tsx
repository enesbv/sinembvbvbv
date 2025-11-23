import React, { useState, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizView from './components/QuizView';
import ResultsView from './components/ResultsView';
import { QUESTIONS, MAX_SCORE_PER_QUESTION } from './constants';
import { UserAnswer, TraitType, TraitScore, AIAnalysisResult } from './types';
import { generateProfileAnalysis } from './services/geminiService';

enum AppState {
  WELCOME,
  TEST,
  RESULTS
}

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [scores, setScores] = useState<TraitScore[]>([]);
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateScores = (answers: UserAnswer[]): TraitScore[] => {
    // Initialize map with all trait types
    const rawScores = new Map<TraitType, { sum: number; count: number }>();
    Object.values(TraitType).forEach(t => rawScores.set(t, { sum: 0, count: 0 }));

    answers.forEach(ans => {
      const question = QUESTIONS.find(q => q.id === ans.questionId);
      if (question) {
        const current = rawScores.get(question.trait) || { sum: 0, count: 0 };
        // Handle reversed questions logic
        // If scale is 1-5. Regular: value. Reversed: (Max+1) - value.
        // Example: Reversed '5' means 1 point. (5+1)-5 = 1.
        const actualValue = question.reversed 
          ? (MAX_SCORE_PER_QUESTION + 1) - ans.value 
          : ans.value;
        
        rawScores.set(question.trait, {
          sum: current.sum + actualValue,
          count: current.count + 1
        });
      }
    });

    // Normalize to percentage (0-100)
    const result: TraitScore[] = [];
    rawScores.forEach((val, key) => {
      if (val.count > 0) {
        // Max possible sum for this trait is count * 5
        // (Sum / (count * 5)) * 100
        const percentage = (val.sum / (val.count * MAX_SCORE_PER_QUESTION)) * 100;
        result.push({
          trait: key,
          score: Math.round(percentage),
          label: key
        });
      }
    });
    
    return result;
  };

  const handleTestComplete = useCallback(async (answers: UserAnswer[]) => {
    const calculatedScores = calculateScores(answers);
    setScores(calculatedScores);
    setAppState(AppState.RESULTS);
    setLoading(true);
    setError(null);

    try {
      const result = await generateProfileAnalysis(calculatedScores);
      setAnalysis(result);
    } catch (err: any) {
      console.error(err);
      setError("AI analizi için internet bağlantısı veya geçerli bir API anahtarı gereklidir. Ancak puanlarınızı yukarıda görebilirsiniz.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRetryAI = useCallback(async () => {
    if (scores.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const result = await generateProfileAnalysis(scores);
      setAnalysis(result);
    } catch (err) {
      setError("Bağlantı başarısız. Lütfen internetinizi kontrol edip tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }, [scores]);

  const handleRestart = () => {
    setScores([]);
    setAnalysis(null);
    setError(null);
    setAppState(AppState.WELCOME);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-200">
                    S
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-800">Sinem Geçe</span>
            </div>
            {appState === AppState.RESULTS && (
                <button onClick={handleRestart} className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
                    Yeni Test
                </button>
            )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        {appState === AppState.WELCOME && (
          <WelcomeScreen onStart={() => setAppState(AppState.TEST)} />
        )}
        
        {appState === AppState.TEST && (
          <div className="animate-fade-in-up">
            <QuizView questions={QUESTIONS} onComplete={handleTestComplete} />
          </div>
        )}

        {appState === AppState.RESULTS && (
          <div className="animate-fade-in-up">
            <ResultsView 
              scores={scores} 
              analysis={analysis} 
              loading={loading} 
              error={error}
              onRetry={handleRetryAI}
              onRestart={handleRestart}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm">© {new Date().getFullYear()} Sinem Geçe. Bu bir tıbbi tanı aracı değildir.</p>
          <p className="text-xs mt-2 opacity-50">Big Five (Beş Büyük Faktör) Kişilik Kuramı temel alınmıştır.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;