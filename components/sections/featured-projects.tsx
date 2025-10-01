'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink, Star, Download, Code2, Zap, Users, Smartphone, Apple } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TechPill } from '@/components/ui/tech-pill';
import { TerminalWindow } from '@/components/ui/terminal-window';
import { StaggerItem } from '@/components/ui/enhanced-animated-section';
import { MatrixHeading, TerminalText } from '@/components/ui/matrix-text-reveal';
import { projects } from '@/content/projects';

const featuredProjects = projects.slice(0, 3);

export function FeaturedProjects() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <StaggerItem className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12 lg:mb-16">
          <div className="flex items-center justify-center space-x-3">
            <Code2 className="h-6 w-6 text-matrix-green -mt-2" />
            <TerminalText
              text="FEATURED_PROJECTS.EXE"
              className="text-matrix-green text-sm uppercase tracking-wider"
              delay={0.2}
            />
          </div>

          <MatrixHeading
            level={2}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-display mb-6"
            delay={0.4}
          >
            Featured <span className="text-cyber-blue font-mono">Projects</span>
          </MatrixHeading>

          <motion.p
            className="text-sm sm:text-base lg:text-xl text-muted-foreground max-w-3xl mx-auto font-normal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            A showcase of my most impactful mobile applications and web projects
          </motion.p>
        </StaggerItem>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {featuredProjects.map((project, index) => (
            <StaggerItem
              key={project.slug}
              delay={index * 0.1}
              className="group"
            >
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  filter: 'brightness(1.1)',
                  boxShadow: '0 20px 40px rgba(0, 255, 65, 0.1)'
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-full"
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-matrix-green/20 hover:border-matrix-green/40 transition-all duration-300 group overflow-hidden">
                  {/* Main clickable area for project details */}
                  <Link href={`/projects/${project.slug}`} className="block">
                    <div className="relative">
                      {/* Project Image */}
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={project.coverImage}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute -inset-2 bg-gradient-to-t from-black/80 to-black/20" />
                      </div>

                      {/* Impact Stats Overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between text-white">
                          {project.impact.rating && (
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-matrix-green text-matrix-green" />
                              <span className="font-mono text-sm">{project.impact.rating}</span>
                            </div>
                          )}
                          {project.impact.installs && (
                            <div className="flex items-center space-x-1">
                              <Download className="h-3 w-3 text-cyber-blue" />
                              <span className="font-mono text-xs text-cyber-blue">{project.impact.installs}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                      {/* Project Title & Subtitle */}
                      <div>
                        <div className='flex flex-row items-center justify-between'>
                          <h3 className="text-base sm:text-lg font-semibold text-white font-display group-hover:text-matrix-green transition-colors">
                            {project.title}
                          </h3>
                          {/* Project Category Badge */}
                          <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30 font-mono text-xs hover:bg-cyber-blue/30 hover:shadow-lg hover:shadow-cyber-blue/20">
                            {project.category}
                          </Badge>
                        </div>

                        <p className="text-gray-400 text-xs sm:text-sm font-mono mt-1">
                          {'>'} {project.subtitle}
                        </p>
                      </div>

                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2">
                        {project.highlights[0]}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1">
                        {project.stack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-matrix-gray-dark border border-matrix-green-dark text-matrix-green font-mono text-xs rounded hover:border-matrix-green transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.stack.length > 4 && (
                          <span className="px-2 py-1 text-gray-500 font-mono text-xs">
                            +{project.stack.length - 4}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Link>

                  {/* Action Buttons - Separate clickable areas to prevent nesting */}
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <div className="flex items-center justify-between pt-4 border-t border-matrix-gray-dark">
                      <div className="flex space-x-2">
                        {project.links.playStore && (
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="text-gray-400 hover:text-matrix-green font-mono p-2 h-auto"
                          >
                            <Link 
                              href={project.links.playStore} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Smartphone className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                        {project.links.appStore && (
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="text-gray-400 hover:text-cyber-blue font-mono p-2 h-auto"
                          >
                            <Link 
                              href={project.links.appStore} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Apple className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-matrix-green hover:text-matrix-green font-mono group/btn text-xs"
                      >
                        <Link href={`/projects/${project.slug}`}>
                          VIEW_DETAILS
                          <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </div>

        {/* View All Button */}
        <StaggerItem delay={0.4} className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-transparent border-2 border-matrix-green text-matrix-green hover:bg-matrix-green hover:text-black font-mono group shadow-neon-green"
          >
            <Link href="/projects">
              <Code2 className="mr-2 h-4 w-4" />
              EXPLORE_ALL_PROJECTS
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </StaggerItem>
      </div>
    </section>
  );
}