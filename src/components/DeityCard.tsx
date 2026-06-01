import { Link } from "react-router-dom";
import { Deity } from "@/data/aartis";

interface DeityCardProps {
  deity: Deity;
  aartiCount: number;
}

const DeityCard = ({ deity, aartiCount }: DeityCardProps) => {
  return (
    <Link
      to={`/deity/${deity.id}`}
      className="group block rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-warm transition-all duration-300 hover:-translate-y-1"
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${deity.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
        {deity.emoji}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-0.5">{deity.name}</h3>
      <p className="text-sm font-devanagari text-muted-foreground mb-1">{deity.nameHindi}</p>
      <p className="text-xs text-muted-foreground">{deity.description}</p>
      <p className="text-xs text-primary mt-3 font-medium">
        {aartiCount} {aartiCount === 1 ? "Aarti" : "Aartis"} →
      </p>
    </Link>
  );
};

export default DeityCard;
