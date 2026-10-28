import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
// Project cover images — kept for when the Projects section is re-enabled.
// import projectOneImg from "../assets/project-one.jpg";
// import projectTwoImg from "../assets/project-two.jpg";
import { Github, Linkedin, Mail } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aggelos Tsitsoli — Portfolio" },
      { name: "description", content: "Portfolio of Aggelos Tsitsoli: about, experience and projects." },
      { property: "og:title", content: "Aggelos Tsitsoli — Portfolio" },
      { property: "og:description", content: "Portfolio of Aggelos Tsitsoli: about, experience and projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const experience = [
  {
    date: "Feb 2025 — Feb 2026", title: "Software Engineer · Gloman S.A.", place: "Athens",
    points: [
      "Developed and maintained frontend and backend for the SportFM website (HTML, CSS, JavaScript, Java Servlets, JSP, JSTL, JDBC).",
      "Designed and enhanced the internal SportFM CMS used by authors and editors — dynamic SQL queries, database operations and editorial workflows.",
      "Integrated OpenAI APIs into the CMS to build a chatbot that helps editors write SEO-friendly articles, improve headlines and get content suggestions.",
      "Built and deployed a separate staging website on an Ubuntu VM (Proxmox, Apache Tomcat) so changes could be tested before going live.",
      "Configured Jenkins CI/CD to automatically rebuild and deploy the website after Git commits via SSH.",
      "Containerized the application with Docker and created GitHub Actions workflows and technical documentation.",
    ],
    tags: ["Java", "JSP", "SQL", "OpenAI", "Jenkins", "Docker"],
  },
  {
    date: "Jun 2024 — Dec 2024", title: "Software Developer Intern · Netcompany–Intrasoft", place: "Athens",
    points: [
      "Developed frontend features for a web application using Angular, JavaScript and React.",
      "Worked with REST APIs and Swagger for API documentation and testing.",
      "Used Figma to review UI designs and support frontend implementation.",
      "Investigated and resolved software defects through development tickets and debugging.",
      "Collaborated with the team using GitHub, GitLab and Azure-based tools.",
    ],
    tags: ["Angular", "React", "REST APIs", "Swagger", "Figma"],
  },
];

const skills = [
  { group: "Languages", items: ["Java", "JavaScript", "SQL", "HTML", "CSS", "Groovy"] },
  { group: "Frameworks & Technologies", items: ["Java Servlets", "JSP", "JSTL", "JDBC", "Angular", "React", "REST APIs"] },
  { group: "Databases", items: ["Microsoft SQL Server"] },
  { group: "Tools & Platforms", items: ["Git", "GitHub", "GitLab", "Jenkins", "Docker", "Apache Tomcat", "Jetty", "Maven", "Swagger", "Figma"] },
  { group: "Infrastructure & DevOps", items: ["Linux (Ubuntu)", "Proxmox", "CI/CD", "GitHub Actions", "Virtual Machines"] },
  { group: "Concepts", items: ["OOP", "Backend Development", "Frontend Development", "API Integration", "Database Management", "Software Testing", "AI Integration"] },
];

// Projects data — commented out for now, kept for future use.
// const projects = [
//   { title: "Project One", text: "A short description of what this project does and why it matters.", tags: ["Web", "AI"], image: projectOneImg },
//   { title: "Project Two", text: "Another project you are proud of, explained in one sentence.", tags: ["Open Source"], image: projectTwoImg },
// ];

const roles = ["Software Engineer", "Full-Stack Developer", "Java & Web Developer"];

function Typewriter() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(roles[0] ?? "");
      return;
    }
    const word = roles[index % roles.length] ?? "";
    const done = !deleting && text.length === word.length;
    const empty = deleting && text.length === 0;
    const delay = done ? 1700 : empty ? 350 : deleting ? 45 : 95;
    const timer = setTimeout(() => {
      if (done) setDeleting(true);
      else if (empty) {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else if (deleting) setText(word.slice(0, text.length - 1));
      else setText(word.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(timer);
  }, [text, index, deleting]);

  return (
    <p className="mt-4 min-h-[2rem] text-xl text-primary">
      {text}
      <span className="caret" aria-hidden="true" />
    </p>
  );
}

const links = [
  { label: "GitHub", href: "https://github.com/Angelos-Tsitsoli", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aggelos-tsitsoli-586b03360/", icon: Linkedin },
  { label: "Email", href: "mailto:aggelostsitsoli@gmail.com", icon: Mail },
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

function Tags({ tags, align = "center" }: { tags: string[]; align?: "center" | "left" }) {
  return (
    <div className={`mt-4 flex flex-wrap gap-2 ${align === "center" ? "justify-center" : "justify-start"}`}>
      {tags.map((t) => (
        <span key={t} className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-primary">{t}</span>
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
          <h1 className="text-7xl font-bold tracking-tight sm:text-8xl">Aggelos Tsitsoli</h1>
        </Reveal>
        <Reveal delay={100}>
          <Typewriter />
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            Software engineer from Athens building web apps, CMS tools and CI/CD pipelines.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <nav className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4 text-base font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {["about", "experience", "education", "skills", /* "projects", */].map((s) => (
              <a key={s} href={`#${s}`} className="transition-colors hover:text-primary">{s}</a>
            ))}
          </nav>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-10 flex justify-center gap-4">
            {links.map((l) => {
              const Icon = l.icon;
              return (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={l.label}
                  title={l.label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon size={22} />
                </a>
              );
            })}
          </div>
        </Reveal>
      </header>

      <Section id="about" title="About">
        <Reveal>
          <p className="text-xl leading-relaxed text-muted-foreground">
            Hi, I'm Aggelos, a software engineer based in Athens with a Bachelor's in Informatics and
            Telecommunications. I work across the stack — from Java backends and SQL databases to Angular
            and React frontends — and enjoy automating deployments and integrating AI into real products.
          </p>
        </Reveal>
      </Section>

      <Section id="experience" title="Experience">
        <div className="space-y-12">
          {experience.map((e) => (
            <Reveal key={e.title}>
              <p className="text-sm uppercase tracking-widest text-muted-foreground">{e.date}</p>
              <h3 className="mt-3 text-2xl font-semibold">{e.title}</h3>
              <p className="mt-1 text-muted-foreground">{e.place}</p>
              <ul className="mx-auto mt-5 max-w-2xl list-disc space-y-2 pl-5 text-left text-lg text-muted-foreground">
                {e.points.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
              <Tags tags={e.tags} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="education" title="Education">
        <Reveal>
          <p className="text-sm uppercase tracking-widest text-muted-foreground">2020 — 2025 · Athens</p>
          <h3 className="mt-3 text-2xl font-semibold">Bachelor's Degree in Informatics and Telecommunications</h3>
          <p className="mt-2 text-xl text-muted-foreground">Department of Informatics and Telecommunications</p>
          <p className="mt-1 text-lg text-muted-foreground">National Kapodistrian University of Athens</p>
          <p className="mt-4 text-lg text-muted-foreground">Relevant coursework:</p>
          <Tags tags={["Artificial Intelligence I", "Data Mining Techniques", "Database Design and Use", "Database Systems Implementation"]} />
        </Reveal>
      </Section>

      <Section id="skills" title="Skills">
        <div className="space-y-10">
          {skills.map((g) => (
            <Reveal key={g.group}>
              <h3 className="text-lg font-semibold">{g.group}</h3>
              <Tags tags={g.items} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Projects section — commented out for future use.
      <Section id="projects" title="Projects">
        <div className="mx-auto max-w-xl space-y-6">
          {projects.map((p) => (
            <Reveal key={p.title}>
              <div className="group mx-auto flex max-w-xl flex-col overflow-hidden rounded-xl bg-card shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-2 hover:shadow-xl sm:flex-row">
                <div className="shrink-0 sm:w-2/5">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={1200}
                    height={675}
                    className="h-40 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 sm:h-full"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center p-6">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-base text-muted-foreground">{p.text}</p>
                  <Tags tags={p.tags} align="left" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      */}

      <footer className="py-16 text-lg text-muted-foreground">
        <Reveal>
          <a href="mailto:aggelostsitsoli@gmail.com" className="inline-block rounded-full border border-primary px-8 py-3 text-xl text-primary transition-colors hover:bg-accent">Contact me</a>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-10 flex justify-center gap-4">
            {links.map((l) => {
              const Icon = l.icon;
              return (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={l.label}
                  title={l.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-8">© {new Date().getFullYear()} Aggelos Tsitsoli</p>
        </Reveal>
      </footer>
    </main>
  );
}
