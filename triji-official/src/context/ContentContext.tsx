/**
 * Content Context
 * 
 * React Context for providing site-wide content to all components.
 * This allows components to access CMS content without prop drilling.
 * 
 * Usage:
 * 1. Wrap your app with ContentProvider
 * 2. Use useContentContext() hook in any component to access content
 */

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { SiteContent } from '../types/content';
import { contentService } from '../services/contentService';
import { defaultSiteContent } from '../content/defaultContent';

// ============================================
// CONTEXT TYPES
// ============================================

interface ContentContextState {
  content: SiteContent;
  loading: boolean;
  error: string | null;
  refreshContent: () => Promise<void>;
}

// ============================================
// CONTEXT
// ============================================

const ContentContext = createContext<ContentContextState | undefined>(undefined);

// ============================================
// PROVIDER COMPONENT
// ============================================

interface ContentProviderProps {
  children: ReactNode;
  initialContent?: SiteContent;
}

export function ContentProvider({ children, initialContent }: ContentProviderProps) {
  const [content, setContent] = useState<SiteContent>(initialContent || defaultSiteContent);
  const [loading, setLoading] = useState(!initialContent);
  const [error, setError] = useState<string | null>(null);

  const refreshContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const newContent = await contentService.getSiteContent();
      setContent(newContent);
    } catch (err) {
      console.error('Failed to fetch content:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch content');
      // Keep existing content on error
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch content on mount if no initial content provided
  useEffect(() => {
    if (!initialContent) {
      refreshContent();
    }
  }, [initialContent, refreshContent]);

  const value: ContentContextState = {
    content,
    loading,
    error,
    refreshContent,
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
}

// ============================================
// HOOK
// ============================================

/**
 * Hook to access the content context
 */
export function useContentContext(): ContentContextState {
  const context = useContext(ContentContext);
  
  if (context === undefined) {
    throw new Error('useContentContext must be used within a ContentProvider');
  }
  
  return context;
}

/**
 * Hook to access specific content sections
 */
export function useNavigationContent() {
  const { content } = useContentContext();
  return content.navigation;
}

export function useHero() {
  const { content } = useContentContext();
  return content.hero;
}

export function useServicesSection() {
  const { content } = useContentContext();
  return content.services;
}

export function useProjectsSection() {
  const { content } = useContentContext();
  return content.projects;
}

export function useContactSection() {
  const { content } = useContentContext();
  return content.contact;
}

export function useFooter() {
  const { content } = useContentContext();
  return content.footer;
}

export function useSiteMetadata() {
  const { content } = useContentContext();
  return content.metadata;
}

export default ContentContext;
