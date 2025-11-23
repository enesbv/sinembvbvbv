import React from 'react';
import { TraitScore, AIAnalysisResult } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { AlertCircle, RotateCcw, Download, Briefcase, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

interface ResultsViewProps {
  scores: TraitScore[];
  analysis: AIAnalysisResult | null;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onRestart: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ scores, analysis, loading, error, onRetry, onRestart }) => {
  
  // Format data for Recharts
  const chartData = scores.map(s => ({
    subject: s.label,
    A: s.score,
    fullMark: 100,
  }));

  return (
    <div className="max-w-4xl mx-auto w-full pb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Analiz Raporunuz</h2>
        <p className="text-slate-500">Kişilik haritanız ve detaylı AI yorumunuz aşağıdadır.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Chart Section */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center justify-center min-h-[400px]">
          <h3 className="text-lg font-bold text-slate-700 mb-4 self-start flex items-center gap-2">
            <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
            Kişilik Radarı
          </h3>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Siz"
                  dataKey="A"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  fill="#6366f1"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scores List Section */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
           <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
            Puan Detayları
          </h3>
          <div className="space-y-6">
            {scores.map((trait) => (
              <div key={trait.label}>
                <div className="flex justify-between items-end mb-1">
                  <span className="font-semibold text-slate-700">{trait.label}</span>
                  <span className="text-sm font-bold text-indigo-600">% {trait.score.toFixed(0)}</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"
                    style={{ width: `${trait.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Analysis Section */}
      <div className="space-y-6">
        {loading ? (
          <div className="bg-white p-12 rounded-3xl shadow-lg border border-slate-100 text-center animate-pulse">
            <Sparkles className="mx-auto text-indigo-400 mb-4 animate-spin-slow" size={48} />
            <h3 className="text-xl font-bold text-slate-800 mb-2">AI Profilinizi Analiz Ediyor...</h3>
            <p className="text-slate-500">Yanıtlarınız işleniyor ve kişilik haritanız çıkarılıyor.</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-8 rounded-3xl border border-red-100 text-center">
            <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
            <h3 className="text-xl font-bold text-red-800 mb-2">Analiz Oluşturulamadı</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <button 
              onClick={onRetry}
              className="px-6 py-2 bg-white text-red-600 border border-red-200 rounded-lg font-medium hover:bg-red-50"
            >
              Tekrar Dene
            </button>
          </div>
        ) : analysis ? (
          <>
            {/* Summary */}
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-8 rounded-3xl shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="text-yellow-300" />
                <h3 className="text-2xl font-bold">Genel Değerlendirme</h3>
              </div>
              <p className="text-indigo-100 leading-relaxed text-lg">
                {analysis.summary}
              </p>
            </div>

            {/* Grid for Strengths, Weaknesses, Careers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Strengths */}
              <div className="bg-white p-6 rounded-3xl shadow-md border-t-4 border-emerald-500">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="text-emerald-500" />
                  <h4 className="font-bold text-slate-800">Güçlü Yönler</h4>
                </div>
                <ul className="space-y-3">
                  {analysis.strengths.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-600 text-sm">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-white p-6 rounded-3xl shadow-md border-t-4 border-orange-400">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingDown className="text-orange-400" />
                  <h4 className="font-bold text-slate-800">Gelişim Alanları</h4>
                </div>
                <ul className="space-y-3">
                  {analysis.weaknesses.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-600 text-sm">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Careers */}
              <div className="bg-white p-6 rounded-3xl shadow-md border-t-4 border-blue-500">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="text-blue-500" />
                  <h4 className="font-bold text-slate-800">Kariyer Önerileri</h4>
                </div>
                <ul className="space-y-3">
                  {analysis.careerSuggestions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-600 text-sm">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div className="mt-12 flex justify-center gap-4">
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-300 transition-colors"
        >
          <RotateCcw size={20} />
          Testi Yeniden Başlat
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-medium hover:bg-indigo-100 transition-colors"
        >
          <Download size={20} />
          Raporu Kaydet (PDF)
        </button>
      </div>
    </div>
  );
};

export default ResultsView;
