import React, { useState } from 'react';
import '../cssfile/Profile.css'; 
import backgroundImage from '../Picture/little-house.gif';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

function ChangeProfile() {
  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the top
  };

  const [profile, setProfile] = useState({
    name: 'Your Name',
    bio: '',
    image: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProfile({
        ...profile,
        image: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', profile);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div style={divStyle}>
      <Navbar />
      <div className="container" style={{ margin: '20px auto', maxWidth: '600px', width: '100%' }}>
        <h1 className="title">Profile</h1>
        <div className="profile-container">
          <div className="profile-display" style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={profile.image} 
              alt="profile" 
              className="profile-picture" 
              style={{ borderRadius: '50%', width: '200px', height: '200px', margin: '20px' }} 
            />
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#333' }}>{profile.name}</h2>
              <p style={{ color: '#666' }}>{profile.bio}</p>
            </div>
          </div>
          <button onClick={handleEditClick} className="button" style={{ backgroundColor: '#007BFF', margin: '10px' }}>
            Edit Profile
          </button>
          {isEditing && (
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
                  style={{ margin: '10px 0' }} 
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Profile Picture:</label>
                <div className="input-group">
                  <input 
                    type="file" 
                    id="image" 
                    name="image" 
                    onChange={handleImageChange} 
                    className="input"
                    style={{ display: 'none' }} 
                  /> 
                  <br /> 
                  <label htmlFor="image" className="input-label">
                    <FontAwesomeIcon icon={faImage} style={{ marginRight: '10px' }} />
                    Change Image
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio:</label>
                <textarea 
                  id="bio" 
                  name="bio" 
                  value={profile.bio} 
                  onChange={handleChange} 
                  className="textarea"
                  style={{ margin: '10px 0' }} 
                />
              </div>
              <button type="submit" className="button" style={{ backgroundColor: '#28A745', marginRight: '10px' }}>
                Save Changes
              </button>
              <button onClick={handleCancelClick} className="button" style={{ backgroundColor: '#DC3545' }}>
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChangeProfile;


