import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { FirstVisitProvider } from '@/components/ui/first-visit-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { PageTransition } from '@/components/ui/page-transition';
import { SmoothScroll } from '@/components/ui/smooth-scroll';
import HydrationDebugger from '@/components/HydrationDebugger';
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Parth Valia - React Native Developer',
  description: 'Professional React Native developer with 2.8+ years of experience building exceptional mobile applications.',
  icons: {
    icon: '/favicon.ico',
  },
  other: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <HydrationDebugger />
        <ThemeProvider defaultTheme="dark">
          <FirstVisitProvider>
            {/* <SmoothScroll /> */}
            <Header />
            <main className="min-h-screen">
              {/* <Suspense> */}
                {/* <PageTransition> */}
                  {children}
                {/* </PageTransition> */}
              {/* </Suspense> */}
            </main>
            <Footer />
            <Toaster />
          </FirstVisitProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
