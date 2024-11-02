import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faImage } from '@fortawesome/free-solid-svg-icons';

function PostForm() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      text: text,
      images: images,
      likes: 0,
      comments: [],
      currentImageIndex: 0,
      timestamp: new Date(), 
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

  const handleAddComment = (postId) => {
    if (commentInput[postId]?.trim()) {
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, comments: [...post.comments, { text: commentInput[postId], replies: [], timestamp: new Date() }] } : post
      ));
      setCommentInput({ ...commentInput, [postId]: '' });
    }
  };

  const handleAddNestedComment = (postId, commentIndex) => {
    const key = `${postId}-${commentIndex}`;
    if (nestedCommentInput[key]?.trim()) {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          const updatedComments = [...post.comments];
          updatedComments[commentIndex].replies.push({
            text: nestedCommentInput[key],
            timestamp: new Date(),
          });
          return { ...post, comments: updatedComments };
        }
        return post;
      }));
      setNestedCommentInput({ ...nestedCommentInput, [key]: '' });
    }
  };

  const handleCommentInputChange = (e, postId) => {
    setCommentInput({ ...commentInput, [postId]: e.target.value });
  };

  const handleNestedCommentInputChange = (e, postId, commentIndex) => {
    const key = `${postId}-${commentIndex}`;
    setNestedCommentInput({ ...nestedCommentInput, [key]: e.target.value });
  };

  const handleDelete = (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      setPosts(posts.filter(post => post.id !== postId));
    }
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
            <div className="flex items-center mb-4">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-10 mr-2 ml-2 rounded-full ring ring-offset-2">
                  <img src="https://avatars.githubusercontent.com/u/143784469?v=4" alt="profile avatar" />
                </div>
              </div>
              <p className="text-gray-900 bold ml-2">My name</p>
            </div>

            {post.images && post.images.length > 0 && (
              <div className="relative w-full">
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
                <p className="text-gray-900 bold mt-4">{post.text}</p>
                <p className="text-gray-500 text-sm">{new Date(post.timestamp).toLocaleString()}</p>
                <div className="flex justify-center items-center pt-4">
                  <button
                    type="button"
                    className="flex justify-center items-center me-4 h-full cursor-pointer group focus:outline-none"
                    onClick={() => handlePrevImage(post.id)}
                  >
                    <span className="text-gray-400 hover:text-gray-900 group-focus:text-gray-900">
                      <svg className="rtl:rotate-180 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                      </svg>
                      <span className="sr-only">Previous</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    className="flex justify-center items-center h-full cursor-pointer group focus:outline-none"
                    onClick={() => handleNextImage(post.id)}
                  >
                    <span className="text-gray-400 hover:text-gray-900 group-focus:text-gray-900">
                      <svg className="rtl:rotate-180 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
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
                className={`text-white mt-3 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 ${post.likes > 0 ? 'bg-blue-500' : 'bg-blue-500'}`}
                disabled={post.likes > 0}
              >
                <FontAwesomeIcon icon={faHeart} className={`mr-2 ${post.likes > 0 ? 'text-red-500' : 'text-blue-500'}`} />
                Like ({post.likes})
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-white bg-red-600 mt-3 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Delete
              </button>
              <button
                onClick={() => handleToggleComments(post.id)}
                className="text-white ml-2 mt-3 bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                {showComments[post.id] ? 'Hide' : 'Show'} Comments
              </button>
            </div>

            {showComments[post.id] && (
              <div className="mb-4">
                <div className="flex items-center mt-4 mb-2">
                  <div className="avatar mr-2">
                    <div className="ring-primary ring-offset-base-100 w-8 mr-2 ml-2 rounded-full ring ring-offset-2">
                      <img src="https://avatars.githubusercontent.com/u/143784469?v=4" alt="profile avatar" />
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentInput[post.id] || ''}
                    onChange={(e) => handleCommentInputChange(e, post.id)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 mr-2"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Send
                  </button>
                </div>
                {post.comments.map((comment, commentIndex) => (
                  <div key={commentIndex} className="ml-4 mb-2">
                    <div className="flex items-center mb-2">
                      <div className="avatar mr-2">
                        <div className="ring-primary ring-offset-base-100 w-8 mr-2 ml-2 rounded-full ring ring-offset-2">
                          <img src="https://avatars.githubusercontent.com/u/143784469?v=4" alt="profile avatar" />
                        </div>
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                      <span className="text-gray-500 text-sm ml-2">{new Date(comment.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        type="text"
                        placeholder="Reply..."
                        value={nestedCommentInput[`${post.id}-${commentIndex}`] || ''}
                        onChange={(e) => handleNestedCommentInputChange(e, post.id, commentIndex)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 mr-2"
                      />
                      <button
                        onClick={() => handleAddNestedComment(post.id, commentIndex)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                      >
                        Reply
                      </button>
                    </div>
                    {comment.replies.length > 0 && (
                      <div className="ml-4">
                        {comment.replies.map((reply, replyIndex) => (
                          <div key={replyIndex} className="flex items-center mb-2">
                            <div className="avatar mr-2">
                              <div className="ring-primary ring-offset-base-100 w-8 mr-2 ml-2 rounded-full ring ring-offset-2">
                                <img src="https://avatars.githubusercontent.com/u/143784469?v=4" alt="profile avatar" />
                              </div>
                            </div>
                            <p className="text-gray-600">{reply.text}</p>
                            <span className="text-gray-500 text-sm ml-2">{new Date(reply.timestamp).toLocaleTimeString()}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostForm;
