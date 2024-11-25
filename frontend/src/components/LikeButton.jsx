import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

// LikeButton Component: ใช้สำหรับจัดการไลค์ในแต่ละโพสต์
function LikeButton({ postId, initialLikeCount }) {
  // State สำหรับเก็บสถานะไลค์และจำนวนไลค์
  const [liked, setLiked] = useState(false); // เก็บสถานะว่าโพสต์นี้ถูกไลค์หรือยัง
  const [likeCount, setLikeCount] = useState(initialLikeCount || 0); // เก็บจำนวนไลค์ (ค่าเริ่มต้นคือ 0)

  // ใช้ useEffect เพื่อโหลดข้อมูลไลค์เมื่อคอมโพเนนต์ถูกสร้าง
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const token = localStorage.getItem('token'); // ดึง Token ผู้ใช้จาก Local Storage
        const response = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }, // ส่ง Token เพื่อยืนยันตัวตน
        });

        if (!response.ok) {
          throw new Error('Failed to fetch likes'); // ถ้าดึงข้อมูลล้มเหลว
        }

        const data = await response.json(); // แปลงข้อมูลที่ได้จาก API เป็น JSON
        setLikeCount(data.likeCount); // อัปเดตจำนวนไลค์จาก API
        setLiked(data.userLiked); // อัปเดตสถานะว่าโพสต์นี้ผู้ใช้นี้เคยไลค์หรือยัง
      } catch (error) {
        console.error('Error fetching likes:', error); // แสดงข้อผิดพลาดใน Console
      }
    };

    fetchLikes(); // เรียกใช้งานฟังก์ชันดึงข้อมูลไลค์
  }, [postId]); // ทำงานอีกครั้งถ้า postId เปลี่ยน

  // ฟังก์ชันสำหรับจัดการการไลค์หรือเลิกไลค์
  const handleLike = async () => {
    const token = localStorage.getItem('token'); // ดึง Token ผู้ใช้
    if (!token) {
      alert('Please log in to like posts'); // ถ้าไม่มี Token ให้แจ้งเตือน
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }, // ส่ง Token ไปกับคำขอ
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message); // ถ้ามีข้อผิดพลาดให้แจ้งเตือนผู้ใช้
        return;
      }

      const data = await response.json(); // แปลงข้อมูลจาก API เป็น JSON
      setLiked(!liked); // สลับสถานะไลค์ (ถ้าเคยไลค์ -> เลิกไลค์, ถ้ายังไม่เคย -> ไลค์)
      setLikeCount(data.likeCount); // อัปเดตจำนวนไลค์จาก API
    } catch (error) {
      console.error('Error liking/unliking post:', error); // แสดงข้อผิดพลาดใน Console
    }
  };

  return (
    <div>
      {/* ปุ่มไลค์ */}
      <button
        onClick={handleLike} // เรียกใช้ฟังก์ชัน handleLike เมื่อคลิก
        className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition ${
          liked
            ? 'bg-blue-500 text-white hover:bg-blue-600' // ถ้าไลค์แล้ว: สีฟ้า
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300' // ถ้ายังไม่ไลค์: สีเทา
        }`}
      >
        {/* ไอคอนหัวใจ */}
        <FontAwesomeIcon
          icon={faHeart}
          className={`transition-transform ${
            liked ? 'scale-110 text-red-500' : 'text-gray-500' // ถ้าไลค์แล้วหัวใจเป็นสีแดง
          }`}
        />
        {/* แสดงจำนวนไลค์ */}
        <span>{likeCount}</span>
      </button>
    </div>
  );
}

export default LikeButton;
