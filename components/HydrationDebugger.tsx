'use client';

import { useEffect, useState } from 'react';

export default function HydrationDebugger() {
  const [isClient, setIsClient] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>({});
  
  useEffect(() => {
    setIsClient(true);
    
    const info = {
      timestamp: new Date().toISOString(),
      windowExists: typeof window !== 'undefined',
      documentExists: typeof document !== 'undefined',
      currentURL: typeof window !== 'undefined' ? window.location.href : 'N/A',
      pathname: typeof window !== 'undefined' ? window.location.pathname : 'N/A',
      hash: typeof window !== 'undefined' ? window.location.hash : 'N/A',
      localStorageAvailable: typeof localStorage !== 'undefined',
      sessionStorageAvailable: typeof sessionStorage !== 'undefined',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
    };
    
    setDebugInfo(info);
    
    console.log('=== HYDRATION DEBUG START ===');
    console.log('Client hydrated at:', info.timestamp);
    console.log('Window exists:', info.windowExists);
    console.log('Document exists:', info.documentExists);
    console.log('Current URL:', info.currentURL);
    console.log('Pathname:', info.pathname);
    console.log('Hash:', info.hash);
    console.log('LocalStorage available:', info.localStorageAvailable);
    console.log('SessionStorage available:', info.sessionStorageAvailable);
    console.log('User Agent:', info.userAgent);
    console.log('=== HYDRATION DEBUG END ===');
    
    const handleNavigation = () => {
      console.log('🔄 NAVIGATION DETECTED:', {
        url: window.location.href,
        pathname: window.location.pathname,
        hash: window.location.hash,
      });
    };
    
    window.addEventListener('popstate', handleNavigation);
    
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        console.log('🖱️ CLICK DETECTED:', {
          tag: target.tagName,
          href: target.getAttribute('href'),
          textContent: target.textContent?.slice(0, 50),
          timestamp: new Date().toISOString(),
        });
      }
    };
    
    document.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('popstate', handleNavigation);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return (
      <div style={{ display: 'none' }} data-hydration-marker data-client={isClient}>
        Hydration: {isClient ? 'Complete' : 'Pending'}
      </div>
    );
  }

  return (
    <div 
      style={{ 
        position: 'fixed', 
        bottom: 0, 
        right: 0, 
        background: 'rgba(0,0,0,0.8)', 
        color: '#00ff00',
        padding: '10px',
        fontSize: '10px',
        fontFamily: 'monospace',
        zIndex: 9999,
        maxWidth: '300px',
        maxHeight: '200px',
        overflow: 'auto',
      }}
    >
      <strong>🔍 Hydration Status:</strong> {isClient ? '✅ Complete' : '⏳ Pending'}
      {isClient && (
        <div style={{ marginTop: '5px', fontSize: '9px' }}>
          <div>📍 Path: {debugInfo.pathname}</div>
          <div>🔗 URL: {debugInfo.currentURL?.slice(0, 50)}...</div>
          <div>⏰ {debugInfo.timestamp}</div>
        </div>
      )}
    </div>
  );
}
