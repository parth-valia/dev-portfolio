export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  audience: string;
  problem: string;
  built: string;
  outcome: string;
  outcomeMetric: string;
  outcomeLabel: string;
  stack: string[];
  links: {
    playStore?: string;
    appStore?: string;
    web?: string;
  };
  coverImage?: string;
  /** The cover extended to the case study frame's 21:9 shape. */
  coverWide?: string;
}

/**
 * Verified facts only, sourced from Parth's resume and app-store data.
 * No invented metrics. Where no metric exists, the outcome is described
 * qualitatively rather than with a made-up number.
 * Latest work first: Dok Wallet → KimlCards → Property Search.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'dok-wallet',
    title: 'Dok Wallet',
    category: 'Fintech · Non-custodial crypto wallet',
    audience: 'Crypto users across chains',
    problem:
      'Crypto wallet users had to refresh manually to confirm transactions, had no reliable recovery path across devices, and were exposed to unauthorized access on compromised devices.',
    built:
      'A multi-chain wallet with real-time transaction alerts and background sync, encrypted seed-phrase backup & restore, Google Play Integrity attestation, automatic transaction verification, and zero-config token sync.',
    outcome:
      'Every confirmation flow verifies itself, so users never refresh manually, and device recovery just works through encrypted seed backup.',
    outcomeMetric: 'Every transfer self-verifies',
    outcomeLabel: 'with no manual refresh, secured by Play Integrity attestation and encrypted seed backup',
    stack: ['React Native', 'React', 'Next.js', 'AWS Lambda', 'Node.js'],
    links: {},
    coverImage: '/images/projects/dok-wallet.png',
    coverWide: '/images/projects/dok-wallet-wide.png',
  },
  {
    slug: 'kiml-cards',
    title: 'KimlCards',
    category: 'Fintech · Crypto-backed cards',
    audience: 'Card users & merchants',
    problem:
      'Managing crypto-backed cards meant juggling verification providers, delayed transaction states, and separate merchant tooling, with real money on the line if any of it broke.',
    built:
      'End-to-end card onboarding with KYC/KYB integrations (Sumsub, Reap, UR), webhook-driven real-time transaction sync, merchant & user dashboards, and RBAC with encrypted sensitive-data handling.',
    outcome:
      'One onboarding pipeline across Sumsub, Reap, and UR, with webhook-driven sync that keeps card and transaction states accurate in real time.',
    outcomeMetric: '3 KYC providers',
    outcomeLabel: 'unified into one onboarding pipeline',
    stack: ['React Native', 'NestJS', 'PostgreSQL', 'AWS Lambda', 'Webhooks'],
    links: {},
    coverImage: '/images/projects/kiml-cards.png',
    coverWide: '/images/projects/kiml-cards-wide.png',
  },
  {
    slug: 'property-search',
    title: 'Property Search',
    category: 'Web & mobile platform',
    audience: 'UAE lifestyle & property seekers',
    problem:
      'A startup needed a full-stack, cross-platform lifestyle platform (property, household, travel, legal, financial) shipped to App Store, Play Store, and web, all inside a fixed deadline.',
    built:
      'The full platform from scratch: React Native + Next.js (SSR) frontend, Node.js + NestJS backend, and serverless REST APIs on AWS Lambda + API Gateway, with a shared service layer across web and mobile.',
    outcome:
      'Shipped to App Store, Play Store, and web within deadline from one shared codebase, with 30% faster feature development after launch.',
    outcomeMetric: '3 stores, one codebase',
    outcomeLabel: 'shipped within deadline',
    stack: ['React Native', 'Next.js', 'NestJS', 'AWS Lambda', 'Zustand'],
    links: { web: 'https://propertysearch.com' },
    coverImage: '/images/projects/property-search.png',
    coverWide: '/images/projects/property-search-wide.png',
  },
  {
    slug: 'grabit',
    title: 'Grabit',
    category: 'Consumer mobile app',
    audience: 'Hyperlocal deal discovery',
    problem:
      'Shoppers were missing real offers around them, and businesses had no way to reach nearby customers at the right moment.',
    built:
      'A hyperlocal deal-discovery app with real-time offers in a 5 km radius, a QR-based redemption flow, and in-app analytics tracking coupon views and redemptions.',
    outcome: 'More engagement, more redemptions, and actionable data for partner businesses.',
    outcomeMetric: '+25%',
    outcomeLabel: 'engagement from QR-based offers',
    stack: ['React Native', 'TypeScript', 'Redux', 'Firebase', 'Google Maps API', 'Payments'],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.corenettech.grabituser&hl=en_IN&pli=1',
      appStore: 'https://apps.apple.com/in/app/grabituser/id6480311561',
    },
    coverImage: '/images/projects/grabit.png',
    coverWide: '/images/projects/grabit-wide.png',
  },
  {
    slug: 'grabit-business',
    title: 'Grabit Business',
    category: 'B2B platform',
    audience: 'Merchant marketing platform',
    problem:
      'Merchants wanted to run geo-targeted campaigns but had no self-serve tool to create them or measure whether they worked.',
    built:
      'A merchant platform for creating and managing geo-targeted campaigns with coins, push/SMS notifications, and real-time redemption dashboards.',
    outcome: 'A campaign engine businesses actually adopted, with dashboards that showed marketing ROI.',
    outcomeMetric: '1,000+',
    outcomeLabel: 'businesses using the campaign engine',
    stack: ['React Native', 'TypeScript', 'Redux', 'Firebase', 'AWS'],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.corenettech.grabitbusiness',
      appStore: 'https://apps.apple.com/in/app/grabit-business-app/id6484402238',
    },
    coverImage: '/images/projects/grabit-business.png',
    coverWide: '/images/projects/grabit-business-wide.png',
  },
  {
    slug: 'hariprabodham-vrund',
    title: 'Hariprabodham Vrund',
    category: 'Content & streaming app',
    audience: 'Devotional audio streaming',
    problem:
      'A community wanted its devotional content available offline and on-demand, with an experience polished enough to retain daily listeners.',
    built:
      'A streaming app with offline playback, custom playlists, background audio, and personalized content feeds, built for low-end devices and patchy networks.',
    outcome: 'A store listing users loved and kept, strong ratings with organic install growth.',
    outcomeMetric: '4.9★ · 10K+',
    outcomeLabel: 'Play Store rating · installs',
    stack: ['React Native', 'Zustand', 'Firebase', 'TypeScript'],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.suhradvrund&hl=en_IN',
      appStore: 'https://apps.apple.com/in/app/hariprabodham-vrund/id6474902923',
    },
    coverImage: '/images/projects/hariprabodham.png',
    coverWide: '/images/projects/hariprabodham-wide.png',
  },
  {
    slug: 'krisiyukta',
    title: 'Krisiyukta',
    category: 'Agri-tech app',
    audience: 'Farmers in rural markets',
    problem:
      'Farmers needed reliable weather data, market prices, and a community, in their own language, on unreliable connections.',
    built:
      'An offline-first, multilingual agri-tech app with live weather and market-price APIs plus built-in community features.',
    outcome: 'A dependable daily tool for farmers, even on poor networks.',
    outcomeMetric: '4.5★',
    outcomeLabel: 'Play Store rating across 1K+ installs',
    stack: ['React Native', 'Expo', 'Firebase', 'REST APIs'],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.krisiyukta.www&hl=en_IN',
    },
    coverImage: '/images/projects/krisiyukta.png',
    coverWide: '/images/projects/krisiyukta-wide.png',
  },
  {
    slug: 'eremotehire',
    title: 'eRemotehire',
    category: 'AI SaaS platform',
    audience: 'AI-powered hiring',
    problem:
      'Hiring teams were drowning in manual screening. The matching and parsing workflow needed to feel instant, not batch-processed.',
    built:
      'An AI-powered hiring platform: resume parsing, job-matching logic, and recruiter dashboards, on a UI tuned for fast, responsive interactions.',
    outcome: 'Faster screening workflows and a noticeably quicker product.',
    outcomeMetric: 'AI-first',
    outcomeLabel: 'parsing & matching shipped end-to-end',
    stack: ['Next.js', 'React', 'TypeScript', 'REST APIs'],
    links: {},
    coverImage: '/images/projects/eremotehire.png',
    coverWide: '/images/projects/eremotehire-wide.png',
  },
  {
    slug: 'optox',
    title: 'OptoX',
    category: 'Web3 platform',
    audience: 'P2P crypto transactions',
    problem:
      'P2P crypto trading demands absolute trust: wallet authentication and real-time trade states had to be rock solid.',
    built:
      'A blockchain-based P2P transaction platform with Web3 wallet authentication and a secure real-time trading interface.',
    outcome: 'A trading experience users could trust with real money.',
    outcomeMetric: 'Real-time',
    outcomeLabel: 'wallet-authenticated P2P trading',
    stack: ['Next.js', 'React', 'Web3', 'TypeScript'],
    links: {},
    coverImage: '/images/projects/optox.png',
    coverWide: '/images/projects/optox-wide.png',
  },
  {
    slug: 'wardrobe-app',
    title: 'Wardrobe App',
    category: 'Mobile app · Smart outfit management',
    audience: 'People planning what to wear',
    problem:
      'Planning outfits meant juggling clothes, occasions and dates with nothing to organize them in one place.',
    built:
      'A React Native app with a drag-and-drop outfit calendar, a clothing categorization and tagging system, and smart organization of the whole wardrobe.',
    outcome: 'Outfits are planned by dragging them onto the calendar, with every item categorized and tagged.',
    outcomeMetric: 'Drag-and-drop',
    outcomeLabel: 'outfit planning on a calendar',
    stack: ['React Native', 'TypeScript', 'REST APIs'],
    links: {},
    coverImage: '/images/projects/wardrobe.png',
    coverWide: '/images/projects/wardrobe-wide.png',
  },
  {
    slug: 'akshar-yatra',
    title: 'Akshar Yatra',
    category: 'Mobile app · Event management',
    audience: 'Organizers of spiritual gatherings',
    problem:
      'Checking in attendees at large spiritual gatherings was manual work, and venues often had no reliable connection.',
    built:
      'A React Native event management app with offline check-in and attendance tracking, built on an offline-first architecture with Firebase sync.',
    outcome: 'Check-in and attendance keep working without a connection, cutting the manual work at every gathering.',
    outcomeMetric: 'Offline check-in',
    outcomeLabel: 'for gatherings with no reliable connection',
    stack: ['React Native', 'Firebase', 'Offline Storage'],
    links: {},
    coverImage: '/images/projects/akshar-yatra.png',
    coverWide: '/images/projects/akshar-yatra-wide.png',
  },
];
