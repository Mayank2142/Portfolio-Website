import { Link } from 'react-router';
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  Code2,
  Terminal,
  GraduationCap,
  Trophy,
  Users,
} from 'lucide-react';
import { projects, credentials, profile } from '@portfolio/core';
import {
  Reveal,
  SectionHeading,
  ProjectCard,
  AllWorkLink,
  PageMeta,
  External,
} from '../components/ui';
import { HeroShowcase } from '../components/hero-showcase';
import { ScrollRibbon } from '../components/scroll-ribbon';
import { Contact } from '../components/contact';
import { SkillsExplorer } from '../components/experience-motion';
import { Magnetic } from '../components/magnetic';
import { HeroSignature } from '../components/hero-signature';
import { MilestoneCard } from '../components/milestone-card';
import { HoverWord } from '../components/hover-word';

export const meta = () =>
  PageMeta(
    'Software developer · Full-stack & AI systems',
    'Mayank Gupta’s work in full-stack applications, AI workflows, frontend engineering, and mobile systems. Explore projects, internships and technical case studies.',
  );
export default function Home() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-atmosphere" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="hero-copy">
          <p className="hero-label mono">
            SOFTWARE DEVELOPER{' '}
            <span className="label-divider">/</span> VIT ’27
          </p>
          <HeroSignature />
          <p className="hero-description">
            I build thoughtful interfaces and intelligent systems—with care for what you see and
            what happens underneath.
          </p>
          <div className="hero-buttons">
            <Magnetic>
              <Link to="/#work" className="button primary">
                Explore my work <ArrowUpRight size={18} />
              </Link>
            </Magnetic>
            <Magnetic>
              <a href="/resume.pdf" download="Mayank-Gupta-Resume.pdf" className="button secondary">
                Download resume <ArrowDown size={17} />
              </a>
            </Magnetic>
          </div>
          <div className="hero-socials">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github size={16} /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>
        <HeroShowcase />
        <div className="hero-bottom">
          <span className="mono">INTERFACES. SYSTEMS. THE DETAILS BETWEEN.</span>
          <a href="#work" className="mono">
            SCROLL TO EXPLORE <ArrowDown size={14} />
          </a>
        </div>
      </section>
      <div className="profile-ribbon shell" aria-label="Portfolio at a glance">
        <div><strong>{String(projects.length).padStart(2, '0')}</strong><span>Projects to explore<small>Web, AI & mobile</small></span></div>
        <div><strong>02</strong><span>Industry internships<small>Valsco Technology · KrizPay</small></span></div>
        <div><GraduationCap size={33} aria-hidden="true" /><span>VIT Vellore<small>CSE · Information Security</small></span></div>
      </div>
      <ScrollRibbon />
      <section className="section shell" id="work">
        <SectionHeading
          index="01"
          label="SELECTED WORK"
          title={<>Selected projects.</>}
          subtitle="A selection of builds across AI, full-stack engineering, and mobile experiences."
        >
          <AllWorkLink />
        </SectionHeading>
        <div className="project-grid selected-project-grid">
          {projects
            .filter((p) => p.featured)
            .map((p) => (
              <Reveal key={p.slug}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
        </div>
      </section>
      <section className="section shell experience-section" id="experience">
        <SectionHeading
          index="02"
          label="EXPERIENCE"
          title={<>Experience.</>}
          subtitle="Two internships. Different products. The same commitment to making things work."
        />
        <div className="experience-list">
          <Reveal>
            <details className="experience-item" open>
              <summary>
                <span className="experience-date mono">JUN — AUG 2025</span>
                <span className="company-mark valsco">V</span>
                <span className="experience-name">
                  <h3>Valsco Technology</h3>
                  <span>
                    Frontend Developer <b>· Internship</b>
                  </span>
                </span>
                <span className="experience-chevron">+</span>
              </summary>
              <div className="experience-details">
                <p>Connecting thoughtful UI with production systems.</p>
                <div className="experience-metrics">
                  <div>
                    <strong>4</strong>
                    <span>Features shipped</span>
                  </div>
                  <div>
                    <strong>5+</strong>
                    <span>APIs integrated</span>
                  </div>
                  <div>
                    <strong>15+</strong>
                    <span>Bugs resolved</span>
                  </div>
                </div>
                <p className="muted">
                  Built reusable interfaces, integrated APIs across microservices, and debugged
                  production workflows with backend engineers. Improved reliability through API-call
                  optimization and component refactoring.
                </p>
                <div className="tags">
                  <span>React</span>
                  <span>JavaScript</span>
                  <span>Tailwind CSS</span>
                  <span>API integration</span>
                </div>
              </div>
            </details>
          </Reveal>
          <Reveal>
            <details className="experience-item">
              <summary>
                <span className="experience-date mono">MAR — MAY 2025</span>
                <span className="company-mark krizpay">K</span>
                <span className="experience-name">
                  <h3>KrizPay</h3>
                  <span>
                    Web Developer <b>· Internship</b>
                  </span>
                </span>
                <span className="experience-chevron">+</span>
              </summary>
              <div className="experience-details">
                <p>A startup’s web experience, built component by component.</p>
                <p className="muted">
                  Developed responsive navigation, landing pages, and reusable service components.
                  Worked with React, TypeScript, Vite and Tailwind CSS, bringing consistent mobile
                  interaction and modular structure to the application.
                </p>
                <p className="muted">
                  Used Git/GitHub for collaboration and implemented lazy loading and conditional
                  rendering to keep the experience efficient.
                </p>
                <div className="tags">
                  <span>React</span>
                  <span>TypeScript</span>
                  <span>Vite</span>
                  <span>Tailwind CSS</span>
                </div>
                <External href="https://github.com/Mayank2142/krizpay-home">
                  View frontend source
                </External>
              </div>
            </details>
          </Reveal>
        </div>
      </section>
      <section className="section shell approach-section" id="approach">
        <SectionHeading index="03" label="SKILLS" title={<>The tools behind my work.</>} />
        <SkillsExplorer />
      </section>
      <section className="section shell leadership-section" id="leadership">
        <SectionHeading index="04" label="BEYOND THE CODE" title={<>Leadership & community.</>} />
        <div className="leadership-layout">
          <MilestoneCard className="leadership-intro">
            <div className="mozilla-mark" aria-hidden="true">
              <Users size={28} />
            </div>
            <h3>
              <HoverWord text="Mozilla Firefox Club" />
              <br />
              <HoverWord text="VIT Vellore" />
            </h3>
            <p>
              From contributing to leading. A space to learn collaboration, coordinate events, and
              help a technical community grow.
            </p>
            <span className="mono">STUDENT COMMUNITY · 2024—2025</span>
          </MilestoneCard>
          <div className="leadership-timeline">
            <span className="timeline-traveller" aria-hidden="true" />
            <Reveal className="leadership-step">
              <span className="timeline-dot" aria-hidden="true" />
              <p className="mono">FEB — MAY 2025</p>
              <h3><HoverWord text="Senior Core Committee Member" /></h3>
              <p>
                Promoted for consistent contributions and leadership. Part of the organizing team
                for <strong>Tech Talk with Love Babbar.</strong>
              </p>
            </Reveal>
            <Reveal className="leadership-step">
              <span className="timeline-dot" aria-hidden="true" />
              <p className="mono">JUL 2024 — FEB 2025</p>
              <h3><HoverWord text="Core Committee Member" /></h3>
              <p>
                Event Coordinator for <strong>Query & Conquer</strong>, collaborating with student
                teams to bring the session together.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="section shell achievements-section" id="achievements">
        <SectionHeading index="05" label="CHALLENGES & MILESTONES" title={<>Achievements.</>} />
        <div className="achievement-grid">
          <MilestoneCard className="achievement-item" index={0}>
            <span className="award-icon" aria-hidden="true">
              <Trophy size={21} />
            </span>
            <strong className="achievement-number">
              02<span>nd</span>
            </strong>
            <h3><HoverWord text="iHackMyPlace 2026" /></h3>
            <p>
              Second prize at Société Générale’s hackathon, building Sentinel AML as part of a team.
            </p>
            <span className="mono">TEAM AWARD · ₹10,000 PRIZE</span>
          </MilestoneCard>
          <MilestoneCard className="achievement-item" index={1}>
            <span className="award-icon" aria-hidden="true">
              <Code2 size={21} />
            </span>
            <strong className="achievement-number">
              250<span>th</span>
            </strong>
            <h3><HoverWord text="Goldman Sachs India" /></h3>
            <p>Ranked 250 among 15,900+ participants in the 2026 hackathon.</p>
            <span className="mono">TOP 1.6% · 2026</span>
          </MilestoneCard>
          <MilestoneCard className="achievement-item" index={2}>
            <span className="award-icon" aria-hidden="true">
              <ArrowUpRight size={23} />
            </span>
            <strong className="achievement-number">
              03<span>rd round</span>
            </strong>
            <h3><HoverWord text="Flipkart GRiD 8.0" /></h3>
            <p>Advanced to Round 3, among the top 2% of 165,730+ participants.</p>
            <span className="mono">NATIONAL CHALLENGE · 2026</span>
          </MilestoneCard>
        </div>
      </section>
      <section className="section shell credentials-section" id="credentials">
        <SectionHeading
          index="06"
          label="KEEP LEARNING"
          title={<>Certifications & learning.</>}
          subtitle="Formal learning alongside the things I build."
        />
        <div className="credential-list">
          {credentials.map((c) => (
            <div className="credential-item" key={c.name}>
              <div>
                <p className="mono credential-issuer">{c.issuer}</p>
                <h3>{c.name}</h3>
                {c.date !== 'Learning credential' && (
                  <span className="credential-date">{c.date}</span>
                )}
              </div>

              {c.url ? (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="credential-action"
                  aria-label={`View ${c.name} credential`}
                >
                  <span>Verify</span>
                  <ArrowUpRight size={21} />
                </a>
              ) : null}
            </div>
          ))}
        </div>
        <div className="coding-panel">
          <div>
            <p className="eyebrow">THE DAILY PRACTICE</p>
            <h3>Coding practice.</h3>
            <p>Follow my problem-solving practice on LeetCode and Codolio.</p>
          </div>
          <div className="coding-links">
            <External href={profile.leetcode} className="profile-link">
              <Code2 size={18} /> LeetCode
            </External>
            <External href={profile.codolio} className="profile-link">
              <Terminal size={18} /> Codolio
            </External>
          </div>
        </div>
      </section>
      <section className="section shell about-section" id="about">
        <div className="about-heading">
          <p className="eyebrow">
            <span>07</span> / A LITTLE ABOUT ME
          </p>
          <h2>
            About me<span className="cyan">.</span>
          </h2>
          <div className="education-card">
            <GraduationCap size={24} />
            <div>
              <strong>Vellore Institute of Technology</strong>
              <span>B.Tech · CSE (Information Security)</span>
              <small className="mono">2023—2027 · CGPA 9.04 / 10</small>
            </div>
          </div>
        </div>
        <div className="about-copy">
          <p>
            I’m a Computer Science and Engineering student specializing in{' '}
            <strong>Information Security</strong> at VIT Vellore, with expected graduation in 2027.
          </p>
          <p>
            My work spans frontend products, full-stack systems, AI workflows, and mobile/IoT
            applications. Two internships and my Mozilla club responsibilities have shaped how I
            build and collaborate.
          </p>
          <a className="text-link" href="/resume.pdf" target="_blank" rel="noreferrer">
            View my resume <ArrowUpRight size={15} />
          </a>
        </div>
      </section>
      <Contact />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: profile.name,
            email: profile.email,
            sameAs: [profile.github, profile.linkedin, profile.leetcode, profile.codolio],
            affiliation: {
              '@type': 'CollegeOrUniversity',
              name: 'Vellore Institute of Technology',
            },
            knowsAbout: [
              'Frontend engineering',
              'Full-stack development',
              'AI workflows',
              'Information Security',
            ],
          }).replaceAll('<', '\\u003c'),
        }}
      />
    </>
  );
}
