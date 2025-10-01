'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, ExternalLink, Star, Download, ArrowRight, Github, Smartphone, Apple } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TechPill } from '@/components/ui/tech-pill';
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll';
import { projects } from '@/content/projects';
import { HoverTilt } from '@/components/ui/hover-tilt';

const categories = ['all', 'mobile', 'web', 'blockchain'];

// Consistent date formatting to prevent hydration errors
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

type Repo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
};

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState<boolean>(true);
  const [repoError, setRepoError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoadingRepos(true);
        const res = await fetch('/api/github');
        if (!res.ok) throw new Error('Failed to load repositories');
        const data = await res.json();
        setRepos((data?.repos || []).slice(0, 9));
      } catch (e: any) {
        setRepoError(e?.message || 'Error loading repositories');
      } finally {
        setLoadingRepos(false);
      }
    };
    fetchRepos();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.stack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll>
          <div className="text-center space-y-4 mb-12">
          <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Featured{' '}
              <span className="text-cyber-blue font-mono">Projects</span>
            </motion.h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive showcase of mobile and web applications I've built,
              from hyperlocal discovery to blockchain wallets.
            </p>
          </div>
        </RevealOnScroll>

        {/* Filters */}
        <RevealOnScroll delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search projects, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <RevealOnScroll key={project.slug} delay={index * 0.1}>
              <motion.div whileHover={{ y: -4 }} className="h-full">
                <HoverTilt className="h-full">
                  <Card className="h-full overflow-hidden group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300">
                    {/* Main clickable area for project details */}
                    <Link href={`/projects/${project.slug}`} className="block">
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
                            <p className="text-xs text-muted-foreground mt-1">
                              {project.timeframe}
                            </p>
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.highlights[0]}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {project.stack.slice(0, 4).map((tech) => (
                              <TechPill key={tech} tech={tech} variant="outlined" />
                            ))}
                            {project.stack.length > 4 && (
                              <span className="text-xs text-muted-foreground self-center">
                                +{project.stack.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Link>

                    {/* Action buttons - Separate clickable areas to prevent nesting */}
                    <div className="px-6 pb-6">
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center space-x-2">
                          {project.links.playStore && (
                            <Button variant="ghost" size="sm" asChild>
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
                            <Button variant="ghost" size="sm" asChild>
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
                          {project.links.web && (
                            <Button variant="ghost" size="sm" asChild>
                              <Link 
                                href={project.links.web} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                          )}
                          {project.links.github && (
                            <Button variant="ghost" size="sm" asChild>
                              <Link 
                                href={project.links.github} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Github className="h-4 w-4" />
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
                  </Card>
                </HoverTilt>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <RevealOnScroll>
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No projects found matching your criteria. Try adjusting your search or filters.
              </p>
            </div>
          </RevealOnScroll>
        )}

        {/* GitHub Repositories Section */}
        <RevealOnScroll delay={0.2}>
          <div className="mt-24">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-3xl font-bold">Open Source Repos</h2>
              <p className="text-muted-foreground">Recent public repositories from my GitHub.</p>
            </div>

            {repoError && (
              <div className="text-center text-sm text-red-600 mb-6">{repoError}</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loadingRepos && (
                Array.from({ length: 6 }).map((_, idx) => (
                  <Card key={idx} className="border-0 shadow-md h-40" />
                ))
              )}

              {!loadingRepos && repos.map((repo) => (
                <Card key={repo.id} className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-semibold">
                          {repo.name}
                        </h3>
                        <Badge variant="secondary" className="ml-2">
                          {repo.language || 'Other'}
                        </Badge>
                      </div>
                      {repo.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{repo.description}</p>
                      )}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {repo.stargazers_count}</span>
                          <span>Forks {repo.forks_count}</span>
                        </div>
                        <span>Updated {formatDate(repo.updated_at)}</span>
                      </div>
                      <div className="pt-2">
                        <Button asChild size="sm" variant="ghost">
                          <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            View Repo
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}