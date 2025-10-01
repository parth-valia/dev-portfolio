# Parth Valia Portfolio

A modern, fully-featured developer portfolio built with Next.js 14, TypeScript, and Tailwind CSS. Features beautiful animations, responsive design, and optimized performance.

## 🚀 Features

- **Modern Next.js 14** with App Router and Server Components
- **TypeScript** for type safety and better DX
- **Tailwind CSS** + **shadcn/ui** for beautiful, consistent UI
- **Framer Motion** for smooth animations and micro-interactions
- **MDX Blog** with syntax highlighting and reading time
- **Contact Form** with server actions and validation
- **Dark/Light Theme** with system preference detection
- **Responsive Design** optimized for all devices
- **SEO Optimized** with metadata, OG images, and structured data
- **Accessibility First** with WCAG AA compliance
- **Performance Focused** with optimized images and lazy loading

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Content**: MDX for blog posts
- **Deployment**: Vercel (optimized)
- **Analytics**: Vercel Analytics

## 📁 Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── (routes)/        # Route groups
│   ├── api/             # API routes
│   └── globals.css      # Global styles
├── components/          # Reusable components
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # Layout components
│   └── sections/        # Page sections
├── content/             # Content data files
│   ├── projects.ts      # Project data
│   ├── experience.ts    # Experience data
│   ├── skills.ts        # Skills data
│   └── blog/           # MDX blog posts
├── lib/                # Utility functions
└── public/             # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/parth-valia/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in the required environment variables:
```env
# Optional - for contact form
RESEND_API_KEY=your_resend_api_key
TO_EMAIL=parthvalia2709@gmail.com

# Optional - for analytics  
NEXT_PUBLIC_GA_ID=your_ga_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Content Management

### Adding a New Project

1. Add project data to `content/projects.ts`:
```typescript
{
  slug: 'new-project',
  title: 'New Project',
  subtitle: 'Project description',
  // ... other fields
}
```

2. Add project images to `public/images/projects/`

### Adding a New Blog Post

1. Create a new MDX file in `content/blog/`:
```mdx
---
title: "Your Blog Post Title"
summary: "Brief summary of the post"
date: "2024-01-15"
tags: ["React Native", "Performance"]
coverImage: "/images/blog/your-post.jpg"
---

Your blog content here...
```

### Updating Experience/Skills

Edit the respective files in the `content/` directory:
- `experience.ts` - Work experience
- `skills.ts` - Technical skills with proficiency levels

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.ts` to customize the color scheme:
```typescript
theme: {
  extend: {
    colors: {
      // Customize primary colors
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
    },
  },
}
```

### Site Configuration  

Update `site.config.ts` with your information:
```typescript
export const siteConfig = {
  name: "Your Name",
  title: "Your Title",
  email: "your@email.com",
  // ... other config
};
```

## 📊 Performance

This portfolio is optimized for performance with:

- **Lighthouse Score**: 95+ across all categories
- **Image Optimization**: Next.js Image component with lazy loading
- **Bundle Optimization**: Code splitting and tree shaking
- **Caching**: Static generation where possible
- **Animations**: Reduced motion support for accessibility

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Manual Deployment

```bash
npm run build
npm run start
```

## 📈 Analytics & SEO

- **Vercel Analytics** for performance monitoring
- **Structured Data** (JSON-LD) for rich snippets
- **OpenGraph** and **Twitter Cards** for social sharing
- **Sitemap** and **Robots.txt** for search engines
- **Meta tags** optimized for each page

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Parth Valia** - React Native Developer
- Email: parthvalia2709@gmail.com
- Phone: +91 86682 98935
- GitHub: [@parth-valia](https://github.com/parth-valia)
- Location: Mumbai, India

---

Built with ❤️ using Next.js and deployed on Vercel.