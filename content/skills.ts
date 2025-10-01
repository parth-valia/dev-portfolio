import { Skill } from '@/lib/types';

export const skills: Skill[] = [
  // Core Languages
  { name: 'JavaScript (ES6+)', level: 95, category: 'Core' },
  { name: 'TypeScript', level: 90, category: 'Core' },
  { name: 'HTML', level: 90, category: 'Core' },
  { name: 'CSS', level: 85, category: 'Core' },
  { name: 'C/C++', level: 75, category: 'Core' },
  
  // Mobile Development
  { name: 'React Native', level: 95, category: 'Mobile' },
  { name: 'Expo', level: 85, category: 'Mobile' },
  { name: 'Redux', level: 90, category: 'Mobile' },
  { name: 'Zustand', level: 80, category: 'Mobile' },
  
  // Web Development
  { name: 'React.js', level: 90, category: 'Web' },
  { name: 'Next.js', level: 85, category: 'Web' },
  { name: 'Material UI', level: 80, category: 'Web' },
  { name: 'Styled Components', level: 75, category: 'Web' },
  { name: 'Tailwind CSS', level: 85, category: 'Web' },
  
  // Backend & APIs
  { name: 'REST APIs', level: 90, category: 'Backend' },
  { name: 'Firebase', level: 85, category: 'Backend' },
  { name: 'AWS CLI', level: 75, category: 'Backend' },
  { name: 'WebSockets', level: 70, category: 'Backend' },
  { name: 'CI/CD pipelines', level: 70, category: 'Backend' },
  
  // Integrations & APIs
  { name: 'Google Maps API', level: 80, category: 'Integration' },
  { name: 'Payment Integrations', level: 75, category: 'Integration' },
  { name: 'SDK Integrations', level: 75, category: 'Integration' },
  { name: 'Blockchain', level: 70, category: 'Integration' },
  { name: 'Web3', level: 65, category: 'Integration' },
  
  // Development Tools
  { name: 'Git', level: 95, category: 'Tools' },
  { name: 'GitHub', level: 90, category: 'Tools' },
  { name: 'VS Code', level: 95, category: 'Tools' },
  { name: 'Postman', level: 85, category: 'Tools' },
  { name: 'Notion', level: 80, category: 'Tools' },
  { name: 'JIRA', level: 75, category: 'Tools' },
  { name: 'Slack', level: 85, category: 'Tools' },
  { name: 'Sentry', level: 75, category: 'Tools' },
];

export const skillCategories = [
  'Core',
  'Mobile', 
  'Web',
  'Backend',
  'Integration',
  'Tools'
];