export interface Deity {
  id: string;
  name: string;
  nameHindi: string;
  emoji: string;
  description: string;
  color: string;
}

export const deities: Deity[] = [
  { id: "ganesh", name: "Shri Ganesh", nameHindi: "श्री गणेश", emoji: "🙏", description: "Remover of Obstacles", color: "from-orange-500 to-red-500" },
  { id: "shiv", name: "Shri Shiv", nameHindi: "श्री शिव", emoji: "🔱", description: "The Destroyer & Transformer", color: "from-blue-400 to-indigo-600" },
  { id: "vishnu", name: "Shri Vishnu", nameHindi: "श्री विष्णु", emoji: "🪷", description: "The Preserver", color: "from-blue-500 to-cyan-500" },
  { id: "lakshmi", name: "Shri Lakshmi", nameHindi: "श्री लक्ष्मी", emoji: "🪷", description: "Goddess of Wealth", color: "from-pink-400 to-rose-500" },
  { id: "hanuman", name: "Shri Hanuman", nameHindi: "श्री हनुमान", emoji: "🐒", description: "The Devotee of Ram", color: "from-orange-400 to-amber-600" },
  { id: "durga", name: "Maa Durga", nameHindi: "माँ दुर्गा", emoji: "🦁", description: "The Invincible Goddess", color: "from-red-500 to-pink-600" },
  { id: "saraswati", name: "Maa Saraswati", nameHindi: "माँ सरस्वती", emoji: "🎵", description: "Goddess of Knowledge", color: "from-sky-300 to-blue-500" },
  { id: "krishna", name: "Shri Krishna", nameHindi: "श्री कृष्ण", emoji: "🦚", description: "The Supreme Personality", color: "from-blue-600 to-indigo-700" },
  { id: "ram", name: "Shri Ram", nameHindi: "श्री राम", emoji: "🏹", description: "Maryada Purushottam", color: "from-green-500 to-emerald-600" },
  { id: "sai", name: "Shri Sai Baba", nameHindi: "श्री साईं बाबा", emoji: "🙏", description: "Sabka Malik Ek", color: "from-amber-400 to-yellow-600" },
  { id: "surya", name: "Shri Surya Dev", nameHindi: "श्री सूर्य देव", emoji: "☀️", description: "The Sun God", color: "from-yellow-400 to-orange-500" },
  { id: "shani", name: "Shri Shani Dev", nameHindi: "श्री शनि देव", emoji: "⚫", description: "God of Justice", color: "from-gray-600 to-slate-800" },
];

export const getDeityById = (id: string) => deities.find(d => d.id === id);
