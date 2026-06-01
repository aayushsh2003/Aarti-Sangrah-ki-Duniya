import { Link } from "react-router-dom";
import { deities } from "@/data/aartis";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-12">
      <div className="container py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🪔</span>
              <span className="text-lg font-semibold text-foreground">Aarti Sangrah ki Duniya</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              आरती संग्रह की दुनिया — the complete world of sacred Hindu aartis with Hindi lyrics, transliteration, translation & audio.
            </p>
          </div>

          {/* Deities col 1 */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Deities</h4>
            <ul className="space-y-2">
              {deities.slice(0, 6).map(d => (
                <li key={d.id}>
                  <Link to={`/deity/${d.id}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {d.emoji} {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Deities col 2 */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">More Deities</h4>
            <ul className="space-y-2">
              {deities.slice(6).map(d => (
                <li key={d.id}>
                  <Link to={`/deity/${d.id}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {d.emoji} {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">About</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>🙏 A devotional resource for all</li>
              <li>📖 Lyrics in Hindi, English & transliteration</li>
              <li>🎵 Audio playback with loop & controls</li>
              <li>📱 Works offline as a PWA</li>
              <li>
                <Link to="/about-developer" className="hover:text-primary transition-colors font-medium">
                  👨‍💻 About the Developer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center space-y-1">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Aarti Sangrah ki Duniya — Made with 🪔 devotion by{" "}
            <a
              href="https://aayush-ki-pehchan.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Aayush Sharma
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
