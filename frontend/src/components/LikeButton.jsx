import React, { useState } from 'react';

function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition ${
        liked
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 transition-transform ${
          liked ? 'scale-110 fill-blue-500' : 'fill-gray-500'
        }`}
        viewBox="0 0 24 24"
      >
        <path d="M14 9V5c0-1.7-1.3-3-3-3s-3 1.3-3 3v4H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2h-3zm-1 0h-4V5c0-.5.5-1 1-1s1 .5 1 1v4z" />
      </svg>
      <span>{likeCount}</span>
    </button>
  );
}

export default LikeButton;
