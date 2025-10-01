'use client';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, TrendingUp, Award, Terminal, Code2, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TerminalWindow } from '@/components/ui/terminal-window';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { StaggerItem } from '@/components/ui/enhanced-animated-section';
import { MatrixHeading, TerminalText } from '@/components/ui/matrix-text-reveal';

const experiences = [
  {
    title: 'React Native Developer',
    company: 'Corenet Tech',
    period: 'Apr 2025 – Present',
    location: 'Surat, India',
    type: 'Full-time',
    description: 'Leading development of production-grade mobile applications with focus on performance optimization and user engagement.',
    achievements: [
      'Launched 3 production-grade applications, increasing monthly active users by 22%',
      'Accelerated responsiveness by 35% via load-time reductions and render optimizations',
      'Streamlined UX workflows with design/product, reducing churn by 18% in Agile/Scrum',
      'Mentored junior developers through reviews and pairing, elevating code quality'
    ],
    technologies: ['JavaScript', 'TypeScript', 'React Native', 'Redux', 'Expo', 'REST APIs', 'Firebase', 'AWS CLI', 'Google Maps API', 'Payment Gateways'],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20',
  },
  {
    title: 'React Native Developer',
    company: 'Shri Hari Info Solutions',
    period: 'Nov 2022 – Mar 2025',
    location: 'Remote',
    type: 'Full-time',
    description: 'Developed and maintained multiple mobile applications across retail, agri-tech, and spiritual domains with significant user growth.',
    achievements: [
      'Drove a 40% increase in total installs across retail, agri‑tech, and spiritual apps',
      'Resolved memory leaks and applied structured debugging to improve stability',
      'Refactored critical flows and API integrations to enhance responsiveness and reliability',
      'Implemented push notifications (FCM) and optimized FlatList rendering to boost engagement'
    ],
    technologies: ['React Native', 'Redux', 'Firebase', 'Google Maps API', 'FCM', 'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Expo', 'REST APIs', 'AWS CLI', 'Blockchain', 'Web3'],
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20',
  }
];

const skills = [
  { name: 'React Native', level: 95, category: 'Frontend' },
  { name: 'React.js', level: 80, category: 'Frontend' },
  { name: 'Next.js', level: 85, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Language' },
  { name: 'Redux Toolkit', level: 85, category: 'State Management' },
  { name: 'AWS Services', level: 80, category: 'Cloud' },
  { name: 'Firebase', level: 85, category: 'Backend' },
  { name: 'REST APIs', level: 90, category: 'Integration' },
  { name: 'Push Notifications', level: 85, category: 'Features' },
  { name: 'Performance Optimization', level: 88, category: 'Optimization' },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-4 sm:py-8 lg:py-12 relative overflow-hidden">
      {/* Clean Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-950" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <StaggerItem className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Terminal className="h-6 w-6 text-matrix-green -mt-2" />
              <TerminalText
                text="EXPERIENCE.LOG"
                className="text-matrix-green text-sm uppercase tracking-wider"
                delay={0.2}
              />
            </div>

            <MatrixHeading
              level={2}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display mb-6"
              delay={0.4}
            >
              Professional <span className="text-cyber-blue font-mono">Journey</span>
            </MatrixHeading>

            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Building impactful mobile applications and leading development teams
            </motion.p>
          </StaggerItem>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Experience Timeline */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <TerminalWindow title="work_history.log">
                  <div className="flex items-center space-x-3">
                    <Briefcase className="h-5 w-5 text-matrix-green" />
                    <span className="text-matrix-green font-mono text-lg">PROFESSIONAL EXPERIENCE</span>
                  </div>
                </TerminalWindow>
              </motion.div>

              <div className="space-y-12">
                {experiences.map((experience, index) => (
                  <ScrollReveal
                    key={index}
                    direction={index % 2 === 0 ? "left" : "right"}
                    delay={index * 0.2}
                    className="group"
                  >
                    <TerminalWindow title={`${experience.company.toLowerCase().replace(/\s+/g, '_')}.job`}>
                      <div className="space-y-4">
                        {/* Job Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-matrix-green animate-pulse"></div>
                            <span className="text-matrix-green font-mono text-xs">
                              {experience.type.toUpperCase()}
                            </span>
                          </div>
                          <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30 font-mono text-xs hover:bg-cyber-blue/30 hover:shadow-lg hover:shadow-cyber-blue/20">
                            {experience.period}
                          </Badge>
                        </div>

                        {/* Job Details */}
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-xl font-semibold text-white font-display group-hover:text-matrix-green transition-colors">
                              {experience.title}
                            </h4>
                            <p className="text-cyber-blue font-mono text-sm mt-1">
                              @ {experience.company} • {experience.location}
                            </p>
                          </div>

                          <p className="text-gray-300 text-sm leading-relaxed">
                            {experience.description}
                          </p>

                          {/* Achievements */}
                          <div>
                            <h5 className="text-matrix-green font-mono text-sm mb-2 flex items-center">
                              <Zap className="mr-2 h-4 w-4" />
                              KEY_ACHIEVEMENTS:
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {experience.achievements.map((achievement, i) => (
                                <div key={i} className="flex items-start space-x-2 text-xs">
                                  <span className="text-matrix-green font-mono mt-1">{'>'}</span>
                                  <span className="text-gray-300">{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Technologies */}
                          <div>
                            <h5 className="text-cyber-blue font-mono text-sm mb-2 flex items-center">
                              <Code2 className="mr-2 h-4 w-4 -mt-2" />
                              TECH_STACK:
                            </h5>
                            <div className="flex flex-wrap gap-1">
                              {experience.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-1 bg-matrix-gray-dark border border-matrix-green-dark text-matrix-green font-mono text-xs rounded hover:border-matrix-green transition-colors"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TerminalWindow>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <TerminalWindow title="skill_matrix.sys">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-cyber-blue" />
                    <span className="text-cyber-blue font-mono text-lg">TECHNICAL PROFICIENCY</span>
                  </div>
                </TerminalWindow>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="sticky top-24"
              >
                <TerminalWindow title="skills.json">
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <StaggerItem
                        key={skill.name}
                        delay={index * 0.15}
                        className="relative"
                      >
                        <motion.div
                          whileHover={{
                            scale: 1.02,
                            filter: 'brightness(1.05)',
                            boxShadow: '0 10px 30px rgba(0, 255, 65, 0.1)'
                          }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                          <Card className="bg-matrix-gray-dark border border-matrix-gray-dark hover:border-matrix-green-dark transition-colors items-center">
                            <CardContent>
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className="text-white font-mono text-sm">{skill.name}</span>
                                  <Badge className="bg-matrix-green/20 text-matrix-green border-matrix-green/30 font-mono text-xs hover:bg-matrix-green/30 hover:shadow-lg hover:shadow-matrix-green/20">
                                    {skill.category}
                                  </Badge>
                                </div>
                                <span className="text-cyber-blue font-mono text-sm">{skill.level}%</span>
                              </div>

                              <div className="w-full bg-matrix-gray-dark rounded-full h-2 overflow-hidden">
                                <motion.div
                                  className="h-2 rounded-full z-10 bg-gradient-to-r from-matrix-green via-cyber-blue to-cyber-purple relative"
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.level}%` }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 1 + index * 0.1, duration: 1, ease: "easeOut" }}
                                />
                                <div className="h-2 w-[93%] rounded-full bg-gray-700 absolute -mt-2 -z-2" />
                              </div>

                              <div className="text-xs text-gray-500 font-mono mt-1">
                                {skill.level >= 90 ? 'EXPERT' : skill.level >= 80 ? 'ADVANCED' : skill.level >= 70 ? 'INTERMEDIATE' : 'BEGINNER'}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </StaggerItem>
                    ))}
                  </div>

                  {/* Terminal Footer */}
                  <div className="pt-4 border-t border-matrix-gray-dark text-xs font-mono text-gray-500">
                    <div className="flex justify-between">
                      <span>Skills evaluated: {skills.length}</span>
                      <span>Avg proficiency: {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%</span>
                    </div>
                  </div>
                </TerminalWindow>
              </motion.div>
            </div>
          </div>
      </div>
    </section>
  );
}
