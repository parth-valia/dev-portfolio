import { BlogPost } from '@/lib/types';

export const blogPosts: BlogPost[] = [
  {
    slug: 'flatlist-performance-playbook',
    title: 'FlatList Performance Playbook: Optimizing React Native Lists',
    summary: 'An in-depth, measurement-driven guide to FlatList performance: windowing, getItemLayout, stable keys, memoization, virtualization, and profiling techniques with before/after benchmarks.',
    excerpt: 'An in-depth, measurement-driven guide to FlatList performance: windowing, getItemLayout, stable keys, memoization, virtualization, and profiling techniques with before/after benchmarks.',
    date: '2024-01-15',
    tags: ['React Native', 'Performance', 'FlatList', 'Optimization'],
    coverImage: '/images/blog/flatlist-performance.png',
    image: '/images/blog/flatlist-performance.png',
    readingTime: '8 min read',
    readTime: '8 min read',
    category: 'Performance',
    content: `# Why FlatList performance matters

Large lists are common in production apps (feeds, catalogs, chats). Poor list hygiene causes jank, input latency, and memory spikes. This guide documents a practical checklist, measured on mid-range Android devices and older iOS hardware.

## Baseline & methodology
- Enable Performance Monitor (FPS/JS) and sample interactions (scroll, tap, pull-to-refresh).
- Record Flamegraphs with Hermes profiling and Android Studio profiler.
- Capture memory snapshots before/after interactions.

## Virtualization & windowing
- Prefer windowSize = 5–9 for content-heavy rows; reduce for lightweight rows.
- Set initialNumToRender to the minimum to fill the viewport + 1 row.
- Use removeClippedSubviews on Android to lower memory pressure in long lists.

## Layout calculations
- Implement getItemLayout for constant-height rows to avoid expensive layout passes.
- For variable heights, precompute approximate heights or use sectioned virtualization.

## Stable keys & rendering purity
- Always provide a stable, unique keyExtractor.
- Memoize row components with React.memo and selector-based props.
- Replace inline lambdas/objects with useCallback / useMemo.

## Image & media considerations
- Use thumbnails (progressive loading), cache aggressively, and avoid layout shifts.
- Defer heavy media (video) offscreen; consider intersection observers where possible.

This playbook reduced jank in production apps with 10K+ item feeds, improving user retention and engagement metrics.`,
  },
  {
    slug: 'push-notifications-react-native',
    title: 'Push Notifications in React Native: FCM vs OneSignal Deep Dive',
    summary: 'A practitioner comparison of FCM vs OneSignal: setup, iOS/APNs nuance, background/quit handling, deep links, rich media, analytics, rate limits, and deliverability tips.',
    excerpt: 'A practitioner comparison of FCM vs OneSignal: setup, iOS/APNs nuance, background/quit handling, deep links, rich media, analytics, rate limits, and deliverability tips.',
    date: '2024-01-08',
    tags: ['React Native', 'Push Notifications', 'FCM', 'OneSignal'],
    coverImage: '/images/blog/push-notifications.png',
    image: '/images/blog/push-notifications.png',
    readingTime: '12 min read',
    readTime: '12 min read',
    category: 'React Native',
    content: `# Choosing a provider

- FCM Free, flexible, first-party for Android; requires manual dashboards/segmentation.
- OneSignal: Faster to market with UI dashboards, segments, A/B testing, and analytics.

## iOS (APNs) essentials
- Certificates/keys must match bundle identifiers and entitlements.
- Provisional Authorization can improve opt-in rates by soft prompting.
- Delivery can be throttled in Low Power Mode or Focus modes—monitor notification service extension logs.

## Android specifics
- Define notification channels by importance to avoid user silencing.
- Handle data-only vs notification messages—render your own notifications for consistency.
- Foreground service requirements for long-running tasks.

## Recommendations
If you need speed, dashboards, and experimentation: OneSignal.
If you prefer full control, low cost, and custom pipelines: FCM.`,
  },
  {
    slug: 'redux-to-zustand-migration',
    title: 'From Redux to Zustand: When, Why, and How to Make the Switch',
    summary: 'A migration field guide: evaluating trade-offs, carving stores from Redux slices, selector patterns, testing, and performance guardrails with large lists.',
    excerpt: 'A migration field guide: evaluating trade-offs, carving stores from Redux slices, selector patterns, testing, and performance guardrails with large lists.',
    date: '2023-12-28',
    tags: ['React Native', 'State Management', 'Redux', 'Zustand'],
    coverImage: '/images/blog/redux-zustand.png',
    image: '/images/blog/redux-zustand.png',
    readingTime: '10 min read',
    readTime: '10 min read',
    category: 'State Management',
    content: `# Trade-offs at a glance

- Redux: Excellent devtools, middleware ecosystem, predictable reducers. Best for complex workflows, team governance.
- Zustand: Minimal boilerplate, direct set/get, small focused stores. Great for UI/local state and feature isolation.

## Migration strategy
1. Identify Redux slices that map to cohesive features.
2. Create small Zustand stores that expose minimal, intention-revealing actions.
3. Replace connected components gradually with selector-based hooks.
4. Remove dead reducers/middleware as features complete.

## Outcomes
- Reduced boilerplate by ~40% in UI stores.
- Improved perceived responsiveness in list-heavy screens.
- Clearer ownership boundaries per feature team.`,
  },
];

export type BlogPosts = typeof blogPosts;
