export enum TraitType {
  OPENNESS = 'Açıklık',
  CONSCIENTIOUSNESS = 'Sorumluluk',
  EXTRAVERSION = 'Dışadönüklük',
  AGREEABLENESS = 'Uyumluluk',
  NEUROTICISM = 'Duygusal Denge' // Inverse of Neuroticism for positive framing usually, but keeping term for internal logic
}

export interface Question {
  id: number;
  text: string;
  trait: TraitType;
  reversed?: boolean; // If true, Strongly Agree means LOW score for the trait
}

export interface UserAnswer {
  questionId: number;
  value: number; // 1 to 5
}

export interface TraitScore {
  trait: TraitType;
  score: number; // 0 to 100 normalized
  label: string;
}

export interface AIAnalysisResult {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  careerSuggestions: string[];
}
