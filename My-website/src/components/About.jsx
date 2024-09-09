import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const About = () => {
  return ( <>

  <Navbar/>
    <div className="container mx-auto p-6" color='brown'>
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Our Story</h2>
        <p>
          Founded in [Year], [Your Brand Name] started with a simple idea: [Brief history and reason for starting].
          Today, we're proud to [briefly state what you do now].
        </p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Mission & Vision</h2>
        <p><strong>Mission:</strong> To [your mission].</p>
        <p><strong>Vision:</strong> To [your vision].</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Our Team</h2>
        <p>Meet the people behind [Your Brand Name].</p>
        {/* You can add team member profiles here */}
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Achievements</h2>
        <p>We're honored to have received [list any awards or recognitions].</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Get in Touch</h2>
        <p>We'd love to hear from you! Reach out to us at [contact info] or follow us on social media.</p>
      </section>
    </div>
    
    </>
  );
};

export default About;
