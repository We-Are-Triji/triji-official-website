/**
 * Content Hooks
 * 
 * Custom React hooks for fetching and managing CMS content.
 * These hooks provide a clean interface for components to access content
 * with loading states and error handling.
 */

import { useState, useEffect, useCallback } from 'react';
import type {
  SiteContent,
  NavigationContent,
  HeroContent,
  ServicesContent,
  ProjectsContent,
  ContactContent,
  FooterContent,
  Project,
  Service,
} from '../types/content';
import { contentService } from '../services/contentService';

// ============================================
// GENERIC CONTENT HOOK
// ============================================

interface UseContentResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

function useContent<T>(
  fetchFn: () => Promise<T>,
  deps: unknown[] = []
): UseContentResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch content');
    } finally {
      setLoading(false);
    }
  }, [fetchFn, ...deps]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// ============================================
// SPECIFIC CONTENT HOOKS
// ============================================

/**
 * Hook to fetch all site content
 */
export function useSiteContent(): UseContentResult<SiteContent> {
  return useContent(() => contentService.getSiteContent());
}

/**
 * Hook to fetch navigation content
 */
export function useNavigation(): UseContentResult<NavigationContent> {
  return useContent(() => contentService.getNavigation());
}

/**
 * Hook to fetch hero content
 */
export function useHeroContent(): UseContentResult<HeroContent> {
  return useContent(() => contentService.getHeroContent());
}

/**
 * Hook to fetch services section content
 */
export function useServicesContent(): UseContentResult<ServicesContent> {
  return useContent(() => contentService.getServicesContent());
}

/**
 * Hook to fetch all services
 */
export function useServices(): UseContentResult<Service[]> {
  return useContent(() => contentService.getServices());
}

/**
 * Hook to fetch a single service by ID
 */
export function useService(id: string): UseContentResult<Service | null> {
  return useContent(() => contentService.getServiceById(id), [id]);
}

/**
 * Hook to fetch projects section content
 */
export function useProjectsContent(): UseContentResult<ProjectsContent> {
  return useContent(() => contentService.getProjectsContent());
}

/**
 * Hook to fetch all projects
 */
export function useProjects(): UseContentResult<Project[]> {
  return useContent(() => contentService.getProjects());
}

/**
 * Hook to fetch featured projects
 */
export function useFeaturedProjects(): UseContentResult<Project[]> {
  return useContent(() => contentService.getFeaturedProjects());
}

/**
 * Hook to fetch a single project by slug
 */
export function useProject(slug: string): UseContentResult<Project | null> {
  return useContent(() => contentService.getProjectBySlug(slug), [slug]);
}

/**
 * Hook to fetch contact section content
 */
export function useContactContent(): UseContentResult<ContactContent> {
  return useContent(() => contentService.getContactContent());
}

/**
 * Hook to fetch footer content
 */
export function useFooterContent(): UseContentResult<FooterContent> {
  return useContent(() => contentService.getFooterContent());
}

// ============================================
// INQUIRY SUBMISSION HOOK
// ============================================

interface UseInquirySubmitResult {
  submit: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

export function useInquirySubmit(): UseInquirySubmitResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await contentService.submitInquiry(data);
      if (result.success) {
        setSuccess(true);
        return true;
      } else {
        setError(result.error || 'Failed to submit inquiry');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit inquiry');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return { submit, loading, error, success, reset };
}
