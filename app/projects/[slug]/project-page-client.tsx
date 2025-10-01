'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, Users, Star, Github, Globe, Terminal, Smartphone, Apple, Code, Download, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TechPill } from '@/components/ui/tech-pill';
import { Metric } from '@/components/ui/metric';
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll';
import { motion } from 'framer-motion';

interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  role: string;
  timeframe: string;
  coverImage: string;
  highlights: string[];
  stack: string[];
  features: string[];
  gallery?: string[];
  links: {
    playStore?: string;
    appStore?: string;
    web?: string;
    github?: string;
  };
  impact: {
    rating?: number;
    installs?: string;
    mauDelta?: number;
  };
}

interface ProjectPageClientProps {
  project: Project;
  featuredProjects: Project[];
}

export default function ProjectPageClient({ project, featuredProjects }: ProjectPageClientProps) {
  return (
    <div className="min-h-screen bg-background matrix-grid relative">
      {/* Subtle Matrix background */}
      <div className="absolute inset-0 bg-gradient-to-br from-matrix-green/5 via-transparent to-cyber-blue/5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Back Button */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="ghost" asChild className="btn-matrix hover:text-matrix-green font-mono">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <Terminal className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </motion.div>

        {/* Project Header */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="space-y-6">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Badge variant="secondary" className="mb-4 font-mono bg-matrix-green/10 text-matrix-green border border-matrix-green/30">
                  <Code className="h-3 w-3 mr-1" />
                  {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                </Badge>
              </motion.div>
              <h1 className="text-4xl sm:text-5xl font-bold font-display bg-gradient-to-r from-matrix-green to-cyber-blue bg-clip-text text-transparent mb-4 text-matrix-glow">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
                {project.subtitle}
              </p>
              <p className="text-sm text-muted-foreground font-mono">
                <span className="text-matrix-green">{project.role}</span> • <span className="text-cyber-blue">{project.timeframe}</span>
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold font-mono text-matrix-green">Key Highlights</h3>
              <ul className="space-y-3">
                {project.highlights.map((highlight, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start space-x-3 hover-matrix group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-matrix-green rounded-full mt-2 flex-shrink-0 group-hover:bg-cyber-blue transition-colors" />
                    <span className="text-muted-foreground font-mono text-sm">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold font-mono text-cyber-blue">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                  >
                    <TechPill tech={tech} className="hover-matrix" />
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div 
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              {project.links.playStore && (
                <Button asChild className="btn-matrix bg-matrix-green hover:bg-matrix-green/80 text-black font-mono">
                  <Link href={project.links.playStore} target="_blank" rel="noopener noreferrer">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Play Store
                  </Link>
                </Button>
              )}
              {project.links.appStore && (
                <Button variant="outline" asChild className="btn-matrix border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-black font-mono">
                  <Link href={project.links.appStore} target="_blank" rel="noopener noreferrer">
                    <Apple className="mr-2 h-4 w-4" />
                    App Store
                  </Link>
                </Button>
              )}
              {project.links.web && (
                <Button variant="outline" asChild className="btn-matrix border-cyber-purple text-cyber-purple hover:bg-cyber-purple hover:text-black font-mono">
                  <Link href={project.links.web} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
              )}
              {project.links.github && (
                <Button variant="ghost" asChild className="btn-matrix hover:text-matrix-green font-mono">
                  <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
              )}
            </motion.div>
          </div>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="aspect-video relative overflow-hidden rounded-lg card-matrix hover-lift">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Impact Metrics */}
            {(project.impact.rating || project.impact.installs || project.impact.mauDelta) && (
              <Card className="card-matrix hover-lift">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold font-mono text-cyber-purple mb-4">Impact & Results</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {project.impact.rating && (
                      <motion.div 
                        className="text-center hover-matrix"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex items-center justify-center space-x-1 text-2xl font-bold text-yellow-500 mb-1">
                          <Star className="h-6 w-6 fill-current" />
                          <span className="font-mono">{project.impact.rating}</span>
                        </div>
                        <p className="text-sm text-muted-foreground font-mono">App Rating</p>
                      </motion.div>
                    )}
                    {project.impact.installs && (
                      <motion.div 
                        className="text-center hover-matrix"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex items-center justify-center space-x-1 text-2xl font-bold text-matrix-green mb-1">
                          <Download className="h-6 w-6" />
                          <span className="font-mono">{project.impact.installs}</span>
                        </div>
                        <p className="text-sm text-muted-foreground font-mono">Downloads</p>
                      </motion.div>
                    )}
                    {project.impact.mauDelta && (
                      <motion.div 
                        className="text-center col-span-2 hover-matrix"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex items-center justify-center space-x-1 text-2xl font-bold text-cyber-blue mb-1">
                          <TrendingUp className="h-6 w-6" />
                          <span className="font-mono">+{Math.round(project.impact.mauDelta * 100)}%</span>
                        </div>
                        <p className="text-sm text-muted-foreground font-mono">MAU Growth</p>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </motion.div>

        {/* Features */}
        <RevealOnScroll>
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold font-display mb-8 bg-gradient-to-r from-matrix-green to-cyber-blue bg-clip-text text-transparent text-matrix-glow">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                >
                  <Card className="card-matrix hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-matrix-green/20 rounded-full flex items-center justify-center border border-matrix-green/30">
                          <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse" />
                        </div>
                        <span className="font-medium font-mono text-sm">{feature}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </RevealOnScroll>

        {/* Next Project */}
        <RevealOnScroll>
          <div className="border-t pt-12">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">More Projects</h3>
              <Button variant="outline" asChild>
                <Link href="/projects">View All Projects</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8 mt-4">
              {featuredProjects.map((project, index) => (
                <RevealOnScroll key={project.slug} delay={index * 0.1}>
                  <Card className="h-full overflow-hidden group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge variant="secondary" className="mb-2">
                          {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                        </Badge>
                        {project.impact.rating && (
                          <div className="flex items-center space-x-1 text-white text-sm">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{project.impact.rating}</span>
                            {project.impact.installs && (
                              <>
                                <span className="mx-2">•</span>
                                <Download className="h-4 w-4" />
                                <span>{project.impact.installs}</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            {project.subtitle}
                          </p>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {project.highlights[0]}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.stack.slice(0, 3).map((tech) => (
                            <TechPill key={tech} tech={tech} variant="outlined" />
                          ))}
                          {project.stack.length > 3 && (
                            <span className="text-xs text-muted-foreground self-center">
                              +{project.stack.length - 3} more
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center space-x-2">
                            {project.links.playStore && (
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={project.links.playStore} target="_blank" rel="noopener noreferrer">
                                  <Smartphone className="h-4 w-4" />
                                </Link>
                              </Button>
                            )}
                            {project.links.appStore && (
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={project.links.appStore} target="_blank" rel="noopener noreferrer">
                                  <Apple className="h-4 w-4" />
                                </Link>
                              </Button>
                            )}
                          </div>

                          <Button variant="ghost" size="sm" asChild className="group/btn">
                            <Link href={`/projects/${project.slug}`}>
                              Details
                              <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
