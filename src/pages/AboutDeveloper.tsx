import { Link } from "react-router-dom";
import { ArrowLeft, Github, Linkedin, Twitter, Instagram, Code2, GraduationCap, Briefcase, ExternalLink, Mail } from "lucide-react";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import BackToTop from "@/components/BackToTop";

const socials = [
  { name: "GitHub", icon: Github, url: "https://github.com/aayushsh2003" },
  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/aayush-sharma-a44062299/" },
  { name: "Twitter", icon: Twitter, url: "https://x.com/aayushSh2003" },
  { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/aayushsh2003" },
];

const skills = {
  "Languages": ["C", "C++", "Java", "Python", "JavaScript", "TypeScript"],
  "Web": ["React", "Node.js", "HTML", "CSS", "Tailwind CSS", "Bootstrap", "jQuery"],
  "Databases": ["SQL", "MongoDB", "Firebase"],
  "Tools": ["Git", "GitHub", "VS Code", "WordPress"],
  "Data": ["SQL", "Pandas", "NumPy"],
};

const AboutDeveloper = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aayush Sharma",
    url: "https://aayush-ki-pehchan.vercel.app/",
    image: "https://github.com/aayushsh2003/AIClassOf26/blob/main/rbi_aayush.png?raw=true",
    jobTitle: "Aspiring Software Developer",
    description: "Computer Science & Engineering (AI) student passionate about web development, AI, and open-source.",
    alumniOf: { "@type": "CollegeOrUniversity", name: "Poornima College of Engineering" },
    sameAs: socials.map(s => s.url),
    knowsAbout: ["React", "TypeScript", "Tailwind CSS", "AI", "Open Source"],
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        <SEO
          title="About Developer — Aayush Sharma"
          description="Meet Aayush Sharma, creator of Aarti Sangrah ki Duniya — a CS & AI student passionate about React, TypeScript and open-source development."
          canonical="/about-developer"
          jsonLd={jsonLd}
        />

        <div className="container py-8 max-w-3xl">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          {/* Hero */}
          <header className="flex flex-col sm:flex-row items-center gap-6 mb-10 p-6 rounded-2xl border border-border bg-card shadow-warm">
            <img
              src="https://github.com/aayushsh2003/AIClassOf26/blob/main/rbi_aayush.png?raw=true"
              alt="Aayush Sharma — Developer of Aarti Sangrah ki Duniya"
              className="w-32 h-32 rounded-full object-cover border-4 border-primary/30 shadow-lg"
              loading="lazy"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-foreground mb-1">Aayush Sharma</h1>
              <p className="text-sm text-primary font-medium mb-2">
                Aspiring Software Developer · AI Enthusiast · Open-Source Contributor
              </p>
              <a
                href="https://aayush-ki-pehchan.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                aayush-ki-pehchan.vercel.app <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <div className="flex gap-3 mt-4 justify-center sm:justify-start">
                {socials.map(s => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-9 h-9 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </header>

          {/* About */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" /> About
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              I am a passionate Computer Science and Engineering (AI) student with a keen interest in
              web development, artificial intelligence, and open-source contributions. With hands-on
              experience in React, Tailwind CSS, TypeScript, and database management, I enjoy building
              modern, user-friendly web applications that solve real-world problems. Beyond coding, I
              actively contribute to open-source projects, mentor peers, and participate in technical
              initiatives that foster learning and collaboration. 🚀
            </p>
          </section>

          {/* Skills */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">Skills</h2>
            <div className="grid gap-3">
              {Object.entries(skills).map(([cat, list]) => (
                <div key={cat} className="p-4 rounded-xl border border-border bg-card">
                  <p className="text-xs uppercase tracking-wide text-primary font-semibold mb-2">{cat}</p>
                  <div className="flex flex-wrap gap-2">
                    {list.map(s => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" /> Education
            </h2>
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="font-semibold text-foreground">B.Tech — Computer Science & Engineering (AI)</p>
              <p className="text-sm text-muted-foreground">Poornima College of Engineering · 2022 – 2026</p>
              <p className="text-sm text-muted-foreground mt-1">CGPA: 9.03 (up to 6th semester)</p>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" /> Experience
            </h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-border bg-card">
                <p className="font-semibold text-foreground">SAS Certified Specialist Trainee</p>
                <p className="text-sm text-muted-foreground">R-CAT, Jaipur · Jan – Feb 2025</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <p className="font-semibold text-foreground">Web Development Intern</p>
                <p className="text-sm text-muted-foreground">Ui System Pvt. Ltd., Jaipur · Aug 2023</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center p-6 rounded-2xl gradient-devotional text-primary-foreground">
            <p className="text-lg font-semibold mb-2">Built with 🪔 devotion by Aayush</p>
            <p className="text-sm opacity-90 mb-4">Aarti Sangrah ki Duniya is an open devotional resource for everyone.</p>
            <a
              href="https://aayush-ki-pehchan.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-background text-foreground font-medium hover:scale-105 transition-transform"
            >
              <Mail className="h-4 w-4" /> Connect with Aayush
            </a>
          </section>
        </div>
        <BackToTop />
      </div>
    </PageTransition>
  );
};

export default AboutDeveloper;
