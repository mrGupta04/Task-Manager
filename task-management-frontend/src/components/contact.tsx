import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import '../styles/contact.css';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1 className="hero-title">Get in Touch</h1>
          <p className="hero-subtitle">We'd love to hear from you! Reach out for support, questions, or feedback.</p>
        </div>
      </section>

      {/* Contact Content */}
      <div className="contact-content">
        {/* Contact Form */}
        <section className="contact-form-section">
          <div className="form-header">
            <h2 className="section-title">Send Us a Message</h2>
            <p className="section-description">
              Have questions about TaskFlow? Fill out the form below and our team will get back to you shortly.Or send your message on my whatsapp number-7480061613
            </p>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            {submitSuccess && (
              <div className="success-message">
                <i className="fas fa-check-circle"></i>
                <span>Your message has been sent successfully!</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What's this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Type your message here..."
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Sending...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i> Send Message
                </>
              )}
            </button>
          </form>
        </section>

        {/* Contact Info */}
        <section className="contact-info-section">
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <h3 className="info-title">Email Us</h3>
            <p className="info-text">support@taskflow.com</p>
            <a href="mailto:support@taskflow.com" className="info-link">
              Send an email <i className="fas fa-arrow-right"></i>
            </a>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-headset"></i>
            </div>
            <h3 className="info-title">Live Chat</h3>
            <p className="info-text">Available 24/7</p>
            <button className="info-link">
              Start chat <i className="fas fa-arrow-right"></i>
            </button>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3 className="info-title">Our Office</h3>
            <p className="info-text">
              IIIT Raichur,Karnatka<br />
              7406898118
            </p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="info-link"
            >
              Get directions <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="contact-cta">
        <div className="cta-content">
          <h2 className="cta-title">Still have questions?</h2>
          <p className="cta-text">Check out our comprehensive FAQ section for quick answers.</p>
          <Link to="/about" className="cta-btn">
            Visit Help Center
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;