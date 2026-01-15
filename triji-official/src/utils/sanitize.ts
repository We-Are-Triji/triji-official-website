/**
 * Input Sanitization Utilities
 * 
 * Provides functions to sanitize user input to prevent XSS attacks.
 */

import DOMPurify from 'dompurify';

/**
 * Sanitize a plain text string (removes all HTML)
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  return DOMPurify.sanitize(input.trim(), { ALLOWED_TAGS: [] });
}

/**
 * Sanitize HTML content (allows safe HTML tags)
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';
  return DOMPurify.sanitize(input.trim(), {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
}

/**
 * Sanitize SVG content (for custom icons from CMS)
 */
export function sanitizeSvg(input: string): string {
  if (!input) return '';
  return DOMPurify.sanitize(input, {
    USE_PROFILES: { svg: true },
    ALLOWED_TAGS: [
      'svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon',
      'g', 'defs', 'clipPath', 'use', 'symbol', 'ellipse', 'text', 'tspan'
    ],
    ALLOWED_ATTR: [
      'viewBox', 'd', 'fill', 'stroke', 'stroke-width', 'stroke-linecap',
      'stroke-linejoin', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'x1', 'y1',
      'x2', 'y2', 'width', 'height', 'class', 'transform', 'points',
      'xmlns', 'id', 'clip-path', 'opacity', 'fill-opacity', 'stroke-opacity'
    ],
  });
}

/**
 * Sanitize inquiry form data
 */
export interface InquiryData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function sanitizeInquiry(data: InquiryData): InquiryData {
  return {
    name: sanitizeText(data.name),
    email: sanitizeText(data.email),
    subject: sanitizeText(data.subject),
    message: sanitizeText(data.message),
  };
}
