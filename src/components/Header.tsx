import { Link } from "react-router-dom";
import { Search, Heart } from "lucide-react";
import { useState } from "react";
import { aartis, deities } from "@/data/aartis";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { useFavorites } from "@/hooks/use-favorites";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  const results = query.length > 1
    ? [
        ...aartis.filter(a =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.titleHindi.includes(query)
        ).map(a => ({ type: "aarti" as const, id: a.id, label: `${a.titleHindi} - ${a.title}`, link: `/aarti/${a.id}` })),
        ...deities.filter(d =>
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.nameHindi.includes(query)
        ).map(d => ({ type: "deity" as const, id: d.id, label: `${d.nameHindi} - ${d.name}`, link: `/deity/${d.id}` })),
      ]
    : [];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2" aria-label="Aarti Sangrah ki Duniya home">
          <span className="text-2xl">🪔</span>
          <span className="text-base sm:text-xl font-semibold text-foreground whitespace-nowrap">Aarti Sangrah ki Duniya</span>
        </Link>

        <div className="flex items-center gap-2">
          {favorites.length > 0 && (
            <Link
              to="/favorites"
              className="relative flex items-center justify-center h-9 w-9 rounded-full border border-border bg-card hover:border-primary/50 transition-colors"
              aria-label="Favorites"
            >
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {favorites.length}
              </span>
            </Link>
          )}

          <ThemeToggle />

          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-sm text-muted-foreground hover:border-primary/50 transition-colors"
              aria-label="Toggle search"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search aartis...</span>
            </button>

            {searchOpen && (
              <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-xl shadow-warm p-3 z-50">
                <input
                  autoFocus
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search by name..."
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
                />
                {results.length > 0 && (
                  <ul className="mt-2 max-h-60 overflow-y-auto">
                    {results.map(r => (
                      <li key={r.id}>
                        <button
                          className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors"
                          onClick={() => { navigate(r.link); setSearchOpen(false); setQuery(""); }}
                        >
                          <span className="text-xs text-primary mr-2">{r.type === "aarti" ? "🎵" : "🙏"}</span>
                          {r.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {query.length > 1 && results.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-3">No results found</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
