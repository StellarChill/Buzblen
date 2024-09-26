import React, { useState } from 'react';
import '../cssfile/Profile.css'; 
import backgroundImage from '../Picture/little-house.gif';
import Navbar from './Navbar';

function ChangeProfile() {
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
  const [profile, setProfile] = useState({
    name: 'Your Name', // Replace 'Your Name' with your actual name
    contact: 'your.contact@example.com', // Replace with your actual contact information
    bio: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', profile);
  };
    
  return <div style={divStyle}>
    <Navbar />
    <div className="container" >
      <h1 className="title">Change Profile</h1>
      <div className="profile-container">
        <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={profile.name} 
              onChange={handleChange} 
            className="input"
          />
        </div>
        <div className="form-group">
            <label htmlFor="contact">Contact:</label>
            <input 
              type="text" 
              id="contact" 
              name="contact" 
              value={profile.contact} 
              onChange={handleChange} 
              className="input"
          />
        </div>
          <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <textarea 
              id="bio" 
              name="bio" 
              value={profile.bio} 
              onChange={handleChange} 
              className="textarea"
            />
    </div>
          <button type="submit" className="button">Save Changes</button>
        </form>
        <div className="profile-display">
          <h2>Profile Preview</h2>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Contact:</strong> {profile.contact}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
        </div>
      </div>
    </div>
  
  
   </div>
}

export default ChangeProfile;
