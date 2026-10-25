import { createFileRoute } from "@tanstack/react-router";

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
  { title: "Project One", text: "A short description of what this project does and why it matters.", tags: ["Web", "AI"] },
  { title: "Project Two", text: "Another project you are proud of, explained in one sentence.", tags: ["Open Source"] },
];

const links = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Email", href: "mailto:hello@example.com" },
];

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2">
      {tags.map((t) => (
        <span key={t} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">{t}</span>
      ))}
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 py-16">
      <h2 className="mb-10 text-sm font-semibold uppercase tracking-[0.25em]">{title}</h2>
      {children}
    </section>
  );
}

function Index() {
  return (
    <main className="mx-auto max-w-2xl px-6 text-center">
      <header className="flex min-h-[85vh] flex-col items-center justify-center py-20">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">Aggelos Tsi</h1>
        <p className="mt-3 text-primary">Software Developer</p>
        <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
          I build clean, fast and accessible products from idea to launch.
        </p>
        <nav className="mt-10 flex gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {["about", "experience", "projects"].map((s) => (
            <a key={s} href={`#${s}`} className="transition-colors hover:text-primary">{s}</a>
          ))}
        </nav>
        <div className="mt-8 flex gap-6 text-sm">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-primary">{l.label}</a>
          ))}
        </div>
      </header>

      <Section id="about" title="About">
        <p className="leading-relaxed text-muted-foreground">
          Hi, I'm Aggelos. I enjoy turning ideas into real products that people use. I care about
          good design, solid engineering and shipping quickly. When I'm not coding, I'm learning
          something new.
        </p>
      </Section>

      <Section id="experience" title="Experience">
        <div className="space-y-12">
          {experience.map((e) => (
            <div key={e.title}>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{e.date}</p>
              <h3 className="mt-2 text-lg font-semibold">{e.title}</h3>
              <p className="mt-2 text-muted-foreground">{e.text}</p>
              <Tags tags={e.tags} />
            </div>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Projects">
        <div className="space-y-6">
          {projects.map((p) => (
            <div key={p.title} className="rounded-xl border border-border p-6 transition-colors hover:border-primary">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-muted-foreground">{p.text}</p>
              <Tags tags={p.tags} />
            </div>
          ))}
        </div>
      </Section>

      <footer className="py-16 text-sm text-muted-foreground">
        <a href="mailto:hello@example.com" className="inline-block rounded-full border border-primary px-6 py-2 text-primary transition-colors hover:bg-accent">Contact me</a>
        <p className="mt-8">© {new Date().getFullYear()} Aggelos Tsi</p>
      </footer>
    </main>
  );
}
