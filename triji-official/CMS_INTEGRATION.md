# Triji Portfolio - CMS Integration Guide

This document explains how to integrate a Content Management System (CMS) with the Triji portfolio website.

## Architecture Overview

The website is built with a CMS-ready architecture that separates content from presentation:

```
src/
├── types/
│   └── content.ts          # TypeScript interfaces for all content types
├── content/
│   └── defaultContent.ts   # Default/fallback content data
├── services/
│   └── contentService.ts   # API layer for fetching content
├── hooks/
│   └── useContent.ts       # React hooks for content fetching
├── context/
│   └── ContentContext.tsx  # React context for site-wide content
└── components/
    ├── icons/
    │   └── ServiceIcons.tsx
    └── sections/
        ├── Navbar.tsx
        ├── Hero.tsx
        ├── Services.tsx
        ├── Projects.tsx
        ├── Contact.tsx
        └── Footer.tsx
```

## Content Types

All content types are defined in `src/types/content.ts`:

- **SiteMetadata** - Site title, description, SEO data
- **NavigationContent** - Logo, nav links, CTA button
- **HeroContent** - Hero section text, buttons, code snippet
- **ServicesContent** - Services section with individual services
- **ProjectsContent** - Projects section with project items
- **ContactContent** - Contact form configuration
- **FooterContent** - Footer links, social links, copyright

## Integrating Your CMS

### Step 1: Environment Configuration

Copy `.env.example` to `.env` and configure:

```env
VITE_CMS_ENABLED=true
VITE_CMS_API_URL=https://your-cms-api.com
VITE_CMS_API_KEY=your-api-key
```

### Step 2: Modify Content Service

Edit `src/services/contentService.ts` to match your CMS API structure.

#### Example: Strapi Integration

```typescript
// In contentService.ts
export async function getHeroContent(): Promise<HeroContent> {
  const response = await fetch(`${CMS_CONFIG.baseUrl}/api/hero?populate=*`, {
    headers: {
      Authorization: `Bearer ${CMS_CONFIG.apiKey}`,
    },
  });
  
  const { data } = await response.json();
  
  // Transform Strapi response to match HeroContent type
  return {
    tag: data.attributes.tag,
    title: data.attributes.title,
    titleHighlight: data.attributes.titleHighlight,
    subtitle: data.attributes.subtitle,
    primaryButton: {
      label: data.attributes.primaryButtonLabel,
      href: data.attributes.primaryButtonHref,
    },
    secondaryButton: {
      label: data.attributes.secondaryButtonLabel,
      href: data.attributes.secondaryButtonHref,
    },
  };
}
```

#### Example: Contentful Integration

```typescript
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: process.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export async function getProjects(): Promise<Project[]> {
  const entries = await client.getEntries({
    content_type: 'project',
    order: 'fields.order',
  });
  
  return entries.items.map((item: any) => ({
    id: item.sys.id,
    slug: item.fields.slug,
    title: item.fields.title,
    category: item.fields.category,
    description: item.fields.description,
    image: item.fields.image ? {
      url: `https:${item.fields.image.fields.file.url}`,
      alt: item.fields.image.fields.title,
    } : undefined,
    featured: item.fields.featured,
    order: item.fields.order,
  }));
}
```

### Step 3: Inquiry Submission

The `submitInquiry` function in the content service handles form submissions:

```typescript
export async function submitInquiry(inquiry: InquirySubmission) {
  const response = await fetch(`${CMS_CONFIG.baseUrl}/api/inquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CMS_CONFIG.apiKey}`,
    },
    body: JSON.stringify(inquiry),
  });
  
  return response.json();
}
```

## API Endpoints Expected

When `VITE_CMS_ENABLED=true`, the content service expects these endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/content/site` | GET | All site content |
| `/api/content/navigation` | GET | Navigation content |
| `/api/content/hero` | GET | Hero section |
| `/api/content/services` | GET | Services section |
| `/api/content/projects` | GET | Projects section |
| `/api/content/contact` | GET | Contact section |
| `/api/content/footer` | GET | Footer content |
| `/api/services` | GET | All services |
| `/api/services/:id` | GET | Single service |
| `/api/projects` | GET | All projects |
| `/api/projects/:slug` | GET | Single project |
| `/api/inquiries` | POST | Submit inquiry |

## Using Content in Components

### Option 1: Content Context (Recommended)

```tsx
import { useContentContext } from './context/ContentContext';

function MyComponent() {
  const { content, loading, error } = useContentContext();
  
  if (loading) return <LoadingSpinner />;
  
  return <div>{content.hero.title}</div>;
}
```

### Option 2: Individual Hooks

```tsx
import { useHeroContent, useProjects } from './hooks/useContent';

function MyComponent() {
  const { data: hero, loading: heroLoading } = useHeroContent();
  const { data: projects, loading: projectsLoading } = useProjects();
  
  // ...
}
```

## Adding New Content Types

1. Define the type in `src/types/content.ts`
2. Add default content in `src/content/defaultContent.ts`
3. Add fetch function in `src/services/contentService.ts`
4. (Optional) Add hook in `src/hooks/useContent.ts`
5. Create/update component to use the new content

## Dynamic Icons

Services can use predefined icons or custom SVGs from the CMS:

```typescript
// Predefined icon types
type ServiceIconType = 'code' | 'smartphone' | 'cloud' | 'database' | 'palette' | 'shield' | 'custom';

// Using custom SVG from CMS
const service = {
  iconType: 'custom',
  customIconSvg: '<svg>...</svg>', // Raw SVG from CMS
};
```

## Caching Considerations

For production, consider adding caching to the content service:

```typescript
// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function cachedFetch<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  const data = await fetchFn();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}
```

## Testing Without CMS

The website works without a CMS by using default content. Set:

```env
VITE_CMS_ENABLED=false
```

This is useful for:
- Local development
- Fallback when CMS is unavailable
- Static site generation
