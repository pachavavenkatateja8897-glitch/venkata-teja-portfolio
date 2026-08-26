/* ------------------------------------------------------------------ */
/*  Single source of truth for all site content + media.               */
/*  Swap placeholder media / URLs here WITHOUT touching components.    */
/*  Every media field marked REPLACE_WITH_* accepts a path or URL.     */
/* ------------------------------------------------------------------ */

export interface ResultStat {
  value: string;
  label: string;
  note?: string;
}

export interface Project {
  num: string;
  title: string;
  category: string;
  /** tools / role line shown directly under the title */
  role: string;
  tags: string[];
  description: string;
  results: ResultStat[];
  responsibilities?: string[];
  languages?: string;
  scopeNote?: string;
  aspect: string;
  /** REPLACE_WITH_PROJECT_0X_THUMBNAIL — path/URL to a poster frame, e.g. "/media/p01-poster.jpg" */
  thumbnail: string | null;
  /** REPLACE_WITH_PROJECT_0X_VIDEO — path/URL to a clip (mp4/webm). Renders an inline player + hover preview. */
  video: string | null;
}

export const profile = {
  firstName: "PACHAVA",
  lastName: "VENKATA TEJA",
  fullName: "Pachava Venkata Teja",
  /* primary hierarchy — the two disciplines get the visual weight */
  primaryPositioning: ["VIDEO EDITOR", "AI CREATIVE"],
  supportingPositioning: "Colorist · Motion Designer · AI-assisted Visual Development",
  proofLine: ["Short-form content", "AI creative production", "Motion", "Color"],
  statement: "Visual storytelling through editing, motion, color, and AI.",
  summary:
    "I shape cinematic sequences, social-first cuts, and generative visuals — from first assembly to final delivery.",
  location: "Hyderabad, India",
  email: "pachavavenkatateja8897@gmail.com",
  linkedinLabel: "linkedin.com/in/venkata-teja-pachava",
  linkedinUrl: "https://www.linkedin.com/in/venkata-teja-pachava",
  /* REPLACE_WITH_RESUME — hosted PDF / Drive link */
  resumeUrl: null as string | null,
  /* REPLACE_WITH_SHOWREEL — mp4/webm URL or /media/showreel.mp4 */
  showreelUrl: "/media/showreel.mp4",
  /* REPLACE_WITH_SHOWREEL_POSTER — poster frame for the player */
  showreelPoster: null as string | null,
};

export const marqueeRoles = [
  "AI Creative Artist",
  "Video Editor",
  "Colorist",
  "Motion Designer",
  "AI-Assisted Cinematic Production",
  "Short-form Content",
  "Visual Development",
];

export const projects: Project[] = [
  {
    num: "01",
    title: "Realtalkwithsunny — Short-form Content",
    category: "Short-form Video Editing",
    role: "Video Editing / Motion / Color",
    tags: ["Short-form Content", "Video Editing", "Five Instagram reels"],
    description:
      "Created short-form motivational content and edited social-first videos for Realtalkwithsunny.",
    results: [
      {
        value: "≈1.43M",
        label: "combined Instagram views across five reels",
        note: "client-reported",
      },
      {
        value: "≈723K",
        label: "views on the strongest individual reel",
        note: "client-reported",
      },
    ],
    aspect: "aspect-[16/10]",
    /* REPLACE_WITH_PROJECT_01_THUMBNAIL */
    thumbnail: null,
    /* REPLACE_WITH_PROJECT_01_VIDEO */
    video: null,
  },
  {
    num: "02",
    title: "Realtalkwithsunny — 91-Reel Content Programme",
    category: "Content Production",
    role: "Large-scale short-form programme — 91 reels",
    tags: ["Content Production", "91 reels"],
    description:
      "Worked on a large-scale motivational-content programme involving 91 reels.",
    results: [
      {
        value: "91",
        label: "reels in the programme",
      },
      {
        value: "≈1.96M",
        label: "projected Instagram views",
        note: "client-reported projection — not guaranteed",
      },
    ],
    aspect: "aspect-[16/10]",
    /* REPLACE_WITH_PROJECT_02_THUMBNAIL */
    thumbnail: null,
    /* REPLACE_WITH_PROJECT_02_VIDEO */
    video: null,
  },
  {
    num: "03",
    title: "MS Institute of Diagnostics",
    category: "Recruitment / Training / Learner Content",
    role: "Recruitment, lab-training & learner-review edits",
    tags: ["Recruitment", "Training", "Learner content"],
    description:
      "Delivered recruitment, laboratory training, and learner-review videos.",
    results: [
      {
        value: "35",
        label: "videos delivered",
      },
      {
        value: "≈100K",
        label: "reported views",
        note: "project-reported",
      },
    ],
    aspect: "aspect-[16/10]",
    /* REPLACE_WITH_PROJECT_03_THUMBNAIL */
    thumbnail: null,
    /* REPLACE_WITH_PROJECT_03_VIDEO */
    video: null,
  },
  {
    num: "04",
    title: "Sree Vaishnavi Diagnostic Centre",
    category: "Testimonial / Review Content",
    role: "Testimonial & review video content",
    tags: ["Testimonial", "Review content"],
    description: "Created testimonial and review video content.",
    results: [
      {
        value: "18",
        label: "videos delivered",
      },
      {
        value: "≈30K",
        label: "reported views",
        note: "project-reported",
      },
    ],
    aspect: "aspect-[16/10]",
    /* REPLACE_WITH_PROJECT_04_THUMBNAIL */
    thumbnail: null,
    /* REPLACE_WITH_PROJECT_04_VIDEO */
    video: null,
  },
  {
    num: "05",
    title: "Multilingual Cinematic Production",
    category: "AI Creative / Cinematic Production",
    role: "AI visual development through editorial finishing",
    tags: ["AI Creative", "Cinematic Production", "Multilingual"],
    description:
      "Contributed to a multilingual production intended for English, Hindi, and Telugu releases.",
    results: [],
    languages: "EN · HI · TE",
    responsibilities: [
      "AI visual development",
      "Prompt-led image and video generation",
      "Character continuity",
      "Environment continuity",
      "Cinematic sequence iteration",
      "Editorial support",
      "Color work",
      "Visual refinement",
      "Production-ready creative handoffs",
    ],
    scopeNote:
      "Generative development through editorial finishing — built for continuity across languages and releases.",
    aspect: "aspect-[21/10]",
    /* REPLACE_WITH_PROJECT_05_THUMBNAIL */
    thumbnail: null,
    /* REPLACE_WITH_PROJECT_05_VIDEO */
    video: null,
  },
];

/* ------------------------------------------------------------------ */
/*  AI creative grid — visual proof tiles, media-first.                */
/* ------------------------------------------------------------------ */
export interface AiTile {
  index: string;
  title: string;
  kind: "image" | "video";
  note: string;
  aspect: string;
  /** REPLACE_WITH_AI_*_MEDIA — real generated frame / clip goes here */
  media: string | null;
}

export const aiCreativeTiles: AiTile[] = [
  {
    index: "AI-01",
    title: "Character Development",
    kind: "image",
    note: "Prompt-led character sheets with identity held across takes.",
    aspect: "aspect-[4/5]",
    /* REPLACE_WITH_AI_CHARACTER_MEDIA */
    media: null,
  },
  {
    index: "AI-02",
    title: "Environment Development",
    kind: "image",
    note: "Worlds and sets developed for sequence-ready continuity.",
    aspect: "aspect-[16/10]",
    /* REPLACE_WITH_AI_ENVIRONMENT_MEDIA */
    media: null,
  },
  {
    index: "AI-03",
    title: "AI Image Generation",
    kind: "image",
    note: "Generative stills — concept frame through final render.",
    aspect: "aspect-square",
    /* REPLACE_WITH_AI_IMAGE_GEN_MEDIA */
    media: null,
  },
  {
    index: "AI-04",
    title: "AI Video Generation",
    kind: "video",
    note: "Generated motion — iterated for pacing and coherence.",
    aspect: "aspect-video",
    /* REPLACE_WITH_AI_VIDEO_GEN_MEDIA */
    media: null,
  },
  {
    index: "AI-05",
    title: "Cinematic Sequence Development",
    kind: "video",
    note: "Shot-by-shot sequence iteration toward picture lock.",
    aspect: "aspect-[21/9]",
    /* REPLACE_WITH_AI_SEQUENCE_MEDIA */
    media: null,
  },
  {
    index: "AI-06",
    title: "Visual Consistency / Continuity",
    kind: "image",
    note: "Character and environment continuity across shots and releases.",
    aspect: "aspect-[4/5]",
    /* REPLACE_WITH_AI_CONTINUITY_MEDIA */
    media: null,
  },
];

/* ------------------------------------------------------------------ */
/*  About — concise, ~35% shorter than the CV summary.                 */
/* ------------------------------------------------------------------ */
export const aboutLead =
  "I am a Video Editor and AI Creative Artist working across AI-assisted cinematic production, short-form performance content, and motion-led visual storytelling.";

export const aboutCombines = [
  "Editorial pacing",
  "Color work",
  "Generative AI workflows",
  "Motion design",
  "Client-facing delivery",
];

export const aboutClose =
  "Every delivery moves through structured revision and creative QA — work that reads cinematic, performs socially, and ships on time.";

/* ------------------------------------------------------------------ */
/*  Capabilities — four compact groups. No percentage bars.            */
/* ------------------------------------------------------------------ */
export interface CapabilityGroup {
  index: string;
  title: string;
  items: string[];
}

export const capabilities: CapabilityGroup[] = [
  {
    index: "C1",
    title: "Editing",
    items: ["Premiere Pro", "After Effects", "Audition", "Cinematic pacing", "Short-form editing"],
  },
  {
    index: "C2",
    title: "Motion",
    items: ["Motion graphics", "VFX", "Logo animation"],
  },
  {
    index: "C3",
    title: "Color",
    items: ["Color grading", "Cinematic finishing"],
  },
  {
    index: "C4",
    title: "AI",
    items: ["ComfyUI", "Higgsfield", "Adobe Firefly", "Midjourney", "Generative image/video workflows"],
  },
];

/* ------------------------------------------------------------------ */
/*  Experience — highlighted metrics first, the rest as supporting.    */
/* ------------------------------------------------------------------ */
export interface LedgerStat {
  value: string;
  label: string;
  /** true → rendered as a large, emphasized metric */
  highlight?: boolean;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  location: string;
  dates: string;
  type: string;
  intro?: string;
  description?: string;
  ledgerTitle?: string;
  ledger?: LedgerStat[];
  responsibilitiesTitle?: string;
  responsibilities?: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "01",
    company: "Impromp2Labs",
    role: "Freelance AI Creative Artist | Video Editor | Colorist",
    location: "Hyderabad, India / Hybrid",
    dates: "Nov 2025 — Present",
    type: "Freelance / Contract",
    intro:
      "Freelance, contract delivery across client accounts — video editing, color, motion design, and AI-creative work, including cinematic creative-production projects.",
    ledgerTitle: "Reported delivery ledger",
    ledger: [
      {
        value: "≈2.78M",
        label: "reported cross-platform views — content led by Teja across Impromp2Labs client video work",
        highlight: true,
      },
      {
        value: "≈1.43M",
        label: "client-reported combined views — five Instagram reels for Realtalkwithsunny",
        highlight: true,
      },
      {
        value: "≈723K",
        label: "client-reported views — strongest individual reel",
        highlight: true,
      },
      {
        value: "≈129K",
        label: "reported views — 86 YouTube uploads",
        highlight: true,
      },
      {
        value: "≈1.96M",
        label: "projected client-reported Instagram views — 91-reel programme (projection, not guaranteed)",
      },
      {
        value: "≈546K",
        label: "reported views — 91 Facebook uploads",
      },
      {
        value: "≈100K",
        label: "reported views — 35 recruitment, lab-training & learner-review videos, MS Institute of Diagnostics",
      },
      {
        value: "≈30K",
        label: "reported views — 18 testimonial & review videos, Sree Vaishnavi Diagnostic Centre",
      },
      {
        value: "≈15K",
        label: "reported views — course/training video edits, Tech Job Solutions",
      },
    ],
    responsibilitiesTitle: "Selected responsibilities",
    responsibilities: [
      "Video editing, color, motion-design, and AI-creative delivery across client accounts and cinematic creative-production work.",
      "Short-form content for Realtalkwithsunny — five Instagram reels with ≈1.43M client-reported combined views; strongest reel ≈723K.",
      "91-reel motivational-content programme — projected at ≈1.96M client-reported Instagram views.",
      "Cross-platform content delivery for YouTube and Facebook.",
      "Multilingual production support for English, Hindi, and Telugu releases.",
      "Prompt-led image and video generation, cinematic sequence iteration, character and environment continuity, visual refinement, editorial finishing, color work, and production-ready creative handoffs.",
    ],
  },
  {
    id: "02",
    company: "Tech Job Solutions",
    role: "Video Editing Intern",
    location: "Hyderabad, India",
    dates: "Aug 2025",
    type: "Internship",
    description:
      "Edited course and training content during an internship; completed videos generated approximately 15K reported views.",
    ledger: [
      {
        value: "≈15K",
        label: "reported views — completed course & training videos",
      },
    ],
  },
];

export const recognition = {
  title: "Editor's Choice Award",
  org: "MAAC MCL Competition",
  detail: "Recognized for an Ichigo social-media ad poster.",
  /** REPLACE_WITH_AWARD_POSTER — image of the Ichigo ad poster / award */
  poster: null as string | null,
};

export const education = [
  {
    years: "2024 — 2026",
    degree: "Multimedia & VFX",
    school: "MAAC — Maya Academy of Advanced Creativity",
  },
  {
    years: "2021 — 2024",
    degree: "Bachelor of Engineering — CSE/IT",
    school: "Vignan's Institute of Technology & Science",
  },
  {
    years: "2018 — 2021",
    degree: "Diploma — Electrical Engineering",
    school: "Sri Sangameshwara Government Polytechnic",
  },
];

export const processSteps = [
  { step: "Discover", desc: "Brief, references, goals." },
  { step: "Plan", desc: "Structure & edit map." },
  { step: "Create", desc: "Assets & generative builds." },
  { step: "Edit", desc: "Assembly, pacing, narrative." },
  { step: "Refine", desc: "Color, motion, sound, QA." },
  { step: "Deliver", desc: "Versions & clean handoff." },
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "capabilities", label: "Capabilities" },
  { id: "contact", label: "Contact" },
];
