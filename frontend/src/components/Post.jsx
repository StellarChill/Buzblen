import React, { useState } from 'react';
import CommentButton from './CommentButton';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

function PostForm() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => setText(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  // ฟังก์ชันสำหรับสร้างโพสต์ใหม่
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

  // ฟังก์ชันสำหรับจัดการโพสต์ที่ถูกลบ
  const handlePostDeleted = (deletedPostId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.PostID !== deletedPostId));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        method="post"
        encType="multipart/form-data"
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="post-text"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Your Post
          </label>
          <textarea
            id="post-text"
            value={text}
            onChange={handleTextChange}
            className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            placeholder="What's on your mind?"
            rows={4}
            required
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="post-image"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="post-image"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm font-medium">{error}</p>
        )}
        <button
          type="submit"
          className={`w-full py-2 px-4 text-white text-lg font-medium rounded-lg ${
            loading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
          }`}
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>

      {/* Posts Section */}
      <div>
        {posts.length > 0 ? (
          <ul className="space-y-6">
            {posts.map((post, index) => (
              <li
                key={index}
                className="p-6 bg-gray-50 rounded-lg shadow border border-gray-200"
              >
                {/* Post Description */}
                <p className="text-lg font-semibold text-gray-800 mb-3">
                  {post.PostDescription}
                </p>

                {/* Post Image */}
                {post.ImageURL && (
                  <img
                    src={`http://localhost:5000${post.ImageURL}`}
                    alt="Post"
                    className="w-full h-auto rounded-lg mb-4 shadow-md"
                  />
                )}

                {/* Buttons Section */}
                <div className="flex items-center justify-between space-x-4 mt-4">
                  {/* Like Button */}
                  <div className="flex-shrink-0">
                    <LikeButton postId={post.PostID} />
                  </div>

                  {/* Comment Button */}
                  <div className="flex-grow">
                    <CommentButton postId={post.PostID} />
                  </div>

                  {/* Delete Button */}
                  <div className="flex-grow">
                    <DeleteButton
                      postId={post.PostID}
                      onPostDeleted={handlePostDeleted}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">
            No posts yet. Start sharing your thoughts!
          </p>
        )}
      </div>
    </div>
  );
}

export default PostForm;
