import React from 'react';
import { BrainCircuit, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="bg-indigo-100 p-6 rounded-full mb-8 animate-pulse">
        <BrainCircuit size={64} className="text-indigo-600" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2 tracking-tight">
        Sinem Geçe
      </h1>
      <h2 className="text-2xl text-slate-600 mb-6 font-medium">
        Psikolojik Profil Analizi
      </h2>
      <p className="text-lg text-slate-600 max-w-xl mb-10 leading-relaxed">
        Yapay zeka destekli, modern "Beş Büyük Faktör" (Big Five) metodolojisine dayalı 
        kapsamlı kişilik testimizle kendinizi daha yakından tanıyın. 
        Karakterinizin güçlü ve geliştirilmesi gereken yönlerini keşfedin.
      </p>
      
      <button 
        onClick={onStart}
        className="group relative flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-semibold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-1"
      >
        Teste Başla
        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
      </button>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div className="font-bold text-slate-800 mb-1">Kapsamlı Analiz</div>
          <p className="text-sm text-slate-500">50 detaylı soru ile gerçekçi profil çıkarma.</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div className="font-bold text-slate-800 mb-1">Bilimsel Temelli</div>
          <p className="text-sm text-slate-500">Psikolojide kabul görmüş OCEAN modeli.</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div className="font-bold text-slate-800 mb-1">AI Analizi</div>
          <p className="text-sm text-slate-500">Gemini ile kişiselleştirilmiş rapor.</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;