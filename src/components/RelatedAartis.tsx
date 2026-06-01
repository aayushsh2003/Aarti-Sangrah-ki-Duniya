import { Link } from "react-router-dom";
import { getAartisByDeity, type Aarti, type Deity } from "@/data/aartis";

interface RelatedAartisProps {
  currentAartiId: string;
  deity: Deity;
}

const RelatedAartis = ({ currentAartiId, deity }: RelatedAartisProps) => {
  const related = getAartisByDeity(deity.id).filter(a => a.id !== currentAartiId);
  if (related.length === 0) return null;

  return (
    <section className="mt-10" aria-label="Related aartis">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        More {deity.name} Aartis
      </h2>
      <div className="grid gap-3">
        {related.map(a => (
          <Link
            key={a.id}
            to={`/aarti/${a.id}`}
            className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-sm"
          >
            <span className="text-2xl">{deity.emoji}</span>
            <div>
              <p className="font-medium text-foreground">{a.title}</p>
              <p className="text-sm text-muted-foreground font-devanagari">{a.titleHindi}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedAartis;
