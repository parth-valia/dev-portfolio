'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StaggerItem } from '@/components/ui/enhanced-animated-section';
import { MatrixHeading, TerminalText } from '@/components/ui/matrix-text-reveal';
import { blogPosts } from '@/content/blog';

// Consistent date formatting to prevent hydration errors
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function BlogSection() {
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-4 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      <div className="relative z-10">
        <StaggerItem className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Calendar className="h-6 w-6 text-matrix-green -mt-2" />
            <TerminalText
              text="BLOG_POSTS.EXE"
              className="text-matrix-green text-sm uppercase tracking-wider"
              delay={0.2}
            />
          </div>

          <MatrixHeading
            level={2}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-display mb-6"
            delay={0.4}
          >
            Tech <span className="text-cyber-blue font-mono">Journal</span>
          </MatrixHeading>

          <motion.p
            className="text-sm sm:text-base lg:text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Thoughts, insights, and learnings from my journey in technology
          </motion.p>
        </StaggerItem>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {featuredPosts.map((post, index) => (
            <StaggerItem
              key={post.slug}
              delay={index * 0.1}
              className="h-full"
            >
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  filter: 'brightness(1.05)',
                  boxShadow: '0 15px 35px rgba(0, 255, 65, 0.1)'
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-full"
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-matrix-green/20 hover:border-matrix-green/40 transition-all duration-300 group overflow-hidden">
                  {/* <Link href={`/blog/${post.slug}`} className="block h-full"> */}
                    <div>
                      <div className="relative">
                        {post.image && (
                          <div className="aspect-video overflow-hidden">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="bg-secondary/80 text-matrix-green border-matrix-green/30">
                            {post.category}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader>
                        <CardTitle className="text-lg sm:text-xl font-bold group-hover:text-matrix-green transition-colors duration-300">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Button asChild variant="ghost" className="w-[90%] ml-[5%] group/btn hover:text-matrix-green">
                          <Link href={`/blog/${post.slug}`}>
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Link>
                        </Button>
                      </CardContent>
                    </div>
                  {/* </Link> */}
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Button asChild size="lg" className="bg-gradient-to-r from-matrix-green to-cyber-blue hover:from-matrix-green/80 hover:to-cyber-blue/80">
            <Link href="/blog">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section >
  );
}