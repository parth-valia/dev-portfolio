import { notFound } from 'next/navigation';
import { projects } from '@/content/projects';
import ProjectPageClient from './project-page-client';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.subtitle,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }
  
  const featuredProjects = projects.slice(0, 3);

  return <ProjectPageClient project={project} featuredProjects={featuredProjects} />;
}