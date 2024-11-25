import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function LikeButton({ postId, initialLikeCount }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount || 0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch likes');
        }

        const data = await response.json();
        setLikeCount(data.likeCount);
        setLiked(data.userLiked);
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    fetchLikes();
  }, [postId]);

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to like posts');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message);
        return;
      }

      const data = await response.json();
      setLiked(!liked);
      setLikeCount(data.likeCount);
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  return (
    <div>
      <button
        onClick={handleLike}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition ${
          liked
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        <FontAwesomeIcon
          icon={faHeart}
          className={`transition-transform ${
            liked ? 'scale-110 text-red-500' : 'text-gray-500'
          }`}
        />
        <span>{likeCount}</span>
      </button>
    </div>
  );
}

export default LikeButton;
