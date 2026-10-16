import { z } from 'zod';

export const contactSchema = z.object({
  submissionId: z.string().uuid(),
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  email: z.string().trim().email('Please enter a valid email address.').max(254),
  subject: z.string().trim().min(3, 'Please add a subject.').max(160),
  message: z.string().trim().min(20, 'Please write at least 20 characters.').max(5000),
  website: z.string().max(200).default(''),
});
export type ContactInput = z.infer<typeof contactSchema>;
export const profile = {
  name: 'Mayank Gupta',
  email: 'mayankgupta17may@gmail.com',
  github: 'https://github.com/Mayank2142',
  linkedin: 'https://www.linkedin.com/in/mayank-gupta-14b95428b/',
  leetcode: 'https://leetcode.com/u/Mayank1720/',
  codolio: 'https://codolio.com/profile/Mayank1720',
};
export type Project = {
  slug: string;
  name: string;
  kicker: string;
  description: string;
  categories: string[];
  stack: string[];
  image?: string;
  imageAlt?: string;
  accent: string;
  number: string;
  github: string;
  demo?: string;
  featured: boolean;
  kind: string;
  role: string;
  problem: string;
  solution: string;
  architecture: string[];
  decisions: { title: string; text: string }[];
  evidence: string[];
  lessons: string;
  note?: string;
};
export const projects: Project[] = [
  {
    slug: 'sentinel-aml',
    name: 'Sentinel AML',
    kicker: 'AI that follows the evidence.',
    number: '01',
    description:
      'An investigation workspace that turns a question into an analytical plan, explainable risk, and a trace you can inspect.',
    categories: ['AI', 'Full-stack'],
    stack: ['React', 'FastAPI', 'DuckDB', 'Python', 'LLMs'],
    image: '/images/sentinel.webp',
    imageAlt: 'Sentinel AML command center and investigation dashboard',
    accent: 'cyan',
    github: 'https://github.com/Mayank2142/Sentinel-AML',
    demo: 'https://sentinel-aml-gamma.vercel.app',
    featured: true,
    kind: 'Team / hackathon project',
    role: 'Collaborative development across the investigation workflow and application.',
    problem:
      'Transaction analysis needs more than an anomaly score. An investigator needs to know which data was examined, why a result was flagged, and how to reproduce the finding.',
    solution:
      'A query-driven workspace chooses relevant analytical tools, combines rules and model signals, and keeps source evidence connected to each explanation and review action.',
    architecture: [
      'React investigation workspace',
      'FastAPI intent and tool orchestration',
      'DuckDB analytical queries',
      'Rules + statistics + Isolation Forest',
      'Evidence, provenance and human review',
    ],
    decisions: [
      {
        title: 'Plan around the question',
        text: 'Select aggregation, exploration, feature, model or graph tools based on intent rather than running every tool for every query.',
      },
      {
        title: 'Ground the explanation',
        text: 'Tie generated findings to detector signals and source data so an analyst can inspect the evidence.',
      },
      {
        title: 'Keep humans in the loop',
        text: 'Separate risk prioritization from a final regulatory decision. The workspace supports investigation and review.',
      },
    ],
    evidence: [
      '5.1M+ records across documented analytical workspaces',
      'Source-backed traces and review surfaces',
      'An AWS deployment variant documented in a companion repository',
    ],
    lessons:
      'Good AI tooling makes uncertainty and provenance visible. An explanation becomes useful when someone can verify its source.',
    note: 'Dataset scale is documented project evidence, not a customer or production-traffic claim. The AWS variant is the same product, not a second project.',
  },
  {
    slug: 'cinebook',
    name: 'CineBook',
    kicker: 'One seat. One winning request.',
    number: '02',
    description:
      'A movie and event booking experience with temporary seat holds, fair waitlists, live inventory, and recovery when things go wrong.',
    categories: ['Full-stack'],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'SSE'],
    image: '/images/cinebook.webp',
    imageAlt: 'CineBook dark movie discovery interface',
    accent: 'mint',
    github: 'https://github.com/Mayank2142/ticket-booking',
    demo: 'https://ticket-booking-production-dd12.up.railway.app',
    featured: true,
    kind: 'Full-stack project',
    role: 'Full-stack application development, booking workflows, API integration and reliability.',
    problem:
      'A seat grid is straightforward until customers compete for one seat, abandon checkout, or accept a waitlist offer at the same moment.',
    solution:
      'Model inventory per show, enforce ownership and expiry at the database boundary, and connect the interface to live invalidation and recoverable background work.',
    architecture: [
      'React + TypeScript customer and operations UI',
      'Node API and shared validation',
      'PostgreSQL authoritative inventory',
      'SSE + optional Redis invalidation',
      'Durable expiry and notification jobs',
    ],
    decisions: [
      {
        title: 'Make the database authoritative',
        text: 'Atomic state conditions validate the seat, hold owner and expiry before confirmation. UI state is not the booking lock.',
      },
      {
        title: 'Recover abandoned work',
        text: 'Expiry is enforced during reads and by a background worker, with durable jobs for interrupted processing.',
      },
      {
        title: 'Keep the queue fair',
        text: 'A cancellation can become a single-use offer to the next eligible queue member instead of a free-for-all.',
      },
    ],
    evidence: [
      'Customer, organiser and administrator workflows',
      'Committed screenshots across light and dark themes',
      'Documented concurrency and recovery behavior',
    ],
    lessons:
      'The happy path is only one part of a booking system. Ownership, expiry, cancellation and retries deserve the same design attention.',
    note: 'The demo uses sample events and no real payment gateway. Its documented deployment does not currently send external email. SQLite is available for local/test use.',
  },
  {
    slug: 'smart-helmet',
    name: 'Smart Helmet',
    kicker: 'From sensor signal to a useful alert.',
    number: '03',
    description:
      'An IoT accident-alert prototype connecting ESP32/MPU6050 telemetry to Firebase and a Flutter monitoring app.',
    categories: ['Mobile/IoT'],
    stack: ['ESP32', 'Flutter', 'Firebase', 'MPU6050'],
    accent: 'cyan',
    github: 'https://github.com/Mayank2142/Smart_Helmet',
    featured: true,
    kind: 'IoT prototype · Mar–Apr 2026',
    role: 'IoT and mobile application prototyping.',
    problem: 'Sensor readings must become understandable app states and actionable alerts.',
    solution: 'Connect motion telemetry, a realtime data layer and mobile monitoring.',
    architecture: [
      'ESP32 sensor',
      'Firebase realtime data',
      'Flutter monitoring',
      'Location-tagged alert workflow',
    ],
    decisions: [
      {
        title: 'Make system state visible',
        text: 'Present acceleration, connection and alert states in the app.',
      },
    ],
    evidence: ['Firmware and Flutter structure documented in source'],
    lessons: 'Hardware and software need a shared model of events and failure states.',
    note: 'Prototype evidence is not a claim of validated safety performance. Portfolio demonstrations use recorded or simulated events, never real emergency dispatch.',
  },
  {
    slug: 'campusmate',
    name: 'CampusMate',
    kicker: 'A campus, made easier to explore.',
    number: '04',
    description:
      'A mobile campus companion with interactive maps, location details, room previews, panoramas, and audio-guided tours.',
    categories: ['Mobile/IoT'],
    stack: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'Google Maps'],
    image: '/images/campusmate.webp',
    imageAlt: 'CampusMate mobile campus navigation application',
    accent: 'peach',
    github: 'https://github.com/Mayank2142/Campus-Mate',
    featured: true,
    kind: 'Collaborative mobile project · Jan–Mar 2026',
    role: 'Mobile application development in collaboration with Ritik.',
    problem:
      'New students need context about campus spaces, not just a map pin: where to go, what is inside, and what a room actually looks like.',
    solution:
      'Combine campus navigation with detailed location content, room imagery, rich media and a data-backed mobile experience.',
    architecture: [
      'Flutter mobile app',
      'Google Maps and location services',
      'Supabase authentication + PostgreSQL',
      'Panoramas, models and audio',
      'Local mock-data fallback',
    ],
    decisions: [
      {
        title: 'Connect map and context',
        text: 'A location opens meaningful details, amenities and media instead of ending at a marker.',
      },
      {
        title: 'Design around mobile',
        text: 'Keep navigation, media and location actions accessible within a compact touch interface.',
      },
      {
        title: 'Keep exploration available',
        text: 'A documented local-data fallback lets the interface remain usable during network interruptions.',
      },
    ],
    evidence: [
      'Nine application screenshots in the repository',
      'Maps, hostel previews and rich media',
      'Supabase-backed authentication and campus content',
    ],
    lessons:
      'Useful navigation combines spatial information with the practical questions a student is trying to answer.',
  },
  {
    slug: 'operator-assistant',
    name: 'Operator Assistant',
    kicker: 'Grounded guidance for a complex workflow.',
    number: '05',
    description:
      'An operator co-pilot prototype for task planning, telemetry, deterministic safety rules, incident handling, and cited guidance.',
    categories: ['AI', 'Full-stack'],
    stack: ['Telemetry', 'RAG', 'APIs', 'Observability'],
    accent: 'mint',
    github: 'https://github.com/Mayank2142/Smart-Operator-Assistant-for-CAT-Machinery',
    featured: false,
    kind: 'Local prototype',
    role: 'Prototype application work connecting operator workflows with grounded assistance.',
    problem: 'Operators need a single view of tasks, machine signals and relevant procedures.',
    solution: 'Connect task and incident workflows with telemetry and source-cited assistance.',
    architecture: [
      'Operator dashboard',
      'Telemetry ingestion',
      'Deterministic safety rules',
      'Document retrieval and citations',
    ],
    decisions: [
      {
        title: 'Keep rules authoritative',
        text: 'Safety rules take priority over generated advice.',
      },
    ],
    evidence: ['Documented local implementation and hardening'],
    lessons: 'An assistant should expose its sources and stay within the workflow it supports.',
    note: 'A local prototype, not a verified cloud deployment or official CAT affiliation. Synthetic telemetry is demonstration data.',
  },
  {
    slug: 'dincharya',
    name: 'Dincharya',
    kicker: 'Digital utility with a tactile feel.',
    number: '06',
    description:
      'An interactive calendar with range selection, contextual notes, keyboard actions, local persistence, and spring motion.',
    categories: ['Frontend'],
    stack: ['React', 'TypeScript', 'Motion', 'Zustand'],
    accent: 'peach',
    github: 'https://github.com/Mayank2142/sentient-calendar',
    featured: false,
    kind: 'Frontend challenge project',
    role: 'Interactive frontend implementation.',
    problem: 'Turn a static wall-calendar reference into a usable interactive component.',
    solution:
      'Combine date-range selection, notes and keyboard navigation with a coherent visual system.',
    architecture: ['React calendar UI', 'Zustand state', 'Local storage', 'Motion interactions'],
    decisions: [
      {
        title: 'Keep useful actions close',
        text: 'Range selection exposes the notes and actions relevant to that date context.',
      },
    ],
    evidence: ['Repository screenshot gallery and interaction documentation'],
    lessons: 'Motion should reinforce the state change a person has just made.',
    note: 'This existing project uses Next.js. The new portfolio itself uses React/Vite.',
  },
  {
    slug: 'dependency-risk',
    name: 'Dependency Risk Console',
    kicker: 'Security findings with context.',
    number: '07',
    description:
      'An attributed continuation of DepShield, combining dependency inventory, advisory evidence, contextual risk and remediation simulation.',
    categories: ['Security', 'Full-stack'],
    stack: ['TypeScript', 'OSV', 'SQLite', 'Security analysis'],
    accent: 'lavender',
    github: 'https://github.com/Mayank2142/Dependency-Risk-Console',
    featured: false,
    kind: 'Attributed project continuation',
    role: 'Project continuation. Original DepShield authored by deveshsinghal09; Git history and original attribution are preserved.',
    problem:
      'A list of dependency advisories does not explain which findings deserve attention in a particular application.',
    solution:
      'Join dependency topology, advisory sources and bounded source analysis with inspectable risk evidence.',
    architecture: [
      'Dependency inventory',
      'npm audit + OSV',
      'Contextual analysis',
      'SQLite evidence ledger',
    ],
    decisions: [
      {
        title: 'Preserve provenance',
        text: 'Keep source confidence, missing evidence and original project attribution visible.',
      },
    ],
    evidence: ['Repository documents original history and migration boundary'],
    lessons: 'Security analysis must distinguish observed evidence from heuristic inference.',
    note: 'Original project: github.com/deveshsinghal09/DepShield. Project scores are heuristics, not proof of exploitability.',
  },
];
export const categories = ['All', 'Full-stack', 'AI', 'Mobile/IoT', 'Security', 'Frontend'];
export const credentials = [
  {
    name: 'Generative AI',
    issuer: 'IBM Career Education',
    date: 'Jul 2026',
    type: 'AI',
    url: 'https://courses.ibmcep.cognitiveclass.ai/certificates/de2616b750cc47b7b62b088e9abbd9fa',
  },
  {
    name: 'AI Foundations Associate',
    issuer: 'Oracle Cloud Infrastructure 2025',
    date: 'Jul 2025 · Expires Jul 2027',
    type: 'AI',
  },
  {
    name: 'Full Stack Developer Bootcamp',
    issuer: 'GeeksforGeeks',
    date: 'Jun 2025',
    type: 'Development',
  },
  {
    name: 'Cybersecurity Fundamentals',
    issuer: 'IBM SkillsBuild',
    date: 'Learning credential',
    type: 'Security',
    url: 'https://www.credly.com/badges/93c69897-b16b-433a-8fb5-959c63a53380/public_url',
  },
  {
    name: 'Getting Started with Threat Intelligence and Hunting',
    issuer: 'IBM SkillsBuild',
    date: 'Learning credential',
    type: 'Security',
    url: 'https://www.credly.com/badges/60971b73-2318-440f-9c99-0bc91bb711a8/public_url',
  },
];
