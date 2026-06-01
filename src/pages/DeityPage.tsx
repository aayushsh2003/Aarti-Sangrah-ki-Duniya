import { useParams, Link } from "react-router-dom";
import { getDeityById, getAartisByDeity } from "@/data/aartis";
import { ArrowLeft, Music } from "lucide-react";
import SEO from "@/components/SEO";
import FavoriteButton from "@/components/FavoriteButton";

const DeityPage = () => {
  const { id } = useParams<{ id: string }>();
  const deity = getDeityById(id || "");
  const deityAartis = getAartisByDeity(id || "");

  if (!deity) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Deity not found</p>
        <Link to="/" className="text-primary underline mt-4 inline-block">Go Home</Link>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${deity.name} Aarti - ${deity.nameHindi} आरती`,
    description: `Collection of ${deity.name} (${deity.nameHindi}) aartis with Hindi lyrics, transliteration and audio.`,
    url: `https://aarti-sangrah-ki-duniya.vercel.app/deity/${deity.id}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: deityAartis.length,
      itemListElement: deityAartis.map((aarti, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${aarti.title} (${aarti.titleHindi})`,
        url: `https://aarti-sangrah-ki-duniya.vercel.app/aarti/${aarti.id}`,
      })),
    },
  };

  return (
    <div className="container py-8 max-w-2xl">
      <SEO
        title={`${deity.name} (${deity.nameHindi}) Aarti`}
        description={`${deity.name} aarti collection — ${deity.description}. Read lyrics in Hindi, English transliteration & translation with audio.`}
        canonical={`/deity/${deity.id}`}
        jsonLd={jsonLd}
      />

      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to all deities
      </Link>

      <header className="flex items-center gap-4 mb-8">
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${deity.color} flex items-center justify-center text-4xl`} role="img" aria-label={deity.name}>
          {deity.emoji}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{deity.name}</h1>
          <p className="font-devanagari text-lg text-muted-foreground">{deity.nameHindi}</p>
          <p className="text-sm text-muted-foreground">{deity.description}</p>
        </div>
      </header>

      <nav aria-label={`${deity.name} aartis`} className="space-y-3">
        {deityAartis.map(aarti => (
          <div key={aarti.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-warm hover:border-primary/30 transition-all group">
            <Link to={`/aarti/${aarti.id}`} className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-full gradient-devotional flex items-center justify-center flex-shrink-0">
                <Music className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{aarti.title}</p>
                <p className="text-sm font-devanagari text-muted-foreground">{aarti.titleHindi}</p>
              </div>
            </Link>
            <FavoriteButton aartiId={aarti.id} size="sm" />
          </div>
        ))}
      </nav>
    </div>
  );
};

export default DeityPage;
