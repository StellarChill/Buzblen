import React, { useState } from 'react';
import LikeButton from './likebutton';
import CommentButton from './CommentButton';
function PostForm() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => setText(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in first.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('postDescription', text);
    if (image) formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setPosts((prevPosts) => [...prevPosts, data.post]);
        setText('');
        setImage(null);
      } else {
        setError(data.error || 'Error creating post.');
      }
    } catch (err) {
      setError('Error submitting post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-5 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="post-text" className="block mb-2 text-sm font-medium text-gray-900">
            Your Post
          </label>
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
          <label htmlFor="post-image" className="block mb-2 text-sm font-medium text-gray-900">
            Upload Image
          </label>
          <input
            type="file"
            id="post-image"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            accept="image/*"
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        <button
          type="submit"
          className={`w-full text-white ${
            loading ? 'bg-blue-400' : 'bg-blue-700 hover:bg-blue-800'
          } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>

      {/* Display all submitted posts */}
      {posts.length > 0 && (
        <div className="mt-4">
          <ul className="space-y-2">
            {posts.map((post, index) => (
              <li
                key={index}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <p className="text-sm font-semibold text-gray-800 mb-1">{post.PostDescription}</p>
                {post.ImageURL && (
                  <img src={`http://localhost:5000${post.ImageURL}`} alt="Post" className="mt-2 max-w-full" />
                
                )}     <div className="flex items-center justify-start space-x-4 mt-2">
                <LikeButton />
                <CommentButton />
              </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PostForm;
