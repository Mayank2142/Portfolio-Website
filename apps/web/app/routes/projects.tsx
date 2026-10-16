import { useSearchParams } from 'react-router';
import { useSyncExternalStore } from 'react';
import { projects, categories } from '@portfolio/core';
import { ProjectCard, PageMeta, Reveal } from '../components/ui';
import { motionTokens } from '../components/motion-system';
const subscribe = () => () => {};
const clientReady = () => true;
const prerenderReady = () => false;
export const meta = () =>
  PageMeta(
    'Project library',
    'Explore Mayank Gupta’s full-stack, AI, mobile, IoT and frontend projects, with technical context and source evidence.',
  );
export default function ProjectLibrary() {
  const [params, setParams] = useSearchParams();
  // Static HTML contains every project; match it during hydration before applying the URL filter.
  const ready = useSyncExternalStore(subscribe, clientReady, prerenderReady);
  const raw = ready ? params.get('category') || 'All' : 'All';
  const category = categories.includes(raw) ? raw : 'All';
  const filtered = projects.filter((p) => category === 'All' || p.categories.includes(category));
  return (
    <div className="shell library-page">
      <div className="page-heading">
        <p className="eyebrow">THE PROJECT LIBRARY</p>
        <h1>
          Work. Experiments.
          <br />
          <span className="muted-title">Things worth building.</span>
        </h1>
        <p>A closer look at the systems, interfaces, and ideas behind my work.</p>
      </div>
      <div className="filter-bar">
        <div className="filters" role="group" aria-label="Filter projects">
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              onClick={() =>
                setParams(c === 'All' ? {} : { category: c }, { preventScrollReset: true })
              }
            >
              {c}
            </button>
          ))}
        </div>
        <span className="mono" role="status">
          {filtered.length} {filtered.length === 1 ? 'PROJECT' : 'PROJECTS'}
        </span>
      </div>
      <div className="project-grid">
        {filtered.map((p, index) => (
          <Reveal key={p.slug} delay={Math.min(index, 3) * motionTokens.stagger}>
            <ProjectCard project={p} compact />
          </Reveal>
        ))}
      </div>
      <p className="library-note mono">
        TEAM WORK, PROTOTYPES AND ATTRIBUTED CONTINUATIONS ARE IDENTIFIED IN EACH CASE STUDY.
      </p>
    </div>
  );
}
