import { useParams, Link } from "react-router-dom";
import { getAartiById, getDeityById } from "@/data/aartis";
import AudioPlayer from "@/components/AudioPlayer";
import SEO from "@/components/SEO";
import ShareCopyButtons from "@/components/ShareCopyButtons";
import FontSizeControl from "@/components/FontSizeControl";
import FavoriteButton from "@/components/FavoriteButton";
import RelatedAartis from "@/components/RelatedAartis";
import ReadingProgress from "@/components/ReadingProgress";
import BackToTop from "@/components/BackToTop";
import AartiReminder from "@/components/AartiReminder";
import PageTransition from "@/components/PageTransition";
import { useState, useRef, useEffect, useMemo } from "react";

type LangTab = "hindi" | "transliteration" | "translation";

const AartiPage = () => {
  const { id } = useParams<{ id: string }>();
  const aarti = getAartiById(id || "");
  const deity = aarti ? getDeityById(aarti.deityId) : null;
  const [activeTab, setActiveTab] = useState<LangTab>("hindi");
  const [fontSize, setFontSize] = useState(18);
  const [autoScroll, setAutoScroll] = useState(false);
  const [karaokeMode, setKaraokeMode] = useState(false);
  const [activeLine, setActiveLine] = useState(-1);
  const [audioTime, setAudioTime] = useState(0);
  const lyricsRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (autoScroll && lyricsRef.current) {
      scrollIntervalRef.current = setInterval(() => {
        if (lyricsRef.current) {
          lyricsRef.current.scrollTop += 1;
        }
      }, 80);
    }
    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    };
  }, [autoScroll]);

  const lyrics = useMemo(() => {
    if (!aarti) return { hindi: "", transliteration: "", translation: "" };
    return {
      hindi: aarti.lyricsHindi,
      transliteration: aarti.lyricsTransliteration,
      translation: aarti.lyricsTranslation,
    };
  }, [aarti]);

  const lines = useMemo(() => lyrics[activeTab].split("\n"), [lyrics, activeTab]);

  // Karaoke: estimate active line from audio time
  useEffect(() => {
    if (!karaokeMode || !aarti?.audioUrl) return;
    const nonEmptyCount = lines.filter(l => l.trim()).length;
    if (nonEmptyCount === 0) return;
    // Simple estimation: distribute time evenly across non-empty lines
    const totalDuration = 300; // approximate; will improve with real metadata
    const lineIdx = Math.floor((audioTime / totalDuration) * nonEmptyCount);
    let count = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim()) {
        if (count === lineIdx) {
          setActiveLine(i);
          break;
        }
        count++;
      }
    }
  }, [audioTime, karaokeMode, lines, aarti]);

  if (!aarti || !deity) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Aarti not found</p>
        <Link to="/" className="text-primary underline mt-4 inline-block">Go Home</Link>
      </div>
    );
  }

  const tabs: { key: LangTab; label: string }[] = [
    { key: "hindi", label: "हिंदी" },
    { key: "transliteration", label: "Transliteration" },
    { key: "translation", label: "Translation" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${aarti.title} - ${aarti.titleHindi}`,
    description: `${aarti.title} (${aarti.titleHindi}) lyrics in Hindi, English transliteration and translation. ${deity.name} aarti with audio.`,
    url: `https://aarti-sangrah-ki-duniya.vercel.app/aarti/${aarti.id}`,
    inLanguage: "hi",
    author: { "@type": "Organization", name: "Aarti Sangrah" },
    publisher: { "@type": "Organization", name: "Aarti Sangrah" },
    mainEntityOfPage: `https://aarti-sangrah-ki-duniya.vercel.app/aarti/${aarti.id}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://aarti-sangrah-ki-duniya.vercel.app/" },
        { "@type": "ListItem", position: 2, name: deity.name, item: `https://aarti-sangrah-ki-duniya.vercel.app/deity/${deity.id}` },
        { "@type": "ListItem", position: 3, name: aarti.title },
      ],
    },
  };

  return (
    <PageTransition>
      <ReadingProgress />
      <article className="container py-8 max-w-2xl">
        <SEO
          title={`${aarti.title} Aarti — ${deity.name}`}
          description={`${aarti.title} (${aarti.titleHindi}) — ${deity.name} aarti lyrics in Hindi with English transliteration, translation & audio.`}
          canonical={`/aarti/${aarti.id}`}
          type="article"
          jsonLd={jsonLd}
        />

        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link to={`/deity/${deity.id}`} className="hover:text-foreground transition-colors">{deity.name}</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">{aarti.title}</li>
          </ol>
        </nav>

        <header className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{aarti.title}</h1>
            <p className="font-devanagari text-xl text-muted-foreground">{aarti.titleHindi}</p>
          </div>
          <div className="flex items-center gap-2">
            <AartiReminder />
            <FavoriteButton aartiId={aarti.id} />
          </div>
        </header>

        {/* Audio Player */}
        <section className="mb-8" aria-label="Audio player">
          <AudioPlayer
            title={aarti.title}
            audioUrl={aarti.audioUrl || undefined}
            onTimeUpdate={setAudioTime}
          />
        </section>

        {/* Controls bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <ShareCopyButtons
              title={`${aarti.title} (${aarti.titleHindi})`}
              lyrics={lyrics[activeTab]}
              url={`/aarti/${aarti.id}`}
            />
            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${autoScroll ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
            >
              {autoScroll ? "⏸ Stop Scroll" : "▶ Auto Scroll"}
            </button>
            <button
              onClick={() => { setKaraokeMode(!karaokeMode); if (karaokeMode) setActiveLine(-1); }}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${karaokeMode ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
            >
              {karaokeMode ? "🎤 Karaoke On" : "🎤 Karaoke"}
            </button>
          </div>
          <FontSizeControl fontSize={fontSize} onFontSizeChange={setFontSize} />
        </div>

        {/* Language Tabs */}
        <div className="flex gap-1 p-1 bg-muted rounded-xl mb-6" role="tablist" aria-label="Lyrics language">
          {tabs.map(tab => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Lyrics */}
        <section
          ref={lyricsRef}
          role="tabpanel"
          aria-label={`Lyrics in ${activeTab}`}
          className={`bg-card border border-border rounded-2xl p-6 shadow-card max-h-[70vh] overflow-y-auto scroll-smooth ${activeTab === "hindi" ? "font-devanagari leading-relaxed" : "leading-relaxed"}`}
          style={{ fontSize: `${fontSize}px` }}
        >
          {lines.map((line, i) => (
            <p
              key={i}
              className={`transition-all duration-300 ${line.trim() === "" ? "h-4" : "mb-1"} ${
                karaokeMode && i === activeLine
                  ? "text-primary font-bold scale-[1.02] bg-primary/10 rounded-lg px-2 py-0.5"
                  : karaokeMode && activeLine >= 0
                    ? "opacity-50"
                    : ""
              }`}
            >
              {line}
            </p>
          ))}
        </section>

        {/* Related Aartis */}
        <RelatedAartis currentAartiId={aarti.id} deity={deity} />
      </article>
      <BackToTop />
    </PageTransition>
  );
};

export default AartiPage;
