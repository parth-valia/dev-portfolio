import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { PageTransition } from '@/components/ui/page-transition';
import { SmoothScroll } from '@/components/ui/smooth-scroll';
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Parth Valia - React Native Developer',
  description: 'Professional React Native developer with 2.8+ years of experience building exceptional mobile applications.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true" className={inter.className}>
        <ThemeProvider defaultTheme="dark">
          <SmoothScroll />
          <Header />
          <PageTransition>
            <main className="min-h-screen">
              <Suspense>
                {children}
              </Suspense>
            </main>
          </PageTransition>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}