import { Experience } from '@/lib/types';

export const experience: Experience[] = [
  {
    company: 'The Unmarketing Agency',
    role: 'Full-Stack Developer (Software Engineer II)',
    period: 'Nov 2025 – Present',
    location: 'UAE (remote)',
    highlights: [
      'Built a full-stack cross-platform Property Search application from scratch: React Native and Next.js (SSR) on the frontend, Node.js and NestJS on the backend, shipped to the App Store, Play Store and web within deadline',
      'Designed and deployed serverless REST APIs on AWS Lambda and API Gateway, cutting infrastructure costs and scaling automatically with zero server management',
      'Reduced new feature development time by 30% with a modular component architecture, a reusable UI system and a shared backend service layer across web and mobile',
      'Improved screen rendering and API response performance by 25% by optimizing data fetching, state management with Zustand and backend query efficiency',
      'Accelerated development velocity by 40% by bringing Cursor and Claude into the daily workflow for full-stack code generation, iteration and rapid prototyping',
    ],
    technologies: ['React Native', 'Next.js', 'Node.js', 'NestJS', 'TypeScript', 'Zustand', 'AWS Lambda', 'API Gateway', 'REST APIs'],
  },
  {
    company: 'Corenet Tech',
    role: 'React Native Developer (Software Engineer II)',
    period: 'Apr 2025 – Oct 2025',
    location: 'Mumbai, India',
    highlights: [
      'Increased user engagement by 25% and MAU by 22% by architecting the full-stack system for Grabit, a geo-spatial hyperlocal offers platform serving 1,000+ daily active users',
      'Reduced push notification latency by 60% with an event-driven backend on Node.js and AWS Lambda for Grabit Business, serving 1,000+ businesses',
      'Improved app responsiveness by 35% and reduced memory footprint by 28% by redesigning the Redux architecture with memoization and list virtualization',
      'Achieved a 99.5% crash-free rate and improved team code quality by 40% with Sentry monitoring, API error handling standards, code reviews and mentoring 2 junior engineers',
    ],
    technologies: ['React Native', 'TypeScript', 'Redux', 'Node.js', 'AWS Lambda', 'Sentry', 'Google Maps API', 'Firebase'],
  },
  {
    company: 'Shri Hari Info Solutions',
    role: 'React Native Developer (Software Engineer I)',
    period: 'Nov 2022 – Mar 2025',
    location: 'Mumbai, India',
    highlights: [
      'Achieved a 4.9 rating, 10,000+ downloads and 80% retention by delivering Hariprabodham Vrund, a full-stack streaming platform with offline-first architecture and background sync',
      'Enabled reliable data access for 1,000+ farmers in low-connectivity areas by building Krisiyukta, a full-stack agri-tech app with conflict-resolution sync and SQLite optimization',
      'Maintained 99.9% uptime with sub-second processing by architecting OptoX, a full-stack DeFi platform with a NestJS backend, WalletConnect and MetaMask wallets, milestone-based payments and blockchain transaction workflows',
      'Reduced database query time by 40% and API response time by 30% with GraphQL APIs in NestJS for eRemotehire, an AI-powered hiring platform, while cutting crash rates by 60% through performance profiling',
    ],
    technologies: ['React Native', 'TypeScript', 'NestJS', 'GraphQL', 'SQLite', 'Web3', 'WalletConnect', 'MetaMask'],
  },
];

export const education = {
  school: 'Veer Narmad South Gujarat University',
  degree: 'Bachelor of Computer Applications (BCA), Information Technology',
  period: 'Aug 2021 – Jul 2024',
  grade: 'CGPA 8.5/10',
};
