import React from "react";
import Navbar from "./Navbar";
import PostForm from "./Post";
import Footer from "./Footer";
import backgroundImage from '../Picture/little-house.gif'; // Ensure this path is correct

function Homepage() {
  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',  // Fixes the background so it doesn't move on scroll
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',           // Centers the content horizontally
  };

  const contentStyle = {
    maxWidth: '800px',              // Limits the width of the content
    width: '100%',                  // Makes sure it doesn’t exceed 100% of the parent
    padding: '20px',                // Adds padding to prevent content from touching the sides
    boxSizing: 'border-box',        // Ensures padding is included in the width
  };

  return (
    <div style={divStyle}>
      <Navbar />
      <div style={contentStyle}>
        <PostForm />
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
