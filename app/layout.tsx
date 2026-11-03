import type { Metadata } from 'next';
import { Caveat, Chivo } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/motion/smooth-scroll';
import { PixelPet } from '@/components/pixel-pet/pixel-pet';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { ASK, SEO } from '@/content/zero';
import { siteConfig } from '@/site.config';

const sans = Chivo({ subsets: ['latin'], weight: ['400', '600', '800', '900'], variable: '--font-zero-sans' });
const hand = Caveat({ subsets: ['latin'], weight: ['600'], variable: '--font-zero-hand' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: SEO.title,
  description: SEO.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body data-zero suppressHydrationWarning className={`${sans.variable} ${hand.variable} zero-root min-h-[100svh] bg-[color:var(--z-bg)] font-[family-name:var(--font-zero-sans)] text-[color:var(--z-ink)] antialiased`}>
        <ThemeProvider defaultTheme="dark" storageKey="theme-zero">
          <a href="#main" className="sr-only z-[80] bg-[color:var(--z-accent)] px-4 py-3 font-semibold text-[color:var(--z-on-accent)] focus:not-sr-only focus:fixed focus:left-4 focus:top-4">{ASK.skip}</a>
          <SmoothScroll />
          {children}
          <PixelPet />
        </ThemeProvider>
      </body>
    </html>
  );
}
