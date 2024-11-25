import React from 'react';
import axios from 'axios';

const DeleteButton = ({ postId, isOwner, isAdmin, onPostDeleted }) => {
  // ซ่อนปุ่มลบหากไม่ใช่เจ้าของโพสต์และไม่ใช่แอดมิน
  if (!isOwner && !isAdmin) {
    return null;
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Post deleted successfully.');
      if (onPostDeleted) {
        onPostDeleted(postId); // อัปเดต State ใน Component Parent
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 15px',
        cursor: 'pointer',
      }}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
