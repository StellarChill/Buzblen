import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faImage } from '@fortawesome/free-solid-svg-icons';

function PostForm({ ProfileName, profileImage }) {
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showComments, setShowComments] = useState({});
  const [commentInput, setCommentInput] = useState({});
  const [nestedCommentInput, setNestedCommentInput] = useState({});
  const fileInputRef = useRef(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files.map((file) => URL.createObjectURL(file)));
  };

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
        setImages([]);
      } else {
        console.error('Error creating post:', data.error);
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };
  
  const handleLike = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
        method: 'POST',
      });
      if (response.ok) {
        setPosts(posts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        ));
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (postId) => {
    if (!commentInput[postId]?.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId: 'YOUR_EMPLOYEE_ID', // Replace with actual employee ID
          postId,
          commentText: commentInput[postId],
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setPosts(posts.map((post) =>
          post.id === postId ? { ...post, comments: [data.comment, ...post.comments] } : post
        ));
        setCommentInput({ ...commentInput, [postId]: '' });
      } else {
        console.error('Error adding comment:', data.error);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleCommentInputChange = (e, postId) => {
    setCommentInput({ ...commentInput, [postId]: e.target.value });
  };

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setPosts(posts.filter((post) => post.id !== postId));
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleToggleComments = (postId) => {
    setShowComments({
      ...showComments,
      [postId]: !showComments[postId],
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="max-w-lg mx-auto p-5 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit}>
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
        <div className="mb-4">
          <label htmlFor="post-images" className="block mb-2 text-sm font-medium text-gray-900">Upload Images</label>
          <button
            type="button"
            onClick={handleButtonClick}
            className="flex items-center text-gray-900 bg-gray-50 border border-gray-300 rounded-lg p-2 cursor-pointer"
          >
            <FontAwesomeIcon icon={faImage} className="mr-2" />
            Choose Images
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
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
        {posts.map((post) => (
          <div key={post.id} className="mb-6 p-4 bg-gray-100 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-10 mr-2 ml-2 rounded-full ring ring-offset-2">
                  <img src={profileImage} alt="profile" className="profile-image" />
                </div>
              </div>
              <h2 className="text-gray-900">{ProfileName}</h2>
            </div>

            <p className="text-gray-900 bold mt-4">{post.text}</p>
            <p className="text-gray-500 text-sm">{new Date(post.timestamp).toLocaleString()}</p>

            <div className="flex items-center mb-4">
              <button
                onClick={() => handleLike(post.id)}
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mr-2"
              >
                <FontAwesomeIcon icon={faHeart} className="mr-2 text-red-500" />
                Like ({post.likes})
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Delete Post
              </button>
              <button
                onClick={() => handleToggleComments(post.id)}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 ml-2"
              >
                {showComments[post.id] ? 'Hide' : 'Show'} Comments
              </button>
            </div>

            {showComments[post.id] && (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInput[post.id] || ''}
                  onChange={(e) => handleCommentInputChange(e, post.id)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 mr-2 mb-3"
                />
                <button
                  onClick={() => handleAddComment(post.id)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Send
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostForm;
