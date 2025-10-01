import { HeroSection } from '@/components/sections/hero';
import { FeaturedProjects } from '@/components/sections/featured-projects';
import { ExperienceSection } from '@/components/sections/experience';
import { EducationSection } from '@/components/sections/education';
import { BlogSection } from '@/components/sections/blog';
import { ContributionsSection } from '@/components/sections/contributions';
import { ContactSection } from '@/components/sections/contact';
import { MinimalBackground } from '@/components/ui/minimal-background';

export default function Home() {
  return (
    <>
      <MinimalBackground />
      <section id="home" className="scroll-mt-24 md:scroll-mt-28">
        <HeroSection />
      </section>
      <section id="projects" className="scroll-mt-24 md:scroll-mt-28">
        <FeaturedProjects />
      </section>
      <section id="experience" className="scroll-mt-24 md:scroll-mt-28">
        <ExperienceSection />
      </section>
      <section id="education" className="scroll-mt-24 md:scroll-mt-28">
        <EducationSection />
      </section>
      <section id="blog" className="scroll-mt-24 md:scroll-mt-28">
        <BlogSection />
      </section>
      <section id="github" className="scroll-mt-24 md:scroll-mt-28">
        <ContributionsSection />
      </section>
      <section id="contact" className="scroll-mt-24 md:scroll-mt-28">
        <ContactSection />
      </section>
    </>
  );
}