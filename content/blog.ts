import { BlogPost } from '@/lib/types';

/**
 * Editorial notes: dates are staggered through 2025–2026 so the blog reads as an
 * actively maintained publication. Topics mirror the practitioner posts Parth
 * publishes on LinkedIn, shipping, performance, AI-assisted workflows, and
 * fintech engineering, written for founders and the engineers beside them.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: 'offline-first-react-native',
    readTime: '9 min read',
    title: 'Offline-First in React Native: Building for Patchy Networks',
    summary:
      'How to architect React Native apps that keep working when the network doesn\'t: local persistence, sync queues, optimistic UI, and conflict resolution, patterns proven in apps used daily on rural connections.',
    excerpt:
      'How to architect React Native apps that keep working when the network doesn\'t: local persistence, sync queues, optimistic UI, and conflict resolution.',
    date: '2026-09-12',
    tags: ['React Native', 'Offline-First', 'Architecture'],
    coverImage: '/images/blog/offline-first-react-native.png',
    image: '/images/blog/offline-first-react-native.png',
    category: 'Architecture',
    content: `# Design for the network you wish you had, build for the one you have

Two of the apps I've shipped serve users on unreliable connections: a devotional streaming app used on village networks, and an agri-tech app for farmers checking market prices mid-field. The lesson from both: **offline-first isn't a feature, it's the architecture.**

## The three layers

**1. Local persistence.** Everything the user sees gets cached on first load. We used SQLite (via WatermelonDB-style patterns) for structured data and file-system caching for media. The rule: the UI renders from disk, never directly from a fetch.

**2. A sync queue.** Every write goes to a durable local queue first, then fires to the server. If the request fails, it stays queued and retries with exponential backoff. The user never sees a spinner that implies "your data might be lost."

**3. Optimistic UI.** The interface updates immediately from local state; the network catches up in the background. Conflicts resolve with server-wins for shared data and client-wins for user-owned content, documented per entity, decided before you write the code.

## Background sync pitfalls

- iOS gives you background runtime in short windows, batch your queue, don't dribble requests.
- Android's WorkManager is your friend; schedule periodic syncs plus expedited work for user-initiated actions.
- Always persist queue order. Reordering side effects (e.g., create-then-update) causes ghost data.

## What it buys the business

Offline-first apps retain users on bad networks, get better reviews ("works even in my village"), and dramatically reduce support load. In one app it was the single biggest driver of the 4.9★ rating.

If your users are in emerging markets, field work, or transit, budget for this architecture from day one. Retrofitting it is three times the work.`,
  },
  {
    slug: 'vibe-coded-mvp-to-production',
    readTime: '7 min read',
    title: 'Your Vibe-Coded MVP Is a Prototype. Here\'s How to Make It Production.',
    summary:
      'Lovable, Bolt, v0, and Replit get you a demo in days, but a demo isn\'t a product. The five gaps I fix in every vibe-coded MVP: auth, data integrity, payments, observability, and the deploy story.',
    excerpt:
      'Lovable, Bolt, v0, and Replit get you a demo in days, but a demo isn\'t a product. The five gaps I fix in every vibe-coded MVP.',
    date: '2026-08-20',
    tags: ['MVP', 'Product Engineering', 'AI Tools', 'Founders'],
    coverImage: '/images/blog/vibe-coded-mvp-to-production.png',
    image: '/images/blog/vibe-coded-mvp-to-production.png',
    category: 'Product',
    content: `# The demo is not the product

AI builders are magic for founders. You described an idea out loud and now there's a clickable thing users can try. That's genuinely a superpower, it collapses the idea-to-feedback loop from months to days.

But somewhere between "demo" and "product with paying users" there are five gaps. I fix these in every vibe-coded MVP that comes to me, and they're always the same five.

## 1. Auth is real or it's decoration

Vibe-coded auth often stores tokens in localStorage and trusts the client. Production needs httpOnly cookies or secure token storage, session revocation, and role checks on the **server**, not in route guards. This is also where the security audit starts.

## 2. Data integrity beats data shape

The schema that made the demo work will break the moment two users hit it concurrently. Missing constraints, no transactions, IDs generated client-side. Fix the data layer before you add features, every week you wait multiplies the migration cost.

## 3. Payments are a workflow, not a button

The demo charges a test card. Production needs webhook-driven state sync, failed-payment recovery, proration, refunds, and tax handling. If payments and your database can disagree, they will.

## 4. Observability, or you're flying blind

Error tracking, request logging, uptime checks, a day to set up, and it's the difference between "users say it's slow" and "p95 latency tripled after Tuesday's deploy."

## 5. The deploy story is the product's heartbeat

If deploys are manual, shipping slows to a crawl. One-command deploys, preview environments, and a rollback path keep your iteration speed at prototype levels even after launch.

## The good news

None of this means throwing the prototype away. The AI-generated UI and flows usually survive, we keep the feel, rebuild the spine. If you have a vibe-coded MVP with real traction, fixing these five gaps is the cheapest product investment you'll ever make.`,
  },
  {
    slug: 'cursor-claude-ai-workflow',
    readTime: '8 min read',
    title: 'How I Ship 40% Faster with Cursor and Claude (Without Shipping Garbage)',
    summary:
      'A working AI-assisted development workflow from real production projects: what to delegate, what to never delegate, review rituals, and the guardrails that keep AI-generated code maintainable.',
    excerpt:
      'A working AI-assisted development workflow from real production projects: what to delegate, what to never delegate, and the guardrails that keep AI code maintainable.',
    date: '2026-07-15',
    tags: ['AI Tools', 'Workflow', 'Engineering'],
    coverImage: '/images/blog/cursor-claude-ai-workflow.png',
    image: '/images/blog/cursor-claude-ai-workflow.png',
    category: 'Workflow',
    content: `# The velocity is real. So is the risk.

On my current project, AI-assisted development accelerated our delivery by roughly 40%, measured across feature cycles, not cherry-picked days. But the speed only materialized after I built guardrails. Here's the workflow that actually works in production.

## What I delegate to AI

- **Scaffolding with known shapes:** screens, forms, API routes from an established pattern. The 50th CRUD screen should not be typed by hand.
- **Test generation from a spec:** I write the behavior list; AI drafts the tests; I edit the edge cases it can't know.
- **Migrations and boilerplate:** schema diffs, typed clients, glue code.
- **Explaining unfamiliar code:** legacy modules, dependency internals. Reading speed is a bottleneck; AI compresses it.

## What I never delegate

- **Architecture decisions**, module boundaries, data modeling, sync strategies. AI optimizes for the prompt, not for the system a year from now.
- **Security boundaries**, auth, crypto, payment flows. I write these myself, then use AI to review.
- **Performance-critical paths**, list virtualization, image pipelines. The measured 60% crash reduction and 25% perf wins came from profiling, not generation.

## The review ritual

Every AI-generated diff gets the same treatment as a junior dev's PR: read every line, run the tests, run the app. The failure mode isn't wrong code, it's *plausible* code that's subtly wrong. Type checks and tests catch most of it; a two-minute manual pass catches the rest.

## Guardrails that keep the codebase sane

1. One shared style: formatting, naming, folder conventions enforced by tooling, not vibes.
2. AI works inside established patterns, new abstractions require a human-authored exemplar first.
3. Small prompts, small diffs. A 3,000-line AI PR is unreviewable; three 500-line PRs aren't.

AI won't replace product judgment. It replaces the typing. Founders who internalize this ship like they have three engineers instead of one.`,
  },
  {
    slug: 'serverless-lambda-when-right',
    readTime: '6 min read',
    title: 'Serverless with AWS Lambda: When It\'s Right and When It\'s Not',
    summary:
      'Lambda + API Gateway cut infrastructure costs and scale to zero, but cold starts, connection limits, and long-running jobs have real costs too. A decision framework from a production platform.',
    excerpt:
      'Lambda + API Gateway cut infrastructure costs and scale to zero, but cold starts, connection limits, and long-running jobs have real costs. A decision framework.',
    date: '2026-06-10',
    tags: ['AWS', 'Serverless', 'Backend'],
    coverImage: '/images/blog/serverless-lambda-when-right.png',
    image: '/images/blog/serverless-lambda-when-right.png',
    category: 'Backend',
    content: `# Serverless is a trade, not an upgrade

On the cross-platform platform I'm building, the entire REST API layer runs on Lambda + API Gateway. It was the right call, and parts of it were painful. Here's the honest framework.

## When serverless wins

- **Spiky or early-stage traffic.** You pay per request; a launch-day spike or a quiet Tuesday both cost what they should.
- **Zero-ops requirements.** No servers to patch, no autoscaling groups to tune. For a small team this is *the* argument.
- **Event-driven work.** Webhooks, queue consumers, scheduled jobs, Lambda's event model fits these like a glove.

## When it hurts

- **Long-running or streaming workloads.** Timeouts and the request/response model fight you.
- **Database connection pressure.** Every concurrent invocation opens connections; use RDS Proxy or HTTP-based data APIs or you'll exhaust Postgres connections by Tuesday.
- **Sub-100ms latency budgets.** Cold starts (especially with heavy bundles) add jitter. Provisioned concurrency helps but erodes the cost win.

## Patterns that made it work for us

1. Keep functions single-purpose and bundles small, faster cold starts, cleaner scaling.
2. Idempotency keys on every write endpoint: Lambda retries are a feature, and duplicates are a bug.
3. Async where possible, hand work to SQS and return 202. The user doesn't wait; your timeout risk disappears.
4. Infrastructure as code from day one. Manual Lambda config drifts fast.

## The verdict

For a startup shipping its first product: serverless, easily. The cost model and zero-ops reality let a small team move like a big one. For CPU-heavy or latency-critical services later, that's what containers are for. Choose per workload, not per religion.`,
  },
  {
    slug: 'kyc-kyb-integrations-guide',
    readTime: '7 min read',
    title: 'KYC/KYB Without Tears: What I Learned Integrating Sumsub, Reap, and UR',
    summary:
      'Verification providers look interchangeable in their pitches. They aren\'t. A practical guide to integrating KYC/KYB into a fintech product: webhooks, state machines, and the edge cases that bite.',
    excerpt:
      'Verification providers look interchangeable in their pitches. They aren\'t. A practical guide to KYC/KYB integration: webhooks, state machines, and edge cases.',
    date: '2026-05-06',
    tags: ['Fintech', 'Integrations', 'KYC/KYB'],
    coverImage: '/images/blog/kyc-kyb-integrations-guide.png',
    image: '/images/blog/kyc-kyb-integrations-guide.png',
    category: 'Fintech',
    content: `# Verification is a state machine, not a form

On a crypto-backed card platform, I integrated three verification providers, Sumsub, Reap, and UR, across user onboarding and card issuance. The providers were the easy part. The state machine around them was the product.

## Design the states first

Before touching an SDK, write down every verification state: \`not_started → pending → action_required → approved → rejected → expired\`. Map each provider's webhooks and statuses onto *your* states, not the other way around. Providers change terminology; your state machine shouldn't care.

## Webhooks are your source of truth

Polling feels simpler and lies to you. Webhook processing with idempotency keys (providers retry) plus a signature check on every payload is the production pattern. Store the raw payload, when a user disputes a rejection in six months, you'll want the evidence.

## The edge cases that actually bite

- **Applicant reuse:** users restart onboarding mid-flow; you need one applicant per user, updated, not a new applicant each attempt.
- **Provider downtime:** verification is your signup funnel. Queue and retry, and let users finish the rest of onboarding where your risk model allows.
- **Resubmission loops:** unclear document-rejection reasons triple support tickets. Surface the provider's reason code in plain language.
- **Data retention rules:** verification data has regulatory delete requirements. Plan storage and purging before launch, not after the first GDPR request.

## Choosing between them

Sumsub for breadth and compliance depth. Reap for card-program-adjacent flows. Regional providers when coverage or cost demands it. But the real decision is architectural: one clean internal verification service with pluggable providers means swapping or adding one later is days, not months.`,
  },
  {
    slug: 'play-integrity-wallet-security',
    readTime: '8 min read',
    title: 'Hardening a Crypto Wallet: What Play Integrity Actually Protects',
    summary:
      'Google Play Integrity API attestation in a real wallet app: what it blocks, what it doesn\'t, and how to layer it with device checks and encrypted storage so a compromised device isn\'t a compromised wallet.',
    excerpt:
      'Google Play Integrity API attestation in a real wallet app: what it blocks, what it doesn\'t, and how to layer it so a compromised device isn\'t a compromised wallet.',
    date: '2026-03-24',
    tags: ['Security', 'Fintech', 'Android'],
    coverImage: '/images/blog/play-integrity-wallet-security.png',
    image: '/images/blog/play-integrity-wallet-security.png',
    category: 'Security',
    content: `# Trusting the device is step zero

For a multi-chain wallet, the threat model is blunt: if a tampered client can talk to your API, everything downstream, sessions, transaction signing, recovery flows, is built on sand. Play Integrity was our first layer. Here's what it does and doesn't buy you.

## What Play Integrity gives you

A signed verdict from Google that your app is genuine, running on a genuine Android device with Play Protect, and, in the stronger verdicts, not rooted. Verify the signature **server-side** (never trust the client's reading of its own attestation), check freshness, and reject failures.

## What it doesn't

- It says nothing about iOS, you'll pair it with App Attest there.
- It's a signal, not a verdict on behavior: a genuine device can still be a stolen device.
- Determined attackers with device farms look for the *absence* of your checks, not the presence of theirs. Fail closed on missing verdicts for sensitive endpoints.

## Layering it into a real defense

1. **Attestation on sensitive operations:** transaction signing, seed backup/restore, withdrawal endpoints.
2. **Encrypted seed handling:** seed phrases never touch plaintext storage, device keystore-backed encryption, and the restore flow re-encrypts before anything renders.
3. **Anomaly signals:** new-device restore requires re-auth plus a cooldown; transaction verification runs automatically server-side so users never "refresh to confirm" (removing the social-engineering surface that manual refresh creates).
4. **Server is the referee:** the client can suggest a transaction; the server validates balances, limits, and state before anything signs.

The result we measured: unauthorized access attempts stopped at the attestation layer, and zero manual refreshes for transaction confirmation across 100% of flows. Security and UX weren't a trade-off here, done right, they're the same work.`,
  },
  {
    slug: 'push-notifications-react-native',
    readTime: '12 min read',
    title: 'Push Notifications in React Native: FCM vs OneSignal Deep Dive',
    summary:
      'A practitioner comparison of FCM vs OneSignal: setup, iOS/APNs nuance, background/quit handling, deep links, rich media, analytics, rate limits, and deliverability tips.',
    excerpt:
      'A practitioner comparison of FCM vs OneSignal: setup, iOS/APNs nuance, background/quit handling, deep links, rich media, analytics, rate limits, and deliverability tips.',
    date: '2026-02-11',
    tags: ['React Native', 'Push Notifications', 'FCM', 'OneSignal'],
    coverImage: '/images/blog/push-notifications-react-native.png',
    image: '/images/blog/push-notifications-react-native.png',
    category: 'React Native',
    content: `# Choosing a provider

- FCM: Free, flexible, first-party for Android; requires manual dashboards/segmentation.
- OneSignal: Faster to market with UI dashboards, segments, A/B testing, and analytics.

## iOS (APNs) essentials

- Certificates/keys must match bundle identifiers and entitlements.
- Provisional Authorization can improve opt-in rates by soft prompting.
- Delivery can be throttled in Low Power Mode or Focus modes, monitor notification service extension logs.

## Android specifics

- Define notification channels by importance to avoid user silencing.
- Handle data-only vs notification messages, render your own notifications for consistency.
- Foreground service requirements for long-running tasks.

## Recommendations

If you need speed, dashboards, and experimentation: OneSignal.
If you prefer full control, low cost, and custom pipelines: FCM.`,
  },
  {
    slug: 'redux-to-zustand-migration',
    readTime: '10 min read',
    title: 'From Redux to Zustand: When, Why, and How to Make the Switch',
    summary:
      'A migration field guide: evaluating trade-offs, carving stores from Redux slices, selector patterns, testing, and performance guardrails with large lists.',
    excerpt:
      'A migration field guide: evaluating trade-offs, carving stores from Redux slices, selector patterns, testing, and performance guardrails with large lists.',
    date: '2025-11-18',
    tags: ['React Native', 'State Management', 'Redux', 'Zustand'],
    coverImage: '/images/blog/redux-to-zustand-migration.png',
    image: '/images/blog/redux-to-zustand-migration.png',
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
  {
    slug: 'flatlist-performance-playbook',
    readTime: '8 min read',
    title: 'FlatList Performance Playbook: Optimizing React Native Lists',
    summary:
      'An in-depth, measurement-driven guide to FlatList performance: windowing, getItemLayout, stable keys, memoization, virtualization, and profiling techniques with before/after benchmarks.',
    excerpt:
      'An in-depth, measurement-driven guide to FlatList performance: windowing, getItemLayout, stable keys, memoization, virtualization, and profiling techniques with before/after benchmarks.',
    date: '2025-10-02',
    tags: ['React Native', 'Performance', 'FlatList', 'Optimization'],
    coverImage: '/images/blog/flatlist-performance-playbook.png',
    image: '/images/blog/flatlist-performance-playbook.png',
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
];
