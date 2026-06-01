import { Link } from "react-router-dom";
import { aartis, getDeityById } from "@/data/aartis";
import { Sparkles, Music } from "lucide-react";

const getDailyAarti = () => {
  const today = new Date();
  const dayIndex = (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) % aartis.length;
  return aartis[dayIndex];
};

const DailyAarti = () => {
  const aarti = getDailyAarti();
  const deity = getDeityById(aarti.deityId);

  if (!deity) return null;

  return (
    <section className="container py-8">
      <div className="rounded-2xl border border-primary/20 bg-card p-6 shadow-warm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-2 text-primary mb-3">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">आज की आरती — Today's Aarti</span>
          </div>
          <Link
            to={`/aarti/${aarti.id}`}
            className="flex items-center gap-4 group"
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${deity.color} flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
              {deity.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{aarti.title}</p>
              <p className="text-sm font-devanagari text-muted-foreground">{aarti.titleHindi}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{deity.name}</p>
            </div>
            <div className="w-10 h-10 rounded-full gradient-devotional flex items-center justify-center flex-shrink-0">
              <Music className="h-4 w-4 text-primary-foreground" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DailyAarti;
