import { deities, getAartisByDeity } from "@/data/aartis";
import DeityCard from "@/components/DeityCard";
import SEO from "@/components/SEO";
import DailyAarti from "@/components/DailyAarti";
import PageTransition from "@/components/PageTransition";
import BackToTop from "@/components/BackToTop";
import heroDiya from "@/assets/hero-diya.jpg";

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Aarti Sangrah ki Duniya - आरती संग्रह की दुनिया",
    description: "The complete world of sacred Hindu aartis with Hindi lyrics, transliteration, translation and audio.",
    url: "https://aarti-sangrah-ki-duniya.vercel.app/",
    inLanguage: ["hi", "en"],
    isPartOf: { "@id": "https://aarti-sangrah-ki-duniya.vercel.app/#website" },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: deities.length,
      itemListElement: deities.map((deity, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${deity.name} (${deity.nameHindi})`,
        url: `https://aarti-sangrah-ki-duniya.vercel.app/deity/${deity.id}`,
      })),
    },
  };

  return (
    <PageTransition>
    <div className="min-h-screen">
      <SEO canonical="/" jsonLd={jsonLd} />

      {/* Hero */}
      <section className="relative h-[420px] overflow-hidden">
        <img
          src={heroDiya}
          alt="Glowing diya with marigold flowers for Hindu aarti worship"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative container flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 drop-shadow-lg">
            🪔 Aarti Sangrah ki Duniya
          </h1>
          <p className="font-devanagari text-xl md:text-2xl text-foreground/90 mb-2 drop-shadow">आरती संग्रह की दुनिया</p>
          <p className="text-base md:text-lg text-foreground/80 max-w-xl">
            The complete world of sacred Hindu aartis — lyrics in Hindi, transliteration, translation & audio
          </p>
        </div>
      </section>

      {/* Daily Aarti */}
      <DailyAarti />

      {/* Deity Grid */}
      <section className="container py-12" aria-label="Deity categories">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2 text-center">
          Choose a Deity
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          Browse aartis by deity — read, listen & sing along
        </p>

        <nav aria-label="Deity navigation">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {deities.map(deity => (
              <DeityCard
                key={deity.id}
                deity={deity}
                aartiCount={getAartisByDeity(deity.id).length}
              />
            ))}
          </div>
        </nav>
      </section>
      <BackToTop />
    </div>
    </PageTransition>
  );
};

export default Index;
