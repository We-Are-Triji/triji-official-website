/**
 * Default Content Data
 * 
 * This file contains the default/fallback content for the website.
 * When the CMS is integrated, this serves as fallback data in case
 * the CMS is unavailable or for static site generation.
 */

import type {
  SiteContent,
  SiteMetadata,
  NavigationContent,
  HeroContent,
  ServicesContent,
  ProjectsContent,
  ContactContent,
  FooterContent,
} from '../types/content';

// ============================================
// SITE METADATA
// ============================================

export const defaultMetadata: SiteMetadata = {
  siteName: 'Triji',
  siteDescription: 'Triji - Your trusted software solution partner. We build innovative digital solutions that drive business growth.',
  siteUrl: 'https://triji.dev',
  ogImage: '/og-image.png',
};

// ============================================
// NAVIGATION
// ============================================

export const defaultNavigation: NavigationContent = {
  logoText: 'Triji',
  links: [
    { id: 'nav-home', label: 'Home', href: '#home' },
    { id: 'nav-services', label: 'Services', href: '#services' },
    { id: 'nav-projects', label: 'Projects', href: '#projects' },
    { id: 'nav-contact', label: 'Contact', href: '#contact' },
  ],
  ctaButton: {
    label: 'Get in Touch',
    href: '#contact',
  },
};

// ============================================
// HERO SECTION
// ============================================

export const defaultHero: HeroContent = {
  tag: 'Software Solutions Group',
  title: 'Transforming Ideas Into',
  titleHighlight: ' Digital Reality',
  subtitle: 'We are Triji — a passionate team of developers, designers, and innovators dedicated to building software solutions that drive your business forward.',
  primaryButton: {
    label: 'Start Your Project',
    href: '#contact',
  },
  secondaryButton: {
    label: 'Explore Services',
    href: '#services',
  },
  codeSnippet: {
    lines: [
      { property: 'mission', value: 'Excellence' },
      { property: 'passion', value: 'Innovation' },
      { property: 'deliver', value: 'Solutions' },
    ],
  },
};

// ============================================
// SERVICES SECTION
// ============================================

export const defaultServices: ServicesContent = {
  sectionTag: 'What We Do',
  sectionTitle: 'Our Services',
  sectionSubtitle: 'Comprehensive software solutions tailored to meet your unique business needs',
  services: [
    {
      id: 'service-web',
      iconType: 'code',
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies like React, Vue, and Node.js for scalable and performant solutions.',
      order: 1,
    },
    {
      id: 'service-mobile',
      iconType: 'smartphone',
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile apps for iOS and Android that deliver seamless user experiences.',
      order: 2,
    },
    {
      id: 'service-cloud',
      iconType: 'cloud',
      title: 'Cloud Solutions',
      description: 'Cloud architecture, migration, and optimization services to maximize your infrastructure efficiency.',
      order: 3,
    },
    {
      id: 'service-backend',
      iconType: 'database',
      title: 'Backend Systems',
      description: 'Robust API development, database design, and server-side solutions that power your applications.',
      order: 4,
    },
    {
      id: 'service-design',
      iconType: 'palette',
      title: 'UI/UX Design',
      description: 'User-centered design that combines aesthetics with functionality for intuitive digital experiences.',
      order: 5,
    },
    {
      id: 'service-security',
      iconType: 'shield',
      title: 'Security & Support',
      description: 'Comprehensive security audits and ongoing maintenance to keep your systems protected and running smoothly.',
      order: 6,
    },
  ],
};

// ============================================
// PROJECTS SECTION
// ============================================

export const defaultProjects: ProjectsContent = {
  sectionTag: 'Our Work',
  sectionTitle: 'Project Showcase',
  sectionSubtitle: 'Explore our portfolio of successful projects and digital solutions',
  placeholderText: 'Coming Soon',
  projects: [
    {
      id: 'project-alpha',
      slug: 'project-alpha',
      title: 'Project Alpha',
      category: 'Web Application',
      description: 'A comprehensive enterprise solution',
      featured: true,
      order: 1,
    },
    {
      id: 'project-beta',
      slug: 'project-beta',
      title: 'Project Beta',
      category: 'Mobile App',
      description: 'Cross-platform mobile experience',
      featured: true,
      order: 2,
    },
    {
      id: 'project-gamma',
      slug: 'project-gamma',
      title: 'Project Gamma',
      category: 'Cloud Platform',
      description: 'Scalable cloud infrastructure',
      featured: true,
      order: 3,
    },
  ],
};

// ============================================
// CONTACT SECTION
// ============================================

export const defaultContact: ContactContent = {
  sectionTag: 'Get in Touch',
  sectionTitle: 'Send Us an Inquiry',
  sectionSubtitle: "Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  formFields: [
    {
      id: 'field-name',
      name: 'name',
      label: 'Your Name',
      type: 'text',
      placeholder: 'John Doe',
      required: true,
    },
    {
      id: 'field-email',
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'john@example.com',
      required: true,
    },
    {
      id: 'field-subject',
      name: 'subject',
      label: 'Subject',
      type: 'text',
      placeholder: 'Project Inquiry',
      required: true,
    },
    {
      id: 'field-message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      placeholder: 'Tell us about your project...',
      required: true,
      rows: 6,
    },
  ],
  submitButton: {
    label: 'Send Message',
  },
  successMessage: "Thank you for your message! We'll get back to you soon.",
  errorMessage: 'Something went wrong. Please try again later.',
};

// ============================================
// FOOTER SECTION
// ============================================

export const defaultFooter: FooterContent = {
  brandName: 'Triji',
  tagline: 'Building digital solutions that matter.',
  links: [
    { id: 'footer-home', label: 'Home', href: '#home' },
    { id: 'footer-services', label: 'Services', href: '#services' },
    { id: 'footer-projects', label: 'Projects', href: '#projects' },
    { id: 'footer-contact', label: 'Contact', href: '#contact' },
  ],
  socialLinks: [],
  copyrightText: '© {year} Triji. All rights reserved.',
};

// ============================================
// COMPLETE SITE CONTENT
// ============================================

export const defaultSiteContent: SiteContent = {
  metadata: defaultMetadata,
  navigation: defaultNavigation,
  hero: defaultHero,
  services: defaultServices,
  projects: defaultProjects,
  contact: defaultContact,
  footer: defaultFooter,
};
