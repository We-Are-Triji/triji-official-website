/**
 * Content Service
 * 
 * This service handles all content fetching operations.
 * Currently returns default content, but can be easily modified
 * to fetch from a CMS API.
 * 
 * CMS Integration Guide:
 * 1. Replace the fetch functions with actual API calls
 * 2. Update the CMS_CONFIG with your CMS endpoint
 * 3. Handle authentication if required
 * 4. Add caching logic as needed
 */

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
  InquirySubmission,
  ApiResponse,
  PaginatedResponse,
} from '../types/content';

import {
  defaultSiteContent,
  defaultNavigation,
  defaultHero,
  defaultServices,
  defaultProjects,
  defaultContact,
  defaultFooter,
} from '../content/defaultContent';

// ============================================
// CMS CONFIGURATION
// ============================================

interface CMSConfig {
  baseUrl: string;
  enabled: boolean;
}

// Configure your CMS settings here
// NOTE: API keys should NEVER be stored in frontend code.
// Authentication should be handled via:
// 1. Backend proxy that adds credentials server-side
// 2. HTTP-only cookies for session-based auth
// 3. Public endpoints that don't require authentication
const CMS_CONFIG: CMSConfig = {
  baseUrl: import.meta.env.VITE_CMS_API_URL || '',
  enabled: import.meta.env.VITE_CMS_ENABLED === 'true',
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Generic fetch wrapper with error handling
 * Uses credentials: 'include' for cookie-based auth instead of API keys
 */
async function fetchFromCMS<T>(endpoint: string): Promise<T | null> {
  if (!CMS_CONFIG.enabled || !CMS_CONFIG.baseUrl) {
    return null;
  }

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${CMS_CONFIG.baseUrl}${endpoint}`, {
      headers,
      credentials: 'include', // Use cookies for authentication
    });

    if (!response.ok) {
      console.error(`CMS fetch error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('CMS fetch failed:', error);
    return null;
  }
}

/**
 * POST request wrapper for CMS
 * Uses credentials: 'include' for cookie-based auth instead of API keys
 */
async function postToCMS<T, R>(endpoint: string, data: T): Promise<ApiResponse<R>> {
  if (!CMS_CONFIG.enabled || !CMS_CONFIG.baseUrl) {
    // Return success for local development
    return {
      success: true,
      data: data as unknown as R,
      message: 'Submitted successfully (local mode)',
    };
  }

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${CMS_CONFIG.baseUrl}${endpoint}`, {
      method: 'POST',
      headers,
      credentials: 'include', // Use cookies for authentication
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: null as unknown as R,
        error: result.message || 'Submission failed',
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('CMS POST failed:', error);
    return {
      success: false,
      data: null as unknown as R,
      error: 'Network error. Please try again.',
    };
  }
}

// ============================================
// CONTENT FETCHING FUNCTIONS
// ============================================

/**
 * Fetch all site content
 */
export async function getSiteContent(): Promise<SiteContent> {
  const cmsContent = await fetchFromCMS<SiteContent>('/api/content/site');
  return cmsContent || defaultSiteContent;
}

/**
 * Fetch navigation content
 */
export async function getNavigation(): Promise<NavigationContent> {
  const cmsContent = await fetchFromCMS<NavigationContent>('/api/content/navigation');
  return cmsContent || defaultNavigation;
}

/**
 * Fetch hero section content
 */
export async function getHeroContent(): Promise<HeroContent> {
  const cmsContent = await fetchFromCMS<HeroContent>('/api/content/hero');
  return cmsContent || defaultHero;
}

/**
 * Fetch services section content
 */
export async function getServicesContent(): Promise<ServicesContent> {
  const cmsContent = await fetchFromCMS<ServicesContent>('/api/content/services');
  return cmsContent || defaultServices;
}

/**
 * Fetch all services
 */
export async function getServices(): Promise<Service[]> {
  const cmsContent = await fetchFromCMS<Service[]>('/api/services');
  return cmsContent || defaultServices.services;
}

/**
 * Fetch a single service by ID
 */
export async function getServiceById(id: string): Promise<Service | null> {
  const cmsContent = await fetchFromCMS<Service>(`/api/services/${id}`);
  if (cmsContent) return cmsContent;
  
  return defaultServices.services.find(s => s.id === id) || null;
}

/**
 * Fetch projects section content
 */
export async function getProjectsContent(): Promise<ProjectsContent> {
  const cmsContent = await fetchFromCMS<ProjectsContent>('/api/content/projects');
  return cmsContent || defaultProjects;
}

/**
 * Fetch all projects
 */
export async function getProjects(): Promise<Project[]> {
  const cmsContent = await fetchFromCMS<Project[]>('/api/projects');
  return cmsContent || defaultProjects.projects;
}

/**
 * Fetch featured projects
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const cmsContent = await fetchFromCMS<Project[]>('/api/projects?featured=true');
  if (cmsContent) return cmsContent;
  
  return defaultProjects.projects.filter(p => p.featured);
}

/**
 * Fetch a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const cmsContent = await fetchFromCMS<Project>(`/api/projects/${slug}`);
  if (cmsContent) return cmsContent;
  
  return defaultProjects.projects.find(p => p.slug === slug) || null;
}

/**
 * Fetch projects with pagination
 */
export async function getProjectsPaginated(
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedResponse<Project>> {
  const cmsContent = await fetchFromCMS<PaginatedResponse<Project>>(
    `/api/projects?page=${page}&pageSize=${pageSize}`
  );
  
  if (cmsContent) return cmsContent;
  
  // Return default projects with fake pagination
  const projects = defaultProjects.projects;
  return {
    data: projects,
    pagination: {
      page: 1,
      pageSize: projects.length,
      totalItems: projects.length,
      totalPages: 1,
    },
  };
}

/**
 * Fetch contact section content
 */
export async function getContactContent(): Promise<ContactContent> {
  const cmsContent = await fetchFromCMS<ContactContent>('/api/content/contact');
  return cmsContent || defaultContact;
}

/**
 * Fetch footer content
 */
export async function getFooterContent(): Promise<FooterContent> {
  const cmsContent = await fetchFromCMS<FooterContent>('/api/content/footer');
  return cmsContent || defaultFooter;
}

// ============================================
// INQUIRY SUBMISSION
// ============================================

/**
 * Submit a contact inquiry
 */
export async function submitInquiry(
  inquiry: Omit<InquirySubmission, 'id' | 'createdAt' | 'status'>
): Promise<ApiResponse<InquirySubmission>> {
  return postToCMS<typeof inquiry, InquirySubmission>('/api/inquiries', inquiry);
}

// ============================================
// CONTENT SERVICE OBJECT
// ============================================

export const contentService = {
  // Site content
  getSiteContent,
  getNavigation,
  getHeroContent,
  getServicesContent,
  getProjectsContent,
  getContactContent,
  getFooterContent,
  
  // Services
  getServices,
  getServiceById,
  
  // Projects
  getProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getProjectsPaginated,
  
  // Inquiries
  submitInquiry,
};

export default contentService;
