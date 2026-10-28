// src/data/portfolioData.ts
// ---------------------------------------------------------------------------
// Single source of truth for the UI.
//
// Every project here is a real public repository. Descriptions were written
// from the actual source (README, requirements, main modules), not invented.
// If a claim isn't backed by code in the repo, it isn't in this file.
// ---------------------------------------------------------------------------

/* ----------------------------------- Types --------------------------------- */

export type ViewerProfileId = "recruiter" | "engineer" | "curious";

export interface ViewerProfile {
  id: ViewerProfileId;
  name: string;
  /** What this lens is for, shown under the avatar */
  description: string;
  avatar?: string;
  /** Border/underline colour for the profile tile */
  accent: string;
  /** Rails hidden for this viewer */
  hiddenRailIds?: string[];
  /** Ordered card order override; items not listed keep their rail order */
  pinFirst?: string[];
}

export interface Education {
  degree: string;
  college: string;
  location: string;
  batch: string;
  status: string;
  cgpa: string;
  recentSgpa: string;
  coursework: string[];
}

export interface PersonalInfo {
  brandName: string;
  name: string;
  /** The name he actually goes by day to day */
  shortName: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  phone: string;
  email: string;
  resumeUrl: string;
  github: string;
  /** Earlier account, still where most of the work lives */
  githubAlt: string;
  linkedin: string;
  education: Education;
  currentlyExploring: string[];
  skillGroups: { label: string; items: string[] }[];
}

export interface MediaItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  matchScore: string;
  year: string;
  durationOrMetric: string;
  thumbnailUrl: string;
  techStack: string[];
  architectureBullets: string[];
  /** Honest one-line status, e.g. "v0.1 — backend complete, UI in progress" */
  status?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface CategoryRail {
  id: string;
  title: string;
  items: MediaItem[];
}

/* ------------------------------- Personal info ----------------------------- */

export const PERSONAL_INFO: PersonalInfo = {
  brandName: "MOJIZ",
  name: "Mohammad Mojiz Abbas",
  shortName: "Mojiz",
  title: "B.Tech CSD Student · Python & Full-Stack Developer",
  tagline: "Third-year CS student who ships — React Native, FastAPI backends, and local AI that runs offline.",
  bio: "B.Tech Computer Science & Design student in Ghaziabad, currently in my third year. I build with Python first and reach for FastAPI, React or whatever the problem actually needs. My major project is SkillSwap AI — a React Native and FastAPI platform where people trade skills instead of buying courses. When I'm not on that, I'm usually deep in MindVault, my offline AI knowledge base, or building in public while preparing for a Master's in Germany.",
  location: "Ghaziabad, Uttar Pradesh, India",
  phone: "+91-8178546915",
  email: "mojiz.atoffice@gmail.com",
  resumeUrl: "/resume.html",
  github: "https://github.com/Ayanabbas2006",
  githubAlt: "https://github.com/mojizatoffice-sys",
  linkedin: "https://www.linkedin.com/in/syed-mahommad-mojiz-abbas-40582726a",
  education: {
    degree: "B.Tech in Computer Science & Design",
    college: "IMS Engineering College (IMSEC)",
    location: "Ghaziabad, Uttar Pradesh",
    batch: "2024 – 2028",
    status: "3rd year · Expected graduation 2027",
    cgpa: "7.0 / 10",
    recentSgpa: "7.2",
    coursework: [
      "Data Structures",
      "Programming",
      "Digital Electronics",
      "Soft Skills",
      "AI Automations",
    ],
  },
  currentlyExploring: [
    "Android Studio",
    "React Native",
    "Local LLM tooling",
    "More web projects",
  ],
  skillGroups: [
    { label: "Programming", items: ["Python", "C (basics)", "Java (basics)", "Kotlin"] },
    { label: "Web", items: ["React.js", "HTML", "CSS", "JavaScript", "FastAPI", "Jinja2"] },
    { label: "Mobile / Embedded", items: ["React Native (Expo)", "Flutter", "Arduino (C++)"] },
    { label: "Databases", items: ["MySQL", "MongoDB", "PostgreSQL", "Supabase", "SQLite", "ChromaDB"] },
    { label: "Auth & Cloud", items: ["Firebase Auth", "Firebase Cloud Messaging", "Cloudinary", "JWT"] },
    { label: "AI & Tools", items: ["Ollama", "Piper TTS", "Linux", "Git", "GitHub", "Cloudinary"] },
    { label: "MS Office", items: ["Excel (VLOOKUP, Pivot Tables, Charts)", "Word", "PowerPoint"] },
  ],
};

/* ----------------------------- Viewer profiles ----------------------------- */

// The three profiles are genuine lenses over the same data — not decoration.
// Recruiter trims the small stuff; Engineer gets the implementation detail;
// Curious sees the whole timeline including the Tkinter learning projects.
export const VIEWER_PROFILES: ViewerProfile[] = [
  {
    id: "recruiter",
    name: "Recruiter",
    description: "Shortlist view — skills, education, three projects.",
    accent: "#E50914",
    hiddenRailIds: ["first-builds", "learning-in-public"],
  },
  {
    id: "engineer",
    name: "Engineer",
    description: "Read the code: architecture, trade-offs, what broke.",
    accent: "#B20710",
    pinFirst: ["skillswap-ai", "mindvault", "home-town-hub", "blaze"],
  },
  {
    id: "curious",
    name: "Curious",
    description: "Everything, in the order I actually built it.",
    accent: "#F6121D",
  },
];

/* -------------------------------- Projects -------------------------------- */

const SKILLSWAP: MediaItem = {
  id: "skillswap-ai",
  title: "SkillSwap AI",
  tagline: "Learn a skill by teaching the one you already have.",
  description:
    "Our B.Tech major project: a mobile platform where every user is both a learner and a teacher. You list skills you can teach and skills you want to learn, and the app matches you with people whose lists are the mirror of yours — I teach you Python, you teach me UI/UX. Built as a React Native app on a FastAPI bridge that verifies Firebase JWTs and syncs the verified uid straight into Supabase Postgres. The backend models the exchange properly: a user_skills junction table with a composite unique constraint on (user, skill, intent) so one person can be both TEACH and LEARN for different skills without duplicate rows.",
  badge: "Major Project",
  matchScore: "99% Match",
  year: "2026",
  durationOrMetric: "React Native · FastAPI · Team of 4",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
  techStack: [
    "React Native",
    "TypeScript",
    "Expo",
    "FastAPI",
    "SQLAlchemy",
    "Supabase",
    "PostgreSQL",
    "Firebase Auth",
    "Firebase Cloud Messaging",
  ],
  architectureBullets: [
    "Client authenticates natively with Firebase Auth; the React Native app forwards the ID token to FastAPI.",
    "FastAPI verifies the token with the Firebase Admin SDK and rejects expired or invalid ones with a 401 before any route logic runs.",
    "The verified Firebase uid becomes the primary key in Supabase Postgres, so auth and relational data stay in sync without a second account system.",
    "user_skills uses a composite unique constraint on (user, skill, intent) — the same person can offer and want the same skill without duplicate rows.",
    "Five-table schema: users, skills, user_skills, learning_paths (JSONB roadmaps) and match_request with PENDING/ACCEPTED/REJECTED states.",
    "Built with a 4-person team (Project Group No. 2) under faculty supervision — I own the backend API layer.",
    "Honest status: auth, user sync, skills and user-skill endpoints are working. AI matching and roadmap generation are next.",
  ],
  status: "Backend API live · AI matching in progress · repo private",
  githubUrl: "https://github.com/mojizatoffice-sys/Skill-Swap-AI",
};

const MINDVAULT: MediaItem = {
  id: "mindvault",
  title: "MindVault",
  tagline: "Chat with your own PDFs. Nothing leaves your machine.",
  description:
    "An offline personal knowledge base. You drop in PDFs, notes or markdown, and chat with them using a local Llama 3.2 model through Ollama. No API keys, no cloud calls, no documents uploaded anywhere — which is the entire point. Upload goes to /upload, which extracts text, splits it into 800-character chunks with 150 of overlap, embeds each chunk with nomic-embed-text and stores it in a persistent ChromaDB collection using cosine distance. /chat embeds the question, pulls the four nearest chunks and answers strictly from that context, returning the source filenames alongside the answer.",
  badge: "In Progress",
  matchScore: "97% Match",
  year: "2026",
  durationOrMetric: "Python · FastAPI · RAG",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80",
  techStack: [
    "Python",
    "FastAPI",
    "Ollama",
    "Llama 3.2",
    "ChromaDB",
    "nomic-embed-text",
    "pypdf",
    "LangChain Text Splitters",
    "Pydantic",
  ],
  architectureBullets: [
    "Backend is done: /upload and /chat endpoints, file-type allowlist (.pdf/.txt/.md), and a /health check.",
    "Text is split with RecursiveCharacterTextSplitter at 800/150 so a chunk rarely cuts a sentence in half.",
    "Retrieval queries ChromaDB for the 4 closest chunks by cosine distance, then builds a context block with [Source: file] tags per chunk.",
    "The system prompt forbids outside knowledge — if the answer isn't in the context it has to say so, and it always lists which files it used.",
    "Embeddings and generation both run through Ollama locally, so the whole loop works with the network unplugged.",
    "Honest status: v0.1, backend only. The Next.js chat UI and citation view are still on the list.",
  ],
  status: "v0.1 — backend working, frontend not started",
  githubUrl: "https://github.com/mojizatoffice-sys/mindvault",
};

const BLAZE: MediaItem = {
  id: "blaze",
  title: "Blaze",
  tagline: "An offline voice assistant that can also switch your lights on.",
  description:
    "A fully offline voice-enabled AI agent. Python for the logic, Ollama running Llama 3.2 for the language model, FastAPI for the service layer, and Piper TTS for the voice. It handles natural conversation with persistent memory and command routing, streams responses as they generate, and talks to an Arduino over FastAPI to drive an RGB light. The interesting part wasn't the model — it was keeping the whole pipeline local while still feeling responsive.",
  badge: "Offline AI",
  matchScore: "95% Match",
  year: "2025",
  durationOrMetric: "Python · FastAPI · Arduino",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1600&q=80",
  techStack: ["Python", "Ollama", "Llama 3.2", "FastAPI", "Piper TTS", "Arduino (C++)"],
  architectureBullets: [
    "Modular command layer: conversation, memory and device control are separate handlers rather than one giant if-else.",
    "Persistent memory keeps context across restarts so it doesn't treat every session as the first one.",
    "Responses stream token by token, then Piper synthesises speech — long answers start talking before they finish generating.",
    "RGB light control is a small FastAPI endpoint the Arduino polls, so hardware can be swapped without touching the assistant.",
    "Everything runs locally: no cloud LLM, no cloud speech. Repo is private at the moment.",
  ],
  status: "Working prototype · repository private",
};

const HOMETOWN_HUB: MediaItem = {
  id: "home-town-hub",
  title: "Hometown Hub",
  tagline: "A community platform for people who grew up in the same place.",
  description:
    "Right now most local communities live in scattered WhatsApp groups where nothing is searchable and nobody new can find them. Hometown Hub is an attempt at a real platform for that: sign up with your hometown, verify by email OTP, and connect with people from your own area. FastAPI with Jinja2 templates, SQLAlchemy over PostgreSQL, bcrypt password hashing, email OTP through SendGrid, and Cloudinary for profile photos.",
  badge: "Full-Stack",
  matchScore: "93% Match",
  year: "2026",
  durationOrMetric: "FastAPI · PostgreSQL",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80",
  techStack: [
    "Python",
    "FastAPI",
    "SQLAlchemy",
    "PostgreSQL",
    "Jinja2",
    "bcrypt",
    "SendGrid",
    "Cloudinary",
    "JWT",
  ],
  architectureBullets: [
    "Split into routers by concern — user, mail, upload — so the registration flow doesn't leak into the upload code.",
    "Passwords hashed with bcrypt before they ever hit the database; duplicate emails rejected at the query, not after insert.",
    "6-digit OTP generated per registration and mailed via SendGrid, so a signup isn't trusted until the inbox confirms it.",
    "Photos go to Cloudinary and only the URL is stored, keeping the database small.",
    "Pydantic schemas (UserCreate / UserOut) mean the hashed password can never accidentally leak in a response.",
    "Honest status: auth and registration are solid; the feed and community features are the next chunk.",
  ],
  status: "Auth + registration complete · feed in progress",
  githubUrl: "https://github.com/Ayanabbas2006/home-town-hub",
};

const CHATTERS_SPOT: MediaItem = {
  id: "chatters-spot",
  title: "Chatter's Spot",
  tagline: "A small social app with a proper login wall.",
  description:
    "A FastAPI app where people register, log in and post. The part I actually care about is the auth: sessions are cookie-based and enforced by middleware, so any route that isn't explicitly public bounces you to /login before your handler ever runs. Passwords are hashed with Argon2 rather than stored or even base64'd, and user records live in MySQL.",
  badge: "Web App",
  matchScore: "88% Match",
  year: "2026",
  durationOrMetric: "FastAPI · MySQL",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80",
  techStack: ["Python", "FastAPI", "Jinja2", "MySQL", "Argon2", "HTML", "CSS"],
  architectureBullets: [
    "Middleware-based auth with an explicit public-route allowlist — new routes are protected by default, which is the safe way round.",
    "Argon2 (PasswordHasher) for password storage instead of a raw hash.",
    "Jinja2 templates for home, login and register keep the front end server-rendered and fast to iterate.",
    "Honest note: the DB connection settings are hardcoded in database.py — moving them to environment variables is the first cleanup on my list.",
  ],
  status: "Live locally · needs config cleanup",
  githubUrl: "https://github.com/Ayanabbas2006/Chatter-s-Spot",
};

const NORTHPEAK: MediaItem = {
  id: "northpeak",
  title: "NorthPeak Digital",
  tagline: "A one-page agency site in plain HTML, CSS and JS.",
  description:
    "A fully responsive one-pager built without a framework — semantic HTML5, CSS custom properties, Grid and Flexbox, and vanilla ES6 for the mobile nav and form validation. Six service cards, testimonials, three pricing tiers and a contact form that validates empty fields, email format and minimum message length before it lets you submit. Tuned deliberately for 360px, 768px and 1440px.",
  badge: "Frontend",
  matchScore: "90% Match",
  year: "2026",
  durationOrMetric: "HTML · CSS · JS",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1600&q=80",
  techStack: ["HTML5", "CSS3", "JavaScript (ES6+)", "Vercel"],
  architectureBullets: [
    "No build step and no dependencies — one HTML file, one stylesheet, one script. Loads instantly.",
    "CSS custom properties hold the palette and spacing scale so a theme change is a handful of variables.",
    "Form validation is client-side and specific: empty check, email regex, minimum message length, with inline error text rather than an alert().",
    "Mobile nav closes itself on link tap, which is the detail most hand-rolled menus miss.",
    "Deployed on Vercel.",
  ],
  githubUrl: "https://github.com/Ayanabbas2006/northpeak-digital",
  liveUrl: "https://northpeak-digital-nu.vercel.app/",
};

const CALCULATOR: MediaItem = {
  id: "calculator-tkinter",
  title: "Calculator",
  tagline: "A Tkinter calculator built to be short, not clever.",
  description:
    "An aesthetic desktop calculator in Python Tkinter. The goal was to keep the code minimal — no class hierarchy for a grid of buttons, just the least code that still handles the full operation chain correctly.",
  badge: "Desktop",
  matchScore: "85% Match",
  year: "2025",
  durationOrMetric: "Python · Tkinter",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=1600&q=80",
  techStack: ["Python", "Tkinter"],
  architectureBullets: [
    "Single-file Tkinter app — grid layout, button callbacks, minimal state.",
    "Deliberately avoids over-engineering: the point was learning the toolkit, not building a framework.",
  ],
  githubUrl: "https://github.com/Ayanabbas2006/Calculator-Tkinter",
};

const SEGMENT_CLOCK: MediaItem = {
  id: "seven-segment-clock",
  title: "7-Segment Clock",
  tagline: "A Tkinter clock that draws digits the way a real display does.",
  description:
    "A clock UI in Python Tkinter where each digit is drawn as seven segments rather than rendered as text. Built to understand how display multiplexing actually works. Still being developed.",
  badge: "Desktop",
  matchScore: "82% Match",
  year: "2026",
  durationOrMetric: "Python · Tkinter",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?auto=format&fit=crop&w=1600&q=80",
  techStack: ["Python", "Tkinter"],
  architectureBullets: [
    "Each digit is seven individually toggled segments, so the render loop mirrors real hardware.",
    "Time is read once per tick and pushed to the display, keeping the drawing code stateless.",
    "Still in development — the next step is a proper tick scheduler instead of a fixed sleep.",
  ],
  status: "In development",
  githubUrl: "https://github.com/Ayanabbas2006/7-segemet-display-clock",
};

const JAVA_PRACTICE: MediaItem = {
  id: "java-practice",
  title: "Java Practice",
  tagline: "Where the OOP concepts got hammered in.",
  description:
    "A running collection of Java programs — classes, inheritance, collections, exceptions — written while learning the language properly alongside coursework. Not a product; it's the paper trail.",
  badge: "Practice",
  matchScore: "78% Match",
  year: "2026",
  durationOrMetric: "Java · Ongoing",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1600&q=80",
  techStack: ["Java", "OOP"],
  architectureBullets: [
    "Program-per-concept structure so each file stays readable on its own.",
    "Covers OOP fundamentals, collections and problem-solving exercises from coursework.",
  ],
  githubUrl: "https://github.com/Ayanabbas2006/Java",
};

const THIS_SITE: MediaItem = {
  id: "this-portfolio",
  title: "This Portfolio",
  tagline: "The site you're on — a catalogue UI in React and TypeScript.",
  description:
    "A Netflix-style portfolio where projects are titles and categories are rails. Pick a profile and the same data is presented differently: a recruiter sees a shortlist, an engineer sees the implementation notes, the curious see everything. Fully typed React 19 with Tailwind, no UI component library.",
  badge: "Meta",
  matchScore: "91% Match",
  year: "2026",
  durationOrMetric: "React · TypeScript",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
  techStack: ["React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
  architectureBullets: [
    "All content lives in one typed module, so adding a project never means touching a component.",
    "Viewer profiles filter and reorder rails declaratively instead of branching inside components.",
    "No component library beyond icons and motion — every card, rail and modal is hand-built.",
  ],
  githubUrl: "https://github.com/mojizatoffice-sys/portfolio",
};

/* --------------------------------- Rails ---------------------------------- */

export const PORTFOLIO_RAILS: CategoryRail[] = [
  {
    id: "trending-projects",
    title: "Trending Now — What I'm Building",
    items: [SKILLSWAP, MINDVAULT, BLAZE, HOMETOWN_HUB, CHATTERS_SPOT, NORTHPEAK],
  },
  {
    id: "backend-and-ai",
    title: "Because You Work In Python",
    items: [SKILLSWAP, MINDVAULT, BLAZE, HOMETOWN_HUB, CHATTERS_SPOT],
  },
  {
    id: "frontend",
    title: "Frontend & Interface Work",
    items: [SKILLSWAP, NORTHPEAK, THIS_SITE, HOMETOWN_HUB, CHATTERS_SPOT],
  },
  {
    id: "first-builds",
    title: "First Builds — Where I Started",
    items: [CALCULATOR, SEGMENT_CLOCK, CHATTERS_SPOT],
  },
  {
    id: "learning-in-public",
    title: "Learning In Public",
    items: [JAVA_PRACTICE, SEGMENT_CLOCK, THIS_SITE],
  },
];

/* ---------------------------- Derived helpers ----------------------------- */

export const HERO_FEATURED: MediaItem = SKILLSWAP;

export const ALL_ITEMS: MediaItem[] = Array.from(
  new Map(PORTFOLIO_RAILS.flatMap((rail) => rail.items).map((item) => [item.id, item])).values()
);

/** Rails visible to a viewer, with that viewer's pinned items moved to the front. */
export const getRailsForProfile = (profile: ViewerProfile | null): CategoryRail[] => {
  const visible = profile?.hiddenRailIds?.length
    ? PORTFOLIO_RAILS.filter((rail) => !profile.hiddenRailIds!.includes(rail.id))
    : PORTFOLIO_RAILS;

  if (!profile?.pinFirst?.length) return visible;

  const rank = (id: string) => {
    const i = profile.pinFirst!.indexOf(id);
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };

  return visible.map((rail) => ({
    ...rail,
    items: [...rail.items].sort((a, b) => rank(a.id) - rank(b.id)),
  }));
};

export const NAV_RAILS: { id: string; label: string }[] = [
  { id: "trending-projects", label: "Projects" },
  { id: "backend-and-ai", label: "Backend & AI" },
  { id: "frontend", label: "Frontend" },
];

export const PROFILE_STORAGE_KEY = "mojiz-portfolio:viewer";
