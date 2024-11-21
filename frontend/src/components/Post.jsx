import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faImage } from '@fortawesome/free-solid-svg-icons';

function PostForm() {
  const [text, setText] = useState('');
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) {
      console.error('No token found. Please log in first.');
      return;
    }
  
    const formData = new FormData();
    formData.append('postDescription', text);
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
        body: formData,
      });
  
      const data = await response.json();
      console.log(data);
      
      if (response.ok) {
        
      } else {
        console.error('Error creating post:', data.error);
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  

  return (
    <div className="max-w-lg mx-auto p-5 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} method='post'>
        <div className="mb-4">
          <label htmlFor="post-text" className="block mb-2 text-sm font-medium text-gray-900">Your Post</label>
          <textarea
            id="post-text"
            value={text}
            onChange={handleTextChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            placeholder="What's on your mind?"
            required
          ></textarea>
        </div>
       
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default PostForm;
