import React, { useState } from 'react';

function CommentButton() {
  const [showInput, setShowInput] = useState(false); // Toggle for comment input
  const [comment, setComment] = useState(''); // Store the current comment text
  const [comments, setComments] = useState([]); // Store all comments

  const handleToggleInput = () => {
    setShowInput(!showInput);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === '') return;
    setComments((prevComments) => [...prevComments, comment]);
    setComment('');
  };

  return (
    <div className="space-y-4">
      {/* Comment Button */}
      <button
        onClick={handleToggleInput}
        className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium shadow-md transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 fill-gray-500"
          viewBox="0 0 24 24"
        >
          <path d="M21 15a2 2 0 0 0-2-2h-5.586l-2-2H19a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14l4-4h10a2 2 0 0 0 2-2z" />
        </svg>
        <span>Comment</span>
      </button>

      {/* Comment Input Field */}
      {showInput && (
        <form
          onSubmit={handleCommentSubmit}
          className="flex flex-col space-y-2 bg-gray-50 p-4 rounded-lg shadow"
        >
          <textarea
            value={comment}
            onChange={handleCommentChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your comment..."
            rows="3"
          ></textarea>
          <button
            type="submit"
            className="self-end px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 font-medium transition"
          >
            Post Comment
          </button>
        </form>
      )}

      {/* Display Comments */}
      {comments.length > 0 && (
        <div className="space-y-2">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-3 shadow"
            >
              <p className="text-sm text-gray-800">{comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentButton;
