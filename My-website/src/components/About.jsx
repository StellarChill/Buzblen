import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const About = () => {
  return ( <>

  <Navbar/>
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Our Story</h2>
        <p>
          Founded in 2024, Buzzblen started with a simple idea: Our Buzzblen was created as a result of this project to allow everyone to present interesting and knowledgeable information that can be shared with others.
          Today we're proud to showcase what we've done to ensure that everyone who visits our website is interested and happy to use it.
        </p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Mission & Vision</h2>
        <p><strong>Mission:</strong> To [your mission].</p>
        <p><strong>Vision:</strong> To [your vision].</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Our Team</h2>
        <p>Meet the people behind Buzzblen.<br></br>
          นาย เฉลิมชัย หาญคง<br></br>
          นางสาว มาริยา วรรณรัตน์<br></br>
          นางสาว กฤตธีรนันท์ สุภิมล<br></br>
          นาย วีรภัทร สงสุวรรณ<br></br>
          นาย รชต สินธุธนะรุจน์<br></br>
        </p>
       
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
