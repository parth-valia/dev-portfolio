/**
 * The story the site tells: the founder is the hero,
 * Parth is the guide who gets their idea shipped. Facts come from case-studies, experience and blog.
 */

export const POSITIONING = {
  role: 'Product engineer',
  headline: 'Ideas deserve to ship.',
  lede: 'You bring the idea. I design it, build it and put it in front of real users: mobile apps, websites, AI SaaS and the AI workflows that run them. One engineer, first sketch to launch.',
  short: 'Product engineer for founders: mobile apps, websites, AI SaaS and AI-native workflows.',
  location: 'Mumbai, India · working worldwide',
  availability: 'Taking on new builds',
};

/** What Parth builds; each surface is backed by shipped products (case-study slugs). */
export const SURFACES = [
  {
    id: 'mobile',
    name: 'Mobile apps',
    body: 'iOS and Android apps in React Native that stay fast on cheap phones and patchy networks, shipped to both stores.',
    proof: ['dok-wallet', 'grabit', 'hariprabodham-vrund', 'krisiyukta'],
    stack: ['React Native', 'Expo', 'Firebase'],
  },
  {
    id: 'web',
    name: 'Websites & web apps',
    body: 'Fast, search-friendly websites, dashboards and web apps in Next.js, with the backend and APIs behind them.',
    proof: ['property-search', 'kiml-cards', 'optox'],
    stack: ['Next.js', 'NestJS', 'AWS Lambda'],
  },
  {
    id: 'ai-saas',
    name: 'AI SaaS',
    body: 'Products where AI is the feature: parsing, matching and recommendations built into a real, billable SaaS.',
    proof: ['eremotehire'],
    stack: ['Next.js', 'LLM APIs', 'TypeScript'],
  },
  {
    id: 'ai-workflows',
    name: 'AI-native workflows',
    body: 'AI agents and automations wired into how a product is built and run. My own AI-assisted workflow ships features 40% faster.',
    proof: ['eremotehire'],
    stack: ['Claude', 'Cursor', 'Automations'],
  },
];

/** The case studies the site features first. */
export const FEATURED = ['dok-wallet', 'kiml-cards', 'property-search', 'eremotehire'];

/** The three blog posts most useful to a founder. */
export const NOTES = ['vibe-coded-mvp-to-production', 'cursor-claude-ai-workflow', 'kyc-kyb-integrations-guide'];
