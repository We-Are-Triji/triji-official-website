/**
 * Input Validation Utilities
 * 
 * Provides functions to validate user input.
 */

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate phone number format (basic validation)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  const phoneRegex = /^[\d\s\-+()]{7,20}$/;
  return phoneRegex.test(phone.trim());
}

/**
 * Validate minimum length
 */
export function hasMinLength(value: string, minLength: number): boolean {
  return value.trim().length >= minLength;
}

/**
 * Validate maximum length
 */
export function hasMaxLength(value: string, maxLength: number): boolean {
  return value.trim().length <= maxLength;
}

/**
 * Validation result type
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Inquiry form validation constraints
 */
export const INQUIRY_CONSTRAINTS = {
  name: { minLength: 2, maxLength: 100 },
  email: { maxLength: 254 },
  subject: { minLength: 3, maxLength: 200 },
  message: { minLength: 10, maxLength: 5000 },
} as const;

/**
 * Validate inquiry form data
 */
export interface InquiryFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function validateInquiry(data: InquiryFormData): ValidationResult {
  const errors: string[] = [];

  // Name validation
  if (!data.name || !hasMinLength(data.name, INQUIRY_CONSTRAINTS.name.minLength)) {
    errors.push(`Name must be at least ${INQUIRY_CONSTRAINTS.name.minLength} characters`);
  } else if (!hasMaxLength(data.name, INQUIRY_CONSTRAINTS.name.maxLength)) {
    errors.push(`Name must be less than ${INQUIRY_CONSTRAINTS.name.maxLength} characters`);
  }

  // Email validation
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
  } else if (!hasMaxLength(data.email, INQUIRY_CONSTRAINTS.email.maxLength)) {
    errors.push('Email address is too long');
  }

  // Subject validation
  if (!data.subject || !hasMinLength(data.subject, INQUIRY_CONSTRAINTS.subject.minLength)) {
    errors.push(`Subject must be at least ${INQUIRY_CONSTRAINTS.subject.minLength} characters`);
  } else if (!hasMaxLength(data.subject, INQUIRY_CONSTRAINTS.subject.maxLength)) {
    errors.push(`Subject must be less than ${INQUIRY_CONSTRAINTS.subject.maxLength} characters`);
  }

  // Message validation
  if (!data.message || !hasMinLength(data.message, INQUIRY_CONSTRAINTS.message.minLength)) {
    errors.push(`Message must be at least ${INQUIRY_CONSTRAINTS.message.minLength} characters`);
  } else if (!hasMaxLength(data.message, INQUIRY_CONSTRAINTS.message.maxLength)) {
    errors.push(`Message must be less than ${INQUIRY_CONSTRAINTS.message.maxLength} characters`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
