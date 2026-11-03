export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  company?: string;
  timeframe: string;
  highlights: string[];
  features: string[];
  stack: string[];
  links: {
    playStore?: string;
    appStore?: string;
    web?: string;
    github?: string;
  };
  coverImage: string;
  gallery: string[];
  impact: {
    mauDelta?: number;
    crashReduction?: number;
    rating?: number;
    installs?: string;
    engagement?: number;
  };
  category: 'mobile' | 'web' | 'blockchain' | 'fintech';
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  technologies: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  excerpt: string;
  date: string;
  tags: string[];
  coverImage: string;
  image: string;
  readTime: string;
  content: string;
  category: string;
}