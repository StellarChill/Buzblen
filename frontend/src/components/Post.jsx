import React, { useState, useRef } from 'react';
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
      username: ProfileName,
    };
    setPosts([newPost, ...posts]);
    setText('');
    setImages([]);
  };

  const handleLike = (postId) => {
    setPosts(posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleAddComment = (postId) => {
    if (commentInput[postId]?.trim()) {
      setPosts(posts.map((post) => {
        if (post.id === postId) {
          const newComment = {
            text: commentInput[postId],
            replies: [],
            timestamp: new Date(),
            likes: 0, // Add likes count for each comment
          };
          return { ...post, comments: [newComment, ...post.comments] };
        }
        return post;
      }));
      setCommentInput({ ...commentInput, [postId]: '' });
    }
  };

  const handleAddNestedComment = (postId, commentIndex) => {
    const key = `${postId}-${commentIndex}`;
    if (nestedCommentInput[key]?.trim()) {
      setPosts(posts.map((post) => {
        if (post.id === postId) {
          const updatedComments = [...post.comments];
          updatedComments[commentIndex].replies = [
            { text: nestedCommentInput[key], timestamp: new Date() },
            ...updatedComments[commentIndex].replies,
          ];
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
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      setPosts(posts.filter((post) => post.id !== postId));
    }
  };

  const handleDeleteComment = (postId, commentIndex) => {
    setPosts(posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = post.comments.filter((_, index) => index !== commentIndex);
        return { ...post, comments: updatedComments };
      }
      return post;
    }));
  };

  const handleLikeComment = (postId, commentIndex) => {
    setPosts(posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = [...post.comments];
        updatedComments[commentIndex].likes += 1;
        return { ...post, comments: updatedComments };
      }
      return post;
    }));
  };

  const handlePrevImage = (postId) => {
    setPosts(posts.map((post) => {
      if (post.id === postId) {
        const newIndex = (post.currentImageIndex - 1 + post.images.length) % post.images.length;
        return { ...post, currentImageIndex: newIndex };
      }
      return post;
    }));
  };

  const handleNextImage = (postId) => {
    setPosts(posts.map((post) => {
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
                  <img src={profileImage} alt="profile" className="profile-image" />
                </div>
              </div>
              <h2 className="text-gray-900">{ProfileName}</h2>
            </div>

            {/* Images carousel */}
            {post.images.length > 0 && (
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
                <div className="flex justify-center items-center pt-4">
                  <button
                    type="button"
                    onClick={() => handlePrevImage(post.id)}
                    className="text-gray-400 hover:text-gray-900"
                  >
                    {/* Previous Image Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 5H1m0 0 4 4M1 5l4-4" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNextImage(post.id)}
                    className="text-gray-400 hover:text-gray-900"
                  >
                    {/* Next Image Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            <p className="text-gray-900 bold mt-4">{post.text}</p>
            <p className="text-gray-500 text-sm">{new Date(post.timestamp).toLocaleString()}</p>

            <div className="flex items-center mb-4">
              <button
                onClick={() => handleLike(post.id)}
                className={`text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mr-2`}
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

            {/* Comments Section */}
            {showComments[post.id] && (
              <div className="mb-4">
                <div className="flex items-center mt-4 mb-2">
                  <div className="avatar mr-2">
                    <div className="ring-primary ring-offset-base-100 w-8 mr-2 ml-2 rounded-full ring ring-offset-2 mb-3">
                      <img src={profileImage} alt="profile" className="profile-image" />
                    </div>
                  </div>
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

                {post.comments.map((comment, commentIndex) => (
                  <div key={commentIndex} className="ml-4 mb-2">
                    <div className="flex items-center mb-4">
                      <div className="avatar mr-2">
                        <div className="ring-primary ring-offset-base-100 w-8 mr-2 ml-2 rounded-full ring ring-offset-2">
                          <img src={profileImage} alt="profile" className="profile-image" />
                        </div>
                      </div>
                      <p className="text-gray-700 break-words max-w-xs">{comment.text}</p>
                      <span className="text-gray-500 text-sm ml-2">{new Date(comment.timestamp).toLocaleTimeString()}</span>
                    </div>

                    {/* Like/Delete buttons for comments */}
                    <div className="flex items-center space-x-4 mt-2">
                      <button
                        onClick={() => handleLikeComment(post.id, commentIndex)}
                        className="ml-2 text-blue-500"
                      >
                        Like ({comment.likes || 0})
                      </button>
                      <button
                        onClick={() => handleDeleteComment(post.id, commentIndex)}
                        className="ml-2 text-red-500"
                      >
                        Delete
                      </button>
                    </div>

                    {/* Nested Comments */}
                    <div className="flex items-center mb-2">
                      <input
                        type="text"
                        placeholder="Reply..."
                        value={nestedCommentInput[`${post.id}-${commentIndex}`] || ''}
                        onChange={(e) => handleNestedCommentInputChange(e, post.id, commentIndex)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 mr-2 mb-3"
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
                            <div className="avatar mr-2 mb-3">
                              <div className="ring-primary ring-offset-base-100 w-8 mr-2 ml-2 rounded-full ring ring-offset-2">
                                <img src={profileImage} alt="profile" className="profile-image" />
                              </div>
                            </div>
                            <p className="text-gray-600 break-words max-w-xs">{reply.text}</p>
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
