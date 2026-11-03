import type { Config } from 'tailwindcss';

/** Colours and type come from the --z-* tokens in app/globals.css, so the theme stays Tailwind's defaults. */
const config: Config = {
  darkMode: ['class'],
  content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
};
export default config;
