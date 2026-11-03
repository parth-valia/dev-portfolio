import { ImageResponse } from 'next/server';
import { TITLES } from '@/content/zero';
import { siteConfig } from '@/site.config';

export const runtime = 'edge';
export const alt = `${siteConfig.name}, product engineer for startup founders`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const INK = '#0b0b0a';
const LIME = '#c6ee3f';
const BONE = '#f1f2ea';

/** The card a shared link shows: the promise on the brand's lime note, with who is behind it. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: INK, padding: 64, alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 560 }}>
          <div style={{ fontSize: 28, color: LIME, fontWeight: 700 }}>{TITLES.kicker}</div>
          <div style={{ marginTop: 28, fontSize: 40, color: BONE, lineHeight: 1.25 }}>Mobile apps, websites, AI SaaS and AI workflows, built and shipped by one engineer.</div>
          <div style={{ marginTop: 40, fontSize: 30, color: BONE, fontWeight: 700 }}>{siteConfig.name}</div>
          <div style={{ marginTop: 6, fontSize: 24, color: '#8d8f84' }}>{siteConfig.url.replace('https://', '')}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: 440, height: 440, background: LIME, padding: 44, transform: 'rotate(-4deg)', justifyContent: 'center' }}>
          {TITLES.hero.map((line) => <div key={line} style={{ fontSize: 66, fontWeight: 900, color: INK, lineHeight: 1.02, letterSpacing: -2 }}>{line}</div>)}
        </div>
      </div>
    ),
    size,
  );
}
