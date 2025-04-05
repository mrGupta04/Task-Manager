import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/about.css';

const About: React.FC = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <h1 className="hero-title">Our Story</h1>
                    <p className="hero-subtitle">Building the future of task management</p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="about-mission">
                <div className="container">
                    <div className="mission-content">
                        <h2 className="section-title">Our Mission</h2>
                        <p className="section-text">
                            We're on a mission to revolutionize productivity by creating intuitive tools that help
                            individuals and teams accomplish more with less stress. Our platform combines powerful
                            features with elegant design to make task management effortless.
                        </p>
                       
                    </div>

                </div>
            </section>



            {/* Values Section */}
            <section className="about-values">
                <div className="container">
                    <h2 className="section-title">Our Values</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon">
                                <i className="fas fa-lightbulb"></i>
                            </div>
                            <h3 className="value-title">Innovation</h3>
                            <p className="value-text">
                                We constantly push boundaries to create groundbreaking solutions.
                            </p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">
                                <i className="fas fa-heart"></i>
                            </div>
                            <h3 className="value-title">Passion</h3>
                            <p className="value-text">
                                We love what we do and it shows in every feature we build.
                            </p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">
                                <i className="fas fa-users"></i>
                            </div>
                            <h3 className="value-title">Collaboration</h3>
                            <p className="value-text">
                                Great things happen when we work together towards common goals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta">
                <div className="container">
                    <h2 className="cta-title">Ready to boost your productivity?</h2>
                    <Link to="/signup" className="cta-button">Get Started Free</Link>
                </div>
            </section>
        </div>
    );
};

export default About;