/**
 * Content Types for CMS Integration
 * 
 * These TypeScript interfaces define the structure of all content
 * that can be managed through a CMS. When integrating with your CMS,
 * ensure the API responses match these types.
 */

// ============================================
// SITE-WIDE CONTENT TYPES
// ============================================

export interface SiteMetadata {
  siteName: string;
  siteDescription: string;
  siteUrl?: string;
  favicon?: string;
  ogImage?: string;
}

export interface NavigationLink {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface NavigationContent {
  logoText: string;
  logoImage?: string;
  links: NavigationLink[];
  ctaButton: {
    label: string;
    href: string;
  };
}

// ============================================
// HERO SECTION
// ============================================

export interface HeroContent {
  tag: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  primaryButton: {
    label: string;
    href: string;
  };
  secondaryButton: {
    label: string;
    href: string;
  };
  codeSnippet?: {
    lines: Array<{
      property: string;
      value: string;
    }>;
  };
}

// ============================================
// SERVICES SECTION
// ============================================

export type ServiceIconType = 
  | 'code' 
  | 'smartphone' 
  | 'cloud' 
  | 'database' 
  | 'palette' 
  | 'shield'
  | 'custom';

export interface Service {
  id: string;
  iconType: ServiceIconType;
  customIconSvg?: string; // For custom SVG icons from CMS
  title: string;
  description: string;
  order: number;
}

export interface ServicesContent {
  sectionTag: string;
  sectionTitle: string;
  sectionSubtitle: string;
  services: Service[];
}

// ============================================
// PROJECTS SECTION
// ============================================

export interface ProjectImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  shortDescription?: string;
  image?: ProjectImage;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  publishedAt?: string;
}

export interface ProjectsContent {
  sectionTag: string;
  sectionTitle: string;
  sectionSubtitle: string;
  projects: Project[];
  placeholderText?: string;
}

// ============================================
// CONTACT SECTION
// ============================================

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'phone';
  placeholder: string;
  required: boolean;
  options?: string[]; // For select fields
  rows?: number; // For textarea
}

export interface ContactContent {
  sectionTag: string;
  sectionTitle: string;
  sectionSubtitle: string;
  formFields: FormField[];
  submitButton: {
    label: string;
  };
  successMessage: string;
  errorMessage: string;
}

// ============================================
// FOOTER SECTION
// ============================================

export interface SocialLink {
  id: string;
  platform: 'github' | 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'youtube' | 'other';
  url: string;
  label: string;
}

export interface FooterContent {
  brandName: string;
  tagline: string;
  links: NavigationLink[];
  socialLinks?: SocialLink[];
  copyrightText: string;
}

// ============================================
// INQUIRY/CONTACT SUBMISSION
// ============================================

export interface InquirySubmission {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
  status?: 'new' | 'read' | 'replied' | 'archived';
}

// ============================================
// COMPLETE SITE CONTENT
// ============================================

export interface SiteContent {
  metadata: SiteMetadata;
  navigation: NavigationContent;
  hero: HeroContent;
  services: ServicesContent;
  projects: ProjectsContent;
  contact: ContactContent;
  footer: FooterContent;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}
