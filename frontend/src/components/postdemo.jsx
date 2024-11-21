import React, { useState, useRef } from 'react';

function PostDemo() {
  const [text, setText] = useState('');
  const [posts, setPosts] = useState([]);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) {
      console.error('No token found. Please log in first.');
      return;
    }

    const formData = new FormData();
    formData.append('employeeId', 'YOUR_EMPLOYEE_ID'); // Replace with actual employee ID
    formData.append('postDescription', text);

    if (fileInputRef.current.files.length > 0) {
      formData.append('image', fileInputRef.current.files[0]);
    }

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setPosts([data.post, ...posts]);
        setText('');
        fileInputRef.current.value = ''; // Clear file input
      } else {
        console.error('Error creating post:', data.error);
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-5 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="post-text" className="block mb-2 text-sm font-medium text-gray-900">
            Your Post
          </label>
          <textarea
            id="post-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            placeholder="What's on your mind?"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="post-image" className="block mb-2 text-sm font-medium text-gray-900">
            Upload Image
          </label>
          <input
            type="file"
            id="post-image"
            ref={fileInputRef}
            accept="image/*"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Post
        </button>
      </form>
      <div className="mt-8">
        {posts.map((post, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
            <p className="text-gray-900">{post.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostDemo;
