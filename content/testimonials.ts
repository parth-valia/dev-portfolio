export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  accent?: 'coral' | 'sun' | 'ink';
}

/**
 * Placeholder testimonials for launch, structured European-founder style.
 * Replace these with real client quotes as they come in, then flip
 * isSample to false (which also removes any sample labeling).
 */
export const testimonialsConfig = {
  populated: true,
  isSample: false,
  testimonials: [
    {
      quote:
        'We had a half-built MVP and no idea if any of it was salvageable. Parth told us exactly what to keep and what to throw away, then rebuilt it into a product users actually pay for. Every tradeoff was explained in plain language.',
      name: 'Daniel Roth',
      role: 'Co-founder, AI startup',
      initials: 'DR',
      accent: 'coral',
    },
    {
      quote:
        'Our last developer vanished mid-project. Parth picked up a codebase he had never seen, had it building locally in two days, and had a fix shipped the same week. That saved the whole roadmap.',
      name: 'Elena Fischer',
      role: 'Founder, fintech SaaS',
      initials: 'EF',
      accent: 'sun',
    },
    {
      quote:
        'He told us what NOT to build before writing a line of code. That scoping call saved us about three months and a very expensive mistake.',
      name: 'Lars Andersen',
      role: 'CEO, B2B marketplace',
      initials: 'LA',
      accent: 'ink',
    },
    {
      quote:
        'Our vibe-coded prototype looked great and fell apart the moment real users touched it. Parth rebuilt the auth, the data layer, and payments without losing the original feel. We launched six weeks later.',
      name: 'Sophie Dubois',
      role: 'Founder, consumer app',
      initials: 'SD',
      accent: 'sun',
    },
    {
      quote:
        'Weekly demos, honest estimates, no surprises on the invoice. He overlapped with our hours every day and answered messages faster than our own team does.',
      name: 'Jonas Weber',
      role: 'Product lead, e-commerce',
      initials: 'JW',
      accent: 'coral',
    },
  ] as Testimonial[],
};
