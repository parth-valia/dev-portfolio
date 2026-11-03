/** Copy for the site; the story itself comes from content/narrative.ts. */

/** The page a mistyped or old link lands on. */
export const LOST = {
  title: 'Nothing here.',
  sub: 'This page moved or never existed. The work, the notes and the call are all one click away.',
  links: [
    { href: '/#work', label: 'See the work' },
    { href: '/blog', label: 'Read the blog' },
    { href: '/#contact', label: 'Get in touch' },
  ],
};

/** The ask that closes a post or a case study. */
export const ASK = {
  post: { title: 'Building something like this?', sub: 'A free 30-minute call. You leave with an honest read on scope, timeline and budget, even if we don’t work together.' },
  work: { title: 'Want a product like this?', sub: 'A free 30-minute call. You leave with an honest read on scope, timeline and budget, even if we don’t work together.' },
  skip: 'Skip to content',
  cta: 'Book a free call',
};

/** The phone menu button's labels. */
export const MENU = { open: 'Open menu', close: 'Close menu' };

export const ZERO_NAV = [
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Experience', href: '#experience' },
  { label: 'Blog', href: '/blog' },
];

/** The hero prompt: whatever the visitor types becomes the product the page builds. */
export const IDEA = {
  prompt: 'What are you building?',
  placeholder: 'a pet-sitting marketplace',
  examples: ['a pet-sitting marketplace', 'an AI tutor for kids', 'a clinic booking app', 'a crypto wallet'],
  submit: 'Build it',
  building: 'Building',
  napkinNote: 'v1 → ship it!',
};

/** Zero's own words for every chapter: the facts of content/narrative.ts, said in the sticky-note voice. */
export const TITLES = {
  kicker: 'Product engineer for startup founders',
  hero: ['Write the idea.', 'I’ll ship it.'],
  lede: 'Type your idea and watch it take shape below. I turn founders’ ideas into iOS and Android apps, web apps and AI products that real people use. One engineer from first sketch to launch, so nothing gets lost in hand-offs.',
  build: { title: 'One idea. Every screen it needs.', sub: 'A real product is more than an app: a website, an admin dashboard, AI features and the automations that keep it running. I build all of it on one shared foundation.' },
  work: { first: 'Shipped,', second: 'still standing.', sub: 'Live on the App Store, Google Play and the web: crypto wallets, card platforms, consumer apps and AI SaaS, still serving real users.' },
  gap: { title: 'Where founders get stuck.', sub: 'Most founders I speak with are stuck in one of these four places. Each one has a clear way out.' },
  process: { title: 'How we work together.', sub: 'A free call, a scoped plan within a week, a demo every week and support after launch. You always know what is being built and what it costs.' },
  experience: {
    title: 'Where I’ve shipped.',
    sub: 'Four years building React Native, Next.js and full-stack products for agencies, product companies and startups.',
    education: 'Education',
    resume: 'Download résumé',
  },
  activity: {
    title: 'Shipping, every week.',
    sub: 'Every square is a real day of commits across client products, experiments and open source.',
    total: 'contributions in the last 12 months',
    stats: { activeDays: 'days with commits', best: 'commits on the busiest day', currentStreak: 'day streak right now' },
    calendar: 'Contribution calendar',
    weekdays: [[1, 'Mon'], [3, 'Wed'], [5, 'Fri']] as const,
    less: 'Less',
    more: 'More',
    failed: 'GitHub didn’t answer just now. The full history is on my profile.',
    profile: 'github.com/parth-valia',
  },
  testimonials: { title: 'What founders say.', sub: 'In their own words, the way their messages arrived.' },
  notes: {
    title: 'Notes from shipping.',
    sub: 'Practical guides for founders: taking a vibe-coded MVP to production, shipping faster with AI, and getting KYC right.',
    all: 'Read all {count} posts',
    read: 'Read the post',
    index: 'Everything I’ve written about building products that hold up: React Native, fintech, AI workflows and the decisions in between.',
  },
  faq: { title: 'Questions founders ask.', sub: 'Straight answers before we ever get on a call.' },
  contact: { title: 'Tell me what you’re building.', sub: 'A few lines about your idea and who it’s for is enough. I’ll reply with an honest read on scope, timeline and budget, even if we don’t end up working together.' },
};

/** The pop-up build's closing beat; {slug} comes from the visitor's idea. */
export const SHIPPED = {
  title: 'Shipped.',
  sub: '{slug}.app is live on iPhone, Android and the web, with the AI and automations behind it. All from one idea.',
};

/** Answers to what founders search for before hiring; rendered on the page and as FAQPage structured data. */
export const FAQ = [
  {
    q: 'What does a product engineer do for a startup founder?',
    a: 'I take your product from idea to launch on my own: scoping the first version, choosing the architecture, designing the screens, building the app and backend, and shipping it to real users. You get one accountable technical partner instead of coordinating a designer, an agency and several freelancers.',
  },
  {
    q: 'Can you build both the mobile app and the website?',
    a: 'Yes. I build iOS and Android apps in React Native and websites, dashboards and web apps in Next.js, on one shared foundation. Property Search shipped to the App Store, Google Play and the web from a single codebase.',
  },
  {
    q: 'I built a prototype with Lovable, Bolt, v0 or Replit. Can you make it production-ready?',
    a: 'Yes. I keep what works in your prototype and rebuild what does not hold up with real users: the data model, authentication, payments, security and performance. The result is a product you can launch and grow, not a demo.',
  },
  {
    q: 'Do you build AI features and AI automations?',
    a: 'Yes. I build AI SaaS products where AI is the feature, such as resume parsing and job matching for eRemotehire, and I wire AI agents and automations into how a product runs, from lead capture to CRM updates and team alerts.',
  },
  {
    q: 'How does working together start?',
    a: 'With a free 30-minute call about your idea and users. Within a week you get a scoped build plan with a clear price. Once you approve it, I build in weekly iterations with a demo every week and a staging link from day one.',
  },
  {
    q: 'I am a non-technical founder. Can I work with you?',
    a: 'Yes, most founders I work with are non-technical. I become your technical counterpart from day one: I validate the scope, choose the architecture and explain every tradeoff in plain language, so you make the product decisions without needing to read code.',
  },
  {
    q: 'My developer disappeared and the build stalled. Can you take over?',
    a: 'Yes. I audit the code that exists, salvage what is usable and get the product shipping again, with a demo every week so you can see progress from the first week.',
  },
  {
    q: 'What happens after launch?',
    a: 'I stay on for monitoring, fixes and the features your first real users ask for, so the product keeps improving as your business grows.',
  },
  {
    q: 'Where are you based, and do you work with founders abroad?',
    a: 'I am based in Mumbai, India, and work remotely with founders worldwide through calls, weekly demos and a shared staging link.',
  },
];

/** Search and sharing copy for the page head. */
export const SEO = {
  title: 'Parth Valia | MVP Development for Startup Founders: Mobile Apps, Web Apps & AI SaaS',
  description: 'Product engineer for startup founders. I design, build and launch MVPs, React Native iOS and Android apps, Next.js web apps and AI SaaS, and turn vibe-coded prototypes into production products.',
  keywords: ['MVP development', 'product engineer for founders', 'React Native app developer', 'Next.js developer', 'AI SaaS development', 'AI automation', 'vibe-coded prototype to production', 'hire a technical co-founder'],
  services: ['MVP development', 'Mobile app development', 'Web app development', 'AI SaaS development', 'AI workflow automation'],
};

/** Each FOUNDER_SITUATIONS entry as the note a founder hands over: the problem, my three pen steps and what they get. */
export const SITUATION_NOTES = [
  { problem: 'No tech co-founder yet', steps: ['Scope v1 together', 'Pick the right architecture', 'Build it lean'], fix: 'a technical partner from day one' },
  { problem: 'Our dev vanished', steps: ['Audit what exists', 'Salvage what works', 'Get shipping again'], fix: 'the roadmap back on track' },
  { problem: 'It breaks with real users', steps: ['Find the fragile parts', 'Re-architect them', 'Harden for traffic'], fix: 'a product that holds up' },
  { problem: 'The demo isn’t a product', steps: ['Keep the feel', 'Rebuild data, auth, payments', 'Launch to real users'], fix: 'production-grade, not a prototype' },
];

/** Feature notes for the scoping game; weeks are a rough solo build effort, printed on each note so the choice is honest. */
export const FEATURES = {
  listings: { label: 'Listings & search', weeks: 2, about: 'Browse, filter and find the right one fast.' },
  profiles: { label: 'Profiles', weeks: 1, about: 'A photo, a bio and the details people trust.' },
  login: { label: 'Sign up & login', weeks: 1, about: 'Email, Google or Apple, and a reset that works.' },
  payments: { label: 'Payments', weeks: 1.5, about: 'Card checkout, receipts and refunds.' },
  subscriptions: { label: 'Subscriptions', weeks: 1.5, about: 'Monthly plans, free trials and upgrades.' },
  chat: { label: 'In-app chat', weeks: 2, about: 'Messages between users, with read receipts.' },
  reviews: { label: 'Ratings & reviews', weeks: 1, about: 'Stars and a few words after every job.' },
  maps: { label: 'Map & location', weeks: 1.5, about: 'What’s nearby, and how far away it is.' },
  push: { label: 'Push notifications', weeks: 1, about: 'A nudge when something needs the user.' },
  referral: { label: 'Referral program', weeks: 1, about: 'Invite a friend and both get a reward.' },
  admin: { label: 'Admin dashboard', weeks: 1.5, about: 'Your own screen to run the business.' },
  ai: { label: 'AI recommendations', weeks: 2, about: 'Suggestions shaped by what each user likes.' },
  offline: { label: 'Offline mode', weeks: 2.5, about: 'Works with no signal and syncs later.' },
  analytics: { label: 'Analytics', weeks: 0.5, about: 'Which screens get used, and where people drop.' },
  dark: { label: 'Dark mode', weeks: 0.5, about: 'A second theme for late-night use.' },
  core: { label: 'The one core flow', weeks: 2, about: 'The one thing the product exists to do.' },
  tutor: { label: 'AI tutor chat', weeks: 2.5, about: 'A patient tutor that answers in chat.' },
  voice: { label: 'Voice mode', weeks: 2, about: 'Talk to it instead of typing.' },
  progress: { label: 'Progress reports', weeks: 1, about: 'What was learned this week, in one view.' },
  parents: { label: 'Parent dashboard', weeks: 1.5, about: 'Parents follow progress and set limits.' },
  booking: { label: 'Booking calendar', weeks: 2, about: 'Pick a slot, with no double bookings.' },
  reminders: { label: 'Reminders', weeks: 0.5, about: 'A heads-up before every appointment.' },
  video: { label: 'Video consults', weeks: 2.5, about: 'Face-to-face calls inside the app.' },
  languages: { label: 'Multi-language', weeks: 1, about: 'The app in more than one language.' },
  transfers: { label: 'Send & receive', weeks: 3, about: 'Move money to anyone, fees shown up front.' },
  kyc: { label: 'KYC checks', weeks: 2, about: 'The identity checks regulators ask for.' },
  charts: { label: 'Price charts', weeks: 1, about: 'Live prices with their history.' },
};

export type FeatureId = keyof typeof FEATURES;

/** Which pile an idea gets: the first whose keywords appear in it, else the last. `core` is the note the product cannot launch without. */
export const PILES: { kind: string; keywords: string[]; core: FeatureId; notes: FeatureId[] }[] = [
  { kind: 'fintech', keywords: ['crypto', 'wallet', 'bank', 'fintech', 'invest', 'trading', 'card', 'payment'], core: 'transfers', notes: ['login', 'charts', 'transfers', 'kyc', 'push', 'referral', 'ai', 'dark'] },
  { kind: 'booking', keywords: ['booking', 'book', 'clinic', 'appointment', 'salon', 'doctor', 'gym', 'class', 'therapy'], core: 'booking', notes: ['login', 'video', 'booking', 'payments', 'reminders', 'reviews', 'admin', 'languages'] },
  { kind: 'ai', keywords: ['ai', 'gpt', 'tutor', 'assistant', 'bot', 'copilot', 'coach', 'learning'], core: 'tutor', notes: ['login', 'voice', 'tutor', 'subscriptions', 'progress', 'parents', 'offline', 'dark'] },
  { kind: 'marketplace', keywords: ['marketplace', 'market', 'sitting', 'sitter', 'rental', 'rent', 'hire', 'freelance', 'delivery', 'shop', 'store'], core: 'listings', notes: ['profiles', 'chat', 'listings', 'payments', 'reviews', 'maps', 'push', 'referral'] },
  { kind: 'default', keywords: [], core: 'core', notes: ['login', 'ai', 'core', 'payments', 'admin', 'push', 'offline', 'analytics'] },
];

/** The scoping game's words; {name} is the visitor's idea, {core} its core note, {range} the rough weeks. */
export const SCOPE = {
  title: 'What goes in v1?',
  sub: 'Every idea arrives as a pile of features. Sort the pile for {name} into v1, later or cut, and watch the time to launch. Choosing is the hard part of an MVP.',
  lanes: [
    { id: 'cut', label: 'Cut', hint: 'Not needed' },
    { id: 'later', label: 'Later', hint: 'When users ask' },
    { id: 'v1', label: 'v1', hint: 'Ships first' },
  ] as const,
  meter: 'Rough time to launch v1',
  unit: 'wk',
  /** Added to any v1: setup, testing and the store launch. */
  baseWeeks: 1.5,
  maxWeeks: 14,
  verdicts: [
    { id: 'empty', flap: 'EMPTY', upTo: 0, line: 'Nothing in v1 yet. What must it do on day one?' },
    { id: 'lean', flap: 'LEAN', upTo: 6, line: 'Lean. Real users in weeks, not months.' },
    { id: 'heavy', flap: 'HEAVY', upTo: 9.5, line: 'v1 is getting heavy. Ship sooner, learn faster.' },
    { id: 'overload', flap: 'TOO BIG', upTo: Infinity, line: 'That’s three launches in one. Let users ask for the rest.' },
  ],
  coreMissing: '{core} is the product. Without it there’s nothing to launch.',
  progress: 'Note {n} of {total}',
  upNext: 'Still in the pile',
  hint: 'Drag the note onto a column, or flick it: right for v1, down for later, left to cut.',
  howTo: 'Drag a note onto a column, swipe it, or use the buttons. Arrow keys work on the note: left cuts, down saves for later, right puts it in v1.',
  weeks: 'about {weeks} wk',
  coreTag: 'The core',
  put: 'Put {label} in {lane}',
  moved: '{label}: {lane}.',
  undo: 'Undo',
  replay: 'Sort again',
  plan: {
    title: 'Launch plan for {name}',
    v1: 'v1, in about {range} weeks',
    v1Empty: 'v1',
    later: 'Later, when users ask',
    cut: 'Cut',
    none: 'Nothing here',
    base: '+ setup, testing and launch',
    note: 'A rough game estimate from typical effort, not a quote. A real scope takes one call.',
    cta: 'Let’s scope it for real',
  },
};

/** The lock screen the founders' messages arrive on. */
export const INBOX = { time: '9:41', date: 'Messages', now: 'now' };

/** The process stations on the pad's wire, in PROCESS_STEPS order. */
export const STATIONS = ['Call', 'Plan', 'Build', 'Support'];

/** The contact note: what the visitor's message opens with, and the mail it sends. */
export const NOTE_MAIL = {
  subject: 'A note from your site: {name}',
  subjectPlain: 'A note from your site',
  placeholder: 'What are you building, and who is it for?',
  send: 'Send the note',
  alt: 'or write to',
  opened: 'Your email app should be opening with the note in it. Nothing opened?',
  copy: 'Copy my email',
  copied: 'Copied',
};

/** Handwritten bits on the idea pad. */
export const PAD = { note: 'v1, ship it!', hint: 'Type below. It writes itself here.' };

/** Words inside the pop-up product mocks; {name} and {slug} come from the visitor's idea. */
export const MOCK = {
  sketch: { phone: 'app', web: 'website', ai: 'AI', crm: 'CRM', alert: 'alert' },
  phone: {
    time: '9:41',
    greeting: 'Welcome back',
    search: 'Search',
    card: ['Launch week', 'Your first 100 users', 'See plan'],
    section: 'Activity',
    rows: [['New request', '2 min'], ['Payment received', '14 min'], ['Review posted', '1 h']],
    tabs: ['Home', 'Search', 'Inbox', 'You'],
  },
  web: {
    links: ['Product', 'Pricing', 'Log in'],
    cta: 'Get started',
    sub: 'Now on iPhone, Android and the web.',
    chart: 'Sign-ups this week',
    days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    live: 'Live',
  },
  ai: {
    title: '{name} AI',
    ask: 'Find me the best option for Friday',
    reply: 'Three fit your budget and are free on Friday.',
    chips: ['Book the first', 'Compare', 'More'],
    input: 'Ask anything',
  },
  crm: ['Your CRM', 'Lead saved'],
  alert: ['Team alert', 'Sent to the team'],
};
