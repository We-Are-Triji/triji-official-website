/**
 * Contact Section Component
 * 
 * Contact form section with CMS-driven content support.
 * Includes input sanitization, validation, and rate limiting.
 */

import { useState, type FormEvent } from 'react';
import type { ContactContent, FormField } from '../../types/content';
import { useInquirySubmit } from '../../hooks/useContent';
import { useRateLimit } from '../../hooks/useRateLimit';
import { ArrowRightIcon } from '../icons/ServiceIcons';
import { sanitizeInquiry } from '../../utils/sanitize';
import { validateInquiry } from '../../utils/validation';

interface ContactProps {
  content: ContactContent;
}

export const Contact: React.FC<ContactProps> = ({ content }) => {
  const { submit, loading, error, success, reset } = useInquirySubmit();
  const { canSubmit, recordSubmit, timeRemaining, isRateLimited } = useRateLimit({
    limitMs: 60000, // 1 minute between submissions
    storageKey: 'triji_inquiry_rate_limit',
  });
  
  // Initialize form data based on form fields from CMS
  const initialFormData = content.formFields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {} as Record<string, string>);
  
  const [formData, setFormData] = useState(initialFormData);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) reset();
    if (validationErrors.length > 0) setValidationErrors([]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Check rate limiting
    if (!canSubmit()) {
      setValidationErrors([`Please wait ${timeRemaining()} seconds before submitting again.`]);
      return;
    }
    
    // Prepare form data for validation
    const inquiryData = {
      name: formData.name || '',
      email: formData.email || '',
      subject: formData.subject || '',
      message: formData.message || '',
    };
    
    // Validate input
    const validation = validateInquiry(inquiryData);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }
    
    // Sanitize input before submission
    const sanitizedData = sanitizeInquiry(inquiryData);
    
    const submitted = await submit(sanitizedData);

    if (submitted) {
      recordSubmit(); // Record submission for rate limiting
      setFormData(initialFormData);
      setValidationErrors([]);
    }
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.name,
      value: formData[field.name] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => 
        handleChange(field.name, e.target.value),
      placeholder: field.placeholder,
      required: field.required,
      disabled: loading,
    };

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={field.rows || 6}
          />
        );
      
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">{field.placeholder}</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      
      case 'email':
        return <input type="email" {...commonProps} />;
      
      case 'phone':
        return <input type="tel" {...commonProps} />;
      
      default:
        return <input type="text" {...commonProps} />;
    }
  };

  // Group fields for layout (first two fields in a row, rest full width)
  const rowFields = content.formFields.slice(0, 2);
  const fullWidthFields = content.formFields.slice(2);

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{content.sectionTag}</span>
          <h2 className="section-title">{content.sectionTitle}</h2>
          <p className="section-subtitle">{content.sectionSubtitle}</p>
        </div>
        
        <div className="contact-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            {success && (
              <div className="form-success">
                {content.successMessage}
              </div>
            )}
            
            {error && (
              <div className="form-error">
                {error}
              </div>
            )}
            
            {validationErrors.length > 0 && (
              <div className="form-error">
                <ul className="validation-errors">
                  {validationErrors.map((err, index) => (
                    <li key={index}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {isRateLimited && (
              <div className="form-warning">
                Please wait {timeRemaining()} seconds before submitting again.
              </div>
            )}
            
            {rowFields.length > 0 && (
              <div className="form-row">
                {rowFields.map((field) => (
                  <div key={field.id} className="form-group">
                    <label htmlFor={field.name}>{field.label}</label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            )}
            
            {fullWidthFields.map((field) => (
              <div key={field.id} className="form-group">
                <label htmlFor={field.name}>{field.label}</label>
                {renderField(field)}
              </div>
            ))}
            
            <button 
              type="submit" 
              className="btn btn-primary btn-submit"
              disabled={loading || isRateLimited}
            >
              {loading ? 'Sending...' : content.submitButton.label} 
              {!loading && <ArrowRightIcon />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
