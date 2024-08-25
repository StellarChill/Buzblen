import React, { useState } from 'react';

function PostForm() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      text: text,
      image: image ? URL.createObjectURL(image) : null,
    };

    setPosts([newPost, ...posts]);
    setText('');
    setImage(null);
  };

  const handleDelete = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
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

        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Post
        </button>
      </form>

      {/* Display posted messages */}
      <div className="mt-8">
        {posts.map((post) => (
          <div key={post.id} className="mb-6 p-4 bg-gray-100 rounded-lg shadow">
            <p className="text-gray-900 mb-4">{post.text}</p>
            {post.image && <img src={post.image} alt="Post" className="w-full rounded-lg mb-4" />}
            <button
              onClick={() => handleDelete(post.id)}
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostForm;
