import { Question, TraitType } from './types';

export const MAX_SCORE_PER_QUESTION = 5;

export const QUESTIONS: Question[] = [
  // --- AÇIKLIK (OPENNESS) ---
  // Pozitif (Puan getirir)
  { id: 1, text: "Zengin bir hayal dünyam vardır.", trait: TraitType.OPENNESS },
  { id: 2, text: "Sanat ve estetik konularına ilgi duyarım.", trait: TraitType.OPENNESS },
  { id: 3, text: "Yeni fikirleri ve yöntemleri denemeyi severim.", trait: TraitType.OPENNESS },
  { id: 4, text: "Soyut ve felsefi konular üzerine düşünmeyi severim.", trait: TraitType.OPENNESS },
  { id: 5, text: "Farklı kültürleri ve yaşam tarzlarını merak ederim.", trait: TraitType.OPENNESS },
  // Negatif (Ters puan)
  { id: 6, text: "Hayal kurmaktan pek hoşlanmam.", trait: TraitType.OPENNESS, reversed: true },
  { id: 7, text: "Karmaşık ve teorik konular beni sıkar.", trait: TraitType.OPENNESS, reversed: true },
  { id: 8, text: "Alışkanlıklarıma sıkı sıkıya bağlıyımdır, değişimi sevmem.", trait: TraitType.OPENNESS, reversed: true },
  { id: 9, text: "Sanatsal etkinlikler (müze, tiyatro vb.) ilgimi çekmez.", trait: TraitType.OPENNESS, reversed: true },
  { id: 10, text: "Somut ve pratik olmayan şeyler bana vakit kaybı gibi gelir.", trait: TraitType.OPENNESS, reversed: true },

  // --- SORUMLULUK (CONSCIENTIOUSNESS) ---
  // Pozitif
  { id: 11, text: "Her zaman hazırlıklı ve tedbirliyimdir.", trait: TraitType.CONSCIENTIOUSNESS },
  { id: 12, text: "İşlerimi belirli bir plan ve program dahilinde yaparım.", trait: TraitType.CONSCIENTIOUSNESS },
  { id: 13, text: "Detaylara çok dikkat ederim.", trait: TraitType.CONSCIENTIOUSNESS },
  { id: 14, text: "Başladığım işi mutlaka bitiririm.", trait: TraitType.CONSCIENTIOUSNESS },
  { id: 15, text: "Düzenli ve tertipli olmayı severim.", trait: TraitType.CONSCIENTIOUSNESS },
  // Negatif
  { id: 16, text: "Eşyalarımı sık sık kaybederim veya unuturum.", trait: TraitType.CONSCIENTIOUSNESS, reversed: true },
  { id: 17, text: "İşleri genellikle son ana bırakırım.", trait: TraitType.CONSCIENTIOUSNESS, reversed: true },
  { id: 18, text: "Dağınık bir çalışma tarzım vardır.", trait: TraitType.CONSCIENTIOUSNESS, reversed: true },
  { id: 19, text: "Görevlerimi bazen aksatırım.", trait: TraitType.CONSCIENTIOUSNESS, reversed: true },
  { id: 20, text: "Plansız ve gelişine yaşamayı tercih ederim.", trait: TraitType.CONSCIENTIOUSNESS, reversed: true },

  // --- DIŞADÖNÜKLÜK (EXTRAVERSION) ---
  // Pozitif
  { id: 21, text: "Topluluk içinde ilgi odağı olmaktan hoşlanırım.", trait: TraitType.EXTRAVERSION },
  { id: 22, text: "Yeni insanlarla tanışmak beni heyecanlandırır.", trait: TraitType.EXTRAVERSION },
  { id: 23, text: "Konuşmayı başlatmakta zorlanmam.", trait: TraitType.EXTRAVERSION },
  { id: 24, text: "Sosyal ortamlarda enerjik hissederim.", trait: TraitType.EXTRAVERSION },
  { id: 25, text: "Hareketli ve gürültülü ortamları severim.", trait: TraitType.EXTRAVERSION },
  // Negatif
  { id: 26, text: "Genellikle sessiz ve çekimserimdir.", trait: TraitType.EXTRAVERSION, reversed: true },
  { id: 27, text: "Kalabalık ortamlar beni yorar.", trait: TraitType.EXTRAVERSION, reversed: true },
  { id: 28, text: "Tanımadığım insanların yanında sessiz kalırım.", trait: TraitType.EXTRAVERSION, reversed: true },
  { id: 29, text: "Arka planda kalmayı tercih ederim.", trait: TraitType.EXTRAVERSION, reversed: true },
  { id: 30, text: "Çok konuşmaktan hoşlanmam.", trait: TraitType.EXTRAVERSION, reversed: true },

  // --- UYUMLULUK (AGREEABLENESS) ---
  // Pozitif
  { id: 31, text: "İnsanların iyiliğini düşünürüm ve onlarla ilgilenirim.", trait: TraitType.AGREEABLENESS },
  { id: 32, text: "Başkalarının duygularına kolayca empati duyarım.", trait: TraitType.AGREEABLENESS },
  { id: 33, text: "Yumuşak kalpli ve hoşgörülüyümdür.", trait: TraitType.AGREEABLENESS },
  { id: 34, text: "İnsanlara yardım etmekten mutluluk duyarım.", trait: TraitType.AGREEABLENESS },
  { id: 35, text: "Çatışmadan kaçınır, uzlaşmacı davranırım.", trait: TraitType.AGREEABLENESS },
  // Negatif
  { id: 36, text: "Başkalarının sorunları beni pek ilgilendirmez.", trait: TraitType.AGREEABLENESS, reversed: true },
  { id: 37, text: "İnsanlara karşı bazen iğneleyici veya kaba olabilirim.", trait: TraitType.AGREEABLENESS, reversed: true },
  { id: 38, text: "Başkalarından şüphelenmeye eğilimliyimdir.", trait: TraitType.AGREEABLENESS, reversed: true },
  { id: 39, text: "Kendi çıkarımı başkalarından önde tutarım.", trait: TraitType.AGREEABLENESS, reversed: true },
  { id: 40, text: "İnsanları eleştirmeyi severim.", trait: TraitType.AGREEABLENESS, reversed: true },

  // --- DUYGUSAL DENGE (NEUROTICISM / EMOTIONAL STABILITY) ---
  // Not: Burada 'TraitType.NEUROTICISM' kullanıyoruz ancak etiketimiz 'Duygusal Denge'.
  // Yüksek puan = Yüksek Denge (Stability) anlamına gelmesi için:
  // - "Sakinim" diyen maddeler Normal (reversed: false)
  // - "Stresliyim" diyen maddeler Reversed (reversed: true) olarak ayarlandı.
  
  // Pozitif (Yüksek puan = Yüksek Denge)
  { id: 41, text: "Genellikle sakin ve dengeliyimdir.", trait: TraitType.NEUROTICISM },
  { id: 42, text: "Stresli durumlarda soğukkanlılığımı korurum.", trait: TraitType.NEUROTICISM },
  { id: 43, text: "Kendimi nadiren hüzünlü hissederim.", trait: TraitType.NEUROTICISM },
  { id: 44, text: "Olayları kafama takmamayı başarabilirim.", trait: TraitType.NEUROTICISM },
  { id: 45, text: "Ruh halim genellikle istikrarlıdır.", trait: TraitType.NEUROTICISM },
  // Negatif (Yüksek puan = Düşük Denge -> Reversed)
  { id: 46, text: "Kolayca stres olurum ve endişelenirim.", trait: TraitType.NEUROTICISM, reversed: true },
  { id: 47, text: "Ruh halim çok sık değişir (bir an mutlu, bir an mutsuz).", trait: TraitType.NEUROTICISM, reversed: true },
  { id: 48, text: "Küçük şeyler beni çabucak sinirlendirir.", trait: TraitType.NEUROTICISM, reversed: true },
  { id: 49, text: "Sık sık kendimi yetersiz veya değersiz hissederim.", trait: TraitType.NEUROTICISM, reversed: true },
  { id: 50, text: "Gelecek hakkında sık sık karamsarlığa kapılırım.", trait: TraitType.NEUROTICISM, reversed: true },
];