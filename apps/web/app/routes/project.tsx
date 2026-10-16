import { Link, useLoaderData } from 'react-router';
import { ArrowLeft, ArrowUpRight, Github, ArrowRight } from 'lucide-react';
import { projects } from '@portfolio/core';
import { PageMeta, Reveal } from '../components/ui';
import { ScreenshotViewer } from '../components/screenshot-viewer';
import { HelmetArtwork } from '../components/helmet-artwork';
import { CaseNavigation } from '../components/case-navigation';
export function loader({ params }: { params: { slug?: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) throw new Response('Project not found', { status: 404 });
  return { project };
}
export function meta({ data }: { data?: ReturnType<typeof loader> }) {
  return data
    ? PageMeta(data.project.name, data.project.description, data.project.slug)
    : PageMeta('Project not found', 'Find Mayank’s latest work in the project library.');
}
export default function ProjectDetail() {
  const { project: p } = useLoaderData<typeof loader>();
  const next = projects[(projects.findIndex((x) => x.slug === p.slug) + 1) % projects.length];
  return (
    <article className={`shell case-study accent-${p.accent}`}>
      <Link className="text-link case-back" to="/projects">
        <ArrowLeft size={15} /> All projects
      </Link>
      <header className="case-header">
        <p className="eyebrow">
          {p.number} / {p.kind.toUpperCase()}
        </p>
        <h1>
          {p.name}
          <span className="cyan">.</span>
        </h1>
        <p className="case-kicker">{p.kicker}</p>
        <p className="case-description">{p.description}</p>
        <div className="case-actions">
          <a href={p.github} target="_blank" rel="noreferrer" className="button primary">
            <Github size={17} /> View source <ArrowUpRight size={17} />
          </a>
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noreferrer" className="button secondary">
              Explore demo <ArrowUpRight size={17} />
            </a>
          )}
        </div>
      </header>
      {p.slug === 'smart-helmet' && <HelmetArtwork detail />}
      {p.image && (
        <ScreenshotViewer
          src={p.image}
          alt={p.imageAlt || p.name}
          phone={p.slug === 'campusmate'}
        />
      )}
      <div className="case-layout">
        <aside className="case-sidebar">
          <p className="eyebrow">AT A GLANCE</p>
          <h3>Project context</h3>
          <p>{p.kind}</p>
          <h3>My role / team</h3>
          <p>{p.role}</p>
          <h3>Tools used</h3>
          <div className="tags">
            {p.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <CaseNavigation key={p.slug} />
        </aside>
        <div className="case-body">
          <Reveal>
            <section id="problem">
              <p className="eyebrow">01 / THE CONTEXT</p>
              <h2>The problem worth solving.</h2>
              <p>{p.problem}</p>
              <h3>The approach</h3>
              <p>{p.solution}</p>
            </section>
          </Reveal>
          <Reveal>
            <section id="architecture">
              <p className="eyebrow">02 / UNDER THE HOOD</p>
              <h2>How the pieces connect.</h2>
              <div className="architecture-flow">
                {p.architecture.map((layer, i) => (
                  <div key={layer}>
                    <span className="mono">0{i + 1}</span>
                    <strong>{layer}</strong>
                    {i < p.architecture.length - 1 && <ArrowRight size={15} />}
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
          <Reveal>
            <section id="decisions">
              <p className="eyebrow">03 / ENGINEERING JUDGMENT</p>
              <h2>The decisions behind the build.</h2>
              {p.decisions.map((d, i) => (
                <div className="decision" key={d.title}>
                  <span className="mono">0{i + 1}</span>
                  <div>
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              ))}
            </section>
          </Reveal>
          <Reveal>
            <section id="evidence">
              <p className="eyebrow">04 / WHAT TO INSPECT</p>
              <h2>Evidence, and its boundaries.</h2>
              <ul className="evidence-list">
                {p.evidence.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
              {p.note && <p className="evidence-note">{p.note}</p>}
              <a className="text-link" href={p.github} target="_blank" rel="noreferrer">
                Inspect the repository <ArrowUpRight size={15} />
              </a>
              {p.slug === 'sentinel-aml' && (
                <a
                  className="text-link secondary-source"
                  href="https://github.com/Mayank2142/Anti-Money-Laundering-Detection"
                  target="_blank"
                  rel="noreferrer"
                >
                  AWS deployment variant <ArrowUpRight size={15} />
                </a>
              )}
              {p.slug === 'dependency-risk' && (
                <a
                  className="text-link secondary-source"
                  href="https://github.com/deveshsinghal09/DepShield"
                  target="_blank"
                  rel="noreferrer"
                >
                  Original DepShield project <ArrowUpRight size={15} />
                </a>
              )}
            </section>
          </Reveal>
          <Reveal>
            <section className="lesson-section" id="takeaway">
              <p className="eyebrow">05 / THE TAKEAWAY</p>
              <h2>What I’m taking forward.</h2>
              <p>{p.lessons}</p>
            </section>
          </Reveal>
        </div>
      </div>
      <Link className="next-project" to={`/projects/${next.slug}`}>
        <div>
          <p className="eyebrow">KEEP EXPLORING</p>
          <h2>{next.name}</h2>
        </div>
        <ArrowUpRight size={44} />
      </Link>
    </article>
  );
}
