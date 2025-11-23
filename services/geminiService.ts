import { GoogleGenAI, Type } from "@google/genai";
import { TraitScore, AIAnalysisResult } from "../types";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const generateProfileAnalysis = async (scores: TraitScore[]): Promise<AIAnalysisResult> => {
  if (!apiKey) {
    throw new Error("API Key eksik. Lütfen ortam değişkenlerini kontrol edin.");
  }

  const model = "gemini-2.5-flash";
  
  const prompt = `
    Aşağıdaki "Beş Büyük Faktör" (Big Five) kişilik testi sonuçlarına göre bu kişi için detaylı bir psikolojik profil analizi oluştur.
    
    Sonuçlar:
    ${scores.map(s => `- ${s.label}: %${s.score.toFixed(1)}`).join('\n')}
    
    Lütfen yanıtı Türkçe olarak ver ve aşağıdaki JSON şemasına kesinlikle uy.
    Kişinin güçlü yanlarını, zayıf yanlarını, genel bir özetini ve uygun kariyer önerilerini belirt.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "Kişiliğin genel ve detaylı bir özeti (2-3 cümle).",
            },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Kişinin en belirgin 3-4 güçlü özelliği.",
            },
            weaknesses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Kişinin geliştirmesi gereken veya zayıf kalabileceği 3-4 alan.",
            },
            careerSuggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Bu kişilik tipine en uygun 3-4 meslek veya kariyer alanı.",
            },
          },
          required: ["summary", "strengths", "weaknesses", "careerSuggestions"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("AI yanıtı boş döndü.");
    }

    return JSON.parse(text) as AIAnalysisResult;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
