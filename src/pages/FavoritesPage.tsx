import { Link } from "react-router-dom";
import { useFavorites } from "@/hooks/use-favorites";
import { getAartiById, getDeityById } from "@/data/aartis";
import { Music, Heart, ArrowLeft } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";
import SEO from "@/components/SEO";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  const favoriteAartis = favorites
    .map(id => getAartiById(id))
    .filter(Boolean);

  return (
    <div className="container py-8 max-w-2xl">
      <SEO title="My Favorites" description="Your saved favorite Hindu aartis from Aarti Sangrah ki Duniya — quick access to bookmarked aarti lyrics, transliteration, translation & audio." canonical="/favorites" />

      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>

      <header className="flex items-center gap-3 mb-8">
        <Heart className="h-7 w-7 text-red-500 fill-red-500" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Favorites</h1>
          <p className="text-sm text-muted-foreground">{favoriteAartis.length} saved {favoriteAartis.length === 1 ? "aarti" : "aartis"}</p>
        </div>
      </header>

      {favoriteAartis.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">No favorites yet</p>
          <p className="text-sm text-muted-foreground">Tap the ❤️ icon on any aarti to save it here</p>
          <Link to="/" className="text-primary underline mt-4 inline-block text-sm">Browse Aartis</Link>
        </div>
      ) : (
        <nav className="space-y-3">
          {favoriteAartis.map(aarti => {
            if (!aarti) return null;
            const deity = getDeityById(aarti.deityId);
            return (
              <div key={aarti.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-warm transition-all group">
                <Link to={`/aarti/${aarti.id}`} className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full gradient-devotional flex items-center justify-center flex-shrink-0">
                    <Music className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">{aarti.title}</p>
                    <p className="text-sm font-devanagari text-muted-foreground truncate">{aarti.titleHindi}</p>
                    {deity && <p className="text-xs text-muted-foreground">{deity.name}</p>}
                  </div>
                </Link>
                <FavoriteButton aartiId={aarti.id} size="sm" />
              </div>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default FavoritesPage;
