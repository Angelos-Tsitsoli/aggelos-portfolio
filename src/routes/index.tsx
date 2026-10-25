import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import projectOneImg from "../assets/project-one.jpg";
import projectTwoImg from "../assets/project-two.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aggelos Tsi — Portfolio" },
      { name: "description", content: "Portfolio of Aggelos Tsi: about, experience and projects." },
      { property: "og:title", content: "Aggelos Tsi — Portfolio" },
      { property: "og:description", content: "Portfolio of Aggelos Tsi: about, experience and projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const experience = [
  { date: "2025 — Present", title: "Software Engineer · Company", text: "Building web products end-to-end with a focus on performance and clean UX.", tags: ["React", "TypeScript"] },
  { date: "2023 — 2025", title: "Frontend Developer · Studio", text: "Shipped interfaces for startups and clients in fast iteration cycles.", tags: ["UI", "Design Systems"] },
];

const projects = [
  { title: "Project One", text: "A short description of what this project does and why it matters.", tags: ["Web", "AI"], image: projectOneImg },
  { title: "Project Two", text: "Another project you are proud of, explained in one sentence.", tags: ["Open Source"], image: projectTwoImg },
];

const links = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Email", href: "mailto:hello@example.com" },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2">
      {tags.map((t) => (
        <span key={t} className="rounded-full bg-accent px-4 py-1.5 text-base font-medium text-primary">{t}</span>
      ))}
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 py-16">
      <Reveal>
        <h2 className="mb-12 text-xl font-semibold uppercase tracking-[0.25em]">{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}

function Index() {
  return (
    <main className="mx-auto max-w-4xl px-6 text-center">
      <header className="flex min-h-[85vh] flex-col items-center justify-center py-20">
        <Reveal>
          <h1 className="text-7xl font-bold tracking-tight sm:text-8xl">Aggelos Tsi</h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-4 text-xl text-primary">Software Developer</p>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            I build clean, fast and accessible products from idea to launch.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <nav className="mt-12 flex gap-12 text-base font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {["about", "experience", "projects"].map((s) => (
              <a key={s} href={`#${s}`} className="transition-colors hover:text-primary">{s}</a>
            ))}
          </nav>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-8 flex gap-6 text-sm">
            {links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="text-lg text-muted-foreground transition-colors hover:text-primary">{l.label}</a>
            ))}
          </div>
        </Reveal>
      </header>

      <Section id="about" title="About">
        <Reveal>
          <p className="text-xl leading-relaxed text-muted-foreground">
            Hi, I'm Aggelos. I enjoy turning ideas into real products that people use. I care about
            good design, solid engineering and shipping quickly. When I'm not coding, I'm learning
            something new.
          </p>
        </Reveal>
      </Section>

      <Section id="experience" title="Experience">
        <div className="space-y-12">
          {experience.map((e) => (
            <Reveal key={e.title}>
              <p className="text-sm uppercase tracking-widest text-muted-foreground">{e.date}</p>
              <h3 className="mt-3 text-2xl font-semibold">{e.title}</h3>
              <p className="mt-3 text-xl text-muted-foreground">{e.text}</p>
              <Tags tags={e.tags} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Projects">
        <div className="space-y-6">
          {projects.map((p) => (
            <Reveal key={p.title}>
              <div className="overflow-hidden rounded-xl border border-border transition-colors hover:border-primary">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1200}
                  height={675}
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-semibold">{p.title}</h3>
                  <p className="mt-3 text-xl text-muted-foreground">{p.text}</p>
                  <Tags tags={p.tags} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <footer className="py-16 text-lg text-muted-foreground">
        <Reveal>
          <a href="mailto:hello@example.com" className="inline-block rounded-full border border-primary px-8 py-3 text-xl text-primary transition-colors hover:bg-accent">Contact me</a>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-8">© {new Date().getFullYear()} Aggelos Tsi</p>
        </Reveal>
      </footer>
    </main>
  );
}
