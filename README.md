# 🪔 Aarti Sangrah ki Duniya

**The world's most complete digital collection of sacred Hindu Aartis** — with Hindi (Devanagari) lyrics, English transliteration, English translation, audio playback, karaoke mode, daily aarti suggestions, favorites, reminders and offline (PWA) support.

> आरती संग्रह की दुनिया — भक्ति, संगीत और शब्दों का पवित्र संगम।

🔗 **Live site:** https://aarti-sangrah-ki-duniya.vercel.app/  
👤 **Developer:** https://aayush-ki-pehchan.vercel.app/

[![Aarti Sangrah ki Duniya Preview](https://aarti-sangrah-ki-duniya.vercel.app/preview.png)](https://aarti-sangrah-ki-duniya.vercel.app/)

---

## ✨ Features

- 📖 **Trilingual lyrics** — Hindi (Devanagari), Roman transliteration, English translation
- 🎵 **Audio player** — play, pause, loop, speed control (0.5x–2x)
- 🎤 **Karaoke mode** — line-by-line highlight synced with audio
- 📜 **Auto-scroll lyrics** for hands-free singing
- ⭐ **Favorites / Bookmarks** with localStorage persistence
- 🔔 **Daily aarti reminder** via Web Notifications API
- 🕉️ **Daily Aarti suggestion** on the homepage
- 🔍 **Instant search** across deities and aartis
- 🌗 **Dark / Light theme** toggle
- 🔤 **Font size controls** for comfortable reading
- 📤 **Share & copy** lyrics in one tap
- 📱 **PWA** — installable, works offline
- 🎬 **Page transitions**, reading progress bar, back-to-top
- 🚀 **SEO-first** — JSON-LD, sitemap, OG tags, semantic HTML, robots.txt, llms.txt
- 🙋‍♂️ **About the Developer** page with portfolio link

---

## 🙏 Aartis included

Ganesh, Shiv, Vishnu, Lakshmi, Hanuman, Durga, Saraswati, Krishna, Ram, Sai Baba, Surya Dev, Shani Dev — and growing.

---

## 🛠️ Tech stack

Vite • React 18 • TypeScript • Tailwind CSS • shadcn/ui • Framer Motion • React Router • React Helmet Async • Vite PWA

---

## 📂 Project structure

```
src/
├── components/      # UI components (Header, Footer, AudioPlayer, etc.)
├── data/            # Deity & aarti content
├── hooks/           # Theme, favorites
├── pages/           # Index, DeityPage, AartiPage, FavoritesPage, AboutDeveloper
└── index.css        # Design tokens
```
---

## 🔎 SEO

- Per-page `<title>`, `<meta description>`, canonical via `react-helmet-async`
- JSON-LD structured data (WebSite, CollectionPage, Article, BreadcrumbList, Person)
- Open Graph + Twitter Cards with preview image
- `public/sitemap.xml`, `public/robots.txt`, `public/llms.txt`
- Semantic HTML5, single H1 per page, alt text on images, aria-labels on controls
- Mobile-first responsive design, PWA installable

---

## 🤝 Contributing

PRs welcome — especially for additional aartis, regional language lyrics (Gujarati, Marathi, Bengali), and audio recordings.

---

## 📜 License

Devotional content is in the public domain. Code is MIT licensed.

---

Made with 🪔 devotion by **Aayush Sharma** · [Portfolio](https://aayush-ki-pehchan.vercel.app/)
