import React, { useState } from 'react';

function PostForm() {
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [posts, setPosts] = useState([]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      text: text,
      images: images,
      likes: 0,
      comments: [],
      currentImageIndex: 0, // Add index to manage carousel position
    };

    setPosts([newPost, ...posts]);
    setText('');
    setImages([]);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleAddComment = (postId, commentText) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, comments: [...post.comments, commentText] } : post
    ));
  };

  const handleDelete = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handlePrevImage = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newIndex = (post.currentImageIndex - 1 + post.images.length) % post.images.length;
        return { ...post, currentImageIndex: newIndex };
      }
      return post;
    }));
  };

  const handleNextImage = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newIndex = (post.currentImageIndex + 1) % post.images.length;
        return { ...post, currentImageIndex: newIndex };
      }
      return post;
    }));
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
          <label htmlFor="post-images" className="block mb-2 text-sm font-medium text-gray-900">
            Upload Images
          </label>
          <input
            type="file"
            id="post-images"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            accept="image/*"
            multiple
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
            <p className="text-gray-900 mb-4">{post.text}</p>
            {post.images && post.images.length > 0 && (
              <div className="relative w-full">
                {/* Carousel wrapper */}
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                  {post.images.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-transform duration-700 ease-in-out ${index === post.currentImageIndex ? 'block' : 'hidden'}`}
                    >
                      <img
                        src={image}
                        className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt={`Post Image ${index}`}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center items-center pt-4">
                  <button
                    type="button"
                    className="flex justify-center items-center me-4 h-full cursor-pointer group focus:outline-none"
                    onClick={() => handlePrevImage(post.id)}
                  >
                    <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                      <svg
                        className="rtl:rotate-180 w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 5H1m0 0 4 4M1 5l4-4"
                        />
                      </svg>
                      <span className="sr-only">Previous</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    className="flex justify-center items-center h-full cursor-pointer group focus:outline-none"
                    onClick={() => handleNextImage(post.id)}
                  >
                    <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                      <svg
                        className="rtl:rotate-180 w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                      <span className="sr-only">Next</span>
                    </span>
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center mb-4">
              <button
                onClick={() => handleLike(post.id)}
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mr-2"
              >
                Like ({post.likes})
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Delete
              </button>
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Add a comment..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    handleAddComment(post.id, e.target.value);
                    e.target.value = '';
                  }
                }}
                className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 mb-2"
              />
              {post.comments.map((comment, index) => (
                <p key={index} className="text-gray-700">{comment}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostForm;
