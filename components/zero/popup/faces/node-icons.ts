/** Line icons for the workflow cards, drawn in a 24-unit box like a regular icon set, scaled into the card's badge. */
export type NodeIcon = (ctx: CanvasRenderingContext2D) => void;

const path = (d: string) => (ctx: CanvasRenderingContext2D) => ctx.stroke(new Path2D(d));

export const NODE_ICONS = {
  /** Call: a phone handset. */
  call: path('M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z'),
  /** Plan: a checklist on a clipboard. */
  plan: path('M9 4h6v3H9zM7 5H5v16h14V5h-2M8 12l1.5 1.5L12 11M8 17l1.5 1.5L12 16M14 12.5h3M14 17.5h3'),
  /** Build: code brackets. */
  build: path('M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16'),
  /** Support: a lifebuoy. */
  support: path('M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20zM12 8a4 4 0 1 0 0 8 4 4 0 1 0 0-8zM4.9 4.9l4.3 4.3M14.8 14.8l4.3 4.3M14.8 9.2l4.3-4.3M4.9 19.1l4.3-4.3'),
  /** CRM: a contact card. */
  crm: path('M3 5h18v14H3zM9 9.5a2 2 0 1 0 0 4 2 2 0 1 0 0-4zM5.5 17c.6-1.7 1.9-2.6 3.5-2.6s2.9.9 3.5 2.6M15 10h4M15 13.5h3'),
  /** Team alert: a notification bell. */
  alert: path('M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0'),
} satisfies Record<string, NodeIcon>;
