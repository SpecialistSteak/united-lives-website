import React from 'react';
import '../../styles/contact-us.css'; // Make sure the path is correct

const ContactPage: React.FC = () => {
  return (
    <div className="contact-page-container">
      <div className="contact-form-wrapper">
        <h1 className="contact-page-title">Contact Us</h1>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" id="name" name="name" className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" id="email" name="email" className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea id="message" name="message" className="form-textarea" required></textarea>
          </div>
          <button type="submit" className="form-submit-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;