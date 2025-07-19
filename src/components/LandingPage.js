import React from 'react';
import './LandingPage.css';
import { FaCheckCircle, FaTools, FaPhoneAlt } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* About Section */}
      <section id="about" className="section about-section">
        <h2>About Us</h2>
        <p>
          We are a passionate team of developers and designers delivering high-quality digital solutions
          tailored to your business. Our goal is to create modern, responsive, and user-friendly experiences
          for every client.
        </p>
      </section>

      {/* Services Section */}
      <section id="services" className="section services-section">
        <h2>Our Services</h2>
        <div className="services-cards">
          <div className="service-card">
            <FaCheckCircle className="service-icon" />
            <h3>Quality Development</h3>
            <p>We deliver fast, secure and scalable applications tailored to your needs.</p>
          </div>
          <div className="service-card">
            <FaTools className="service-icon" />
            <h3>Custom Design</h3>
            <p>Beautiful UI/UX designs that match your brand and engage your audience.</p>
          </div>
          <div className="service-card">
            <FaPhoneAlt className="service-icon" />
            <h3>24/7 Support</h3>
            <p>Round-the-clock customer support to assist you anytime, anywhere.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <h2>Contact Us</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea rows="4" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default LandingPage;
