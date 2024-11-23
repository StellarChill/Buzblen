import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

function CommentButton({ postId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}/comments`
      );
      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to post a comment');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ commentText: comment }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setComments([...comments, data.comment]);
        setComment('');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => setShowComments(!showComments)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium shadow-md transition"
      >
        <FontAwesomeIcon icon={faCommentDots} className="text-blue-500" />
        <span>{showComments ? 'Hide Comments' : 'Show Comments'}</span>
      </button>

      {showComments && (
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.CommentID}
                className="bg-gray-100 border border-gray-300 p-3 rounded-lg shadow-sm"
              >
                <p className="text-sm text-gray-800">{comment.CommentText}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No comments yet. Be the first!</p>
          )}

          <form
            onSubmit={handleCommentSubmit}
            className="flex flex-col space-y-3 bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200"
          >
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              required
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              rows="3"
            ></textarea>
            <button
              type="submit"
              className="self-end px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition"
            >
              Post Comment
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CommentButton;
