import React from "react";
import Navbar from "./Navbar";
import backgroundImage from "../Picture/little-house.gif";
const About = () => {
  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",   
    backgroundPosition: "center",
    backgroundAttachment: "fixed", // Fixes the background so it doesn't move on scroll
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Centers the content horizontally
  };
  return (
    <div style={divStyle}>
      <Navbar />
      <div className="container mx-auto p-6" color="brown">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p>
            Founded in 2024, Buzzblen started with a simple idea: Our Buzzblen
            was created as a result of this project to allow everyone to present
            interesting and knowledgeable information that can be shared with
            others. Today we're proud to showcase what we've done to ensure that
            everyone who visits our website is interested and happy to use it.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold">Mission & Vision</h2>
          <p>
            <strong>Mission:</strong> To Our goal in creating this website is to
            allow users to exchange information.
          </p>
          <p>
            <strong>Vision:</strong> To We hope that everyone will enjoy the
            website we have created and have fun using it..
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold">Our Team</h2>
          <p>
            Meet the people behind Buzzblen.<br></br>
            Mr. Chalermchai Harnkong<br></br>
            Miss Mariya Wannarat<br></br>
            Miss Kritthiranan Supimon<br></br>
            Mr. Weerapat Songsuwan<br></br>
            Mr. Rachata Sinthuthanaruj<br></br>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold">Achievements</h2>
          <p>
            We are honored to have created this project. I hope you guys are
            happy with this website.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <p>
            We'd love to hear from you! Reach out to us at [Tel. 084-486-5720]
            or follow us on social media.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
