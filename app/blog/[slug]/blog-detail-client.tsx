'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Markdown } from '@/components/ui/markdown';

interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  readingTime: string;
  tags: string[];
  coverImage: string;
}

// Consistent date formatting to prevent hydration errors
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export default function BlogDetailClient({ post }: { post: BlogPost }) {
  return (
    <div className="min-h-screen bg-background matrix-grid relative">
      {/* Subtle Matrix background */}
      <div className="absolute inset-0 bg-gradient-to-br from-matrix-green/5 via-transparent to-cyber-blue/5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-20 relative z-10">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="ghost" asChild className="btn-matrix hover:text-matrix-green font-mono">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" /> 
              <Terminal className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </motion.div>

        <motion.div 
          className="space-y-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold font-display bg-gradient-to-r from-matrix-green to-cyber-blue bg-clip-text text-transparent text-matrix-glow">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-muted-foreground font-mono">
            <div className="flex items-center gap-2 hover-matrix">
              <Calendar className="h-4 w-4 text-matrix-green" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-2 hover-matrix">
              <Clock className="h-4 w-4 text-cyber-blue" />
              <span>{post.readingTime}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Badge 
                  variant="secondary" 
                  className="text-xs font-mono bg-matrix-green/10 text-matrix-green border border-matrix-green/30 hover:bg-matrix-green/20 transition-colors"
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="card-matrix overflow-hidden mb-8 hover-lift">
            <div className="relative aspect-video overflow-hidden">
              <Image 
                src={post.coverImage} 
                alt={post.title} 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="card-matrix hover-lift">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-mono prose-headings:text-matrix-green prose-code:text-cyber-blue prose-code:bg-matrix-green/10 prose-code:px-2 prose-code:py-1 prose-code:rounded">
                <Markdown content={post.content} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
