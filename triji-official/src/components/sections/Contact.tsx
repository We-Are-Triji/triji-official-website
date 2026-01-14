/**
 * Contact Section Component
 * 
 * Contact form section with CMS-driven content support.
 */

import { useState, type FormEvent } from 'react';
import type { ContactContent, FormField } from '../../types/content';
import { useInquirySubmit } from '../../hooks/useContent';
import { ArrowRightIcon } from '../icons/ServiceIcons';

interface ContactProps {
  content: ContactContent;
}

export const Contact: React.FC<ContactProps> = ({ content }) => {
  const { submit, loading, error, success, reset } = useInquirySubmit();
  
  // Initialize form data based on form fields from CMS
  const initialFormData = content.formFields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {} as Record<string, string>);
  
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) reset();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const submitted = await submit({
      name: formData.name || '',
      email: formData.email || '',
      subject: formData.subject || '',
      message: formData.message || '',
    });

    if (submitted) {
      setFormData(initialFormData);
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
              disabled={loading}
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
