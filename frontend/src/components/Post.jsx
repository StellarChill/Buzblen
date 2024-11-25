import React, { useState, useEffect } from 'react';
import CommentButton from './CommentButton';
import LikeButton from './likebutton';
import DeleteButton from './DeleteButton';

function PostForm() {
  // จัดการสถานะต่าง ๆ ของฟอร์มและโพสต์
  const [text, setText] = useState(''); // เก็บข้อความที่กรอกในฟอร์ม
  const [image, setImage] = useState(null); // เก็บไฟล์รูปภาพที่อัปโหลด
  const [posts, setPosts] = useState([]); // เก็บข้อมูลโพสต์ทั้งหมด
  const [error, setError] = useState(''); // เก็บข้อความข้อผิดพลาด
  const [loading, setLoading] = useState(false); // สถานะโหลดข้อมูล
  const [currentUser, setCurrentUser] = useState({ id: null, role: null }); // เก็บข้อมูลผู้ใช้ที่ล็อกอิน

  // เมื่อโหลดหน้าครั้งแรก จะดึงข้อมูลผู้ใช้และโพสต์
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // ดึงข้อมูลผู้ใช้จาก JWT
      const decoded = JSON.parse(atob(token.split('.')[1])); // ถอดรหัส JWT Payload
      setCurrentUser({ id: decoded.id, role: decoded.role });
    }

    // ดึงข้อมูลโพสต์จากเซิร์ฟเวอร์
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/posts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setPosts(data.posts); // อัปเดตโพสต์ใน state
        } else {
          setError(data.error || 'Failed to fetch posts.');
        }
      } catch (err) {
        setError('Error fetching posts. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // ฟังก์ชันเมื่อโพสต์ถูกลบ
  const handlePostDeleted = (deletedPostId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.PostID !== deletedPostId));
  };

  // ฟังก์ชันเมื่อมีการกรอกข้อความในฟอร์ม
  const handleTextChange = (e) => setText(e.target.value);

  // ฟังก์ชันเมื่อเลือกไฟล์รูปภาพ
  const handleImageChange = (e) => setImage(e.target.files[0]);

  // ฟังก์ชันเมื่อส่งฟอร์มโพสต์
  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    setError('');
    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in first.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('postDescription', text); // เพิ่มข้อความในฟอร์ม
    if (image) formData.append('image', image); // เพิ่มรูปภาพในฟอร์ม

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setPosts((prevPosts) => [data.post, ...prevPosts]); // เพิ่มโพสต์ใหม่ใน state
        setText(''); // ล้างฟอร์มข้อความ
        setImage(null); // ล้างฟอร์มรูปภาพ
      } else {
        setError(data.error || 'Error creating post.');
      }
    } catch (err) {
      setError('Error submitting post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      {/* ส่วนของฟอร์มโพสต์ */}
      <form
        onSubmit={handleSubmit}
        method="post"
        encType="multipart/form-data"
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="post-text"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Your Post
          </label>
          <textarea
            id="post-text"
            value={text}
            onChange={handleTextChange}
            className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            placeholder="What's on your mind?"
            rows={4}
            required
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="post-image"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="post-image"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
          />
        </div>
        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
        <button
          type="submit"
          className={`w-full py-2 px-4 text-white text-lg font-medium rounded-lg ${
            loading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
          }`}
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>

      {/* ส่วนของการแสดงโพสต์ */}
      <div>
        {loading && <p className="text-center text-gray-500">Loading posts...</p>}
        {posts.length > 0 ? (
          <ul className="space-y-6">
            {posts.map((post) => {
              const isOwner = post.EmployeeID === currentUser.id; // เช็คว่าเป็นเจ้าของโพสต์
              const isAdmin = currentUser.role === 'admin'; // เช็คว่าเป็นแอดมิน

              return (
                <li
                  key={post.PostID}
                  className="p-6 bg-gray-50 rounded-lg shadow border border-gray-200"
                >
                  {/* คำอธิบายโพสต์ */}
                  <p className="text-lg font-semibold text-gray-800 mb-3">
                    {post.PostDescription}
                  </p>

                  {/* รูปภาพโพสต์ */}
                  {post.ImageURL && (
                    <img
                      src={`http://localhost:5000${post.ImageURL}`}
                      alt="Post"
                      className="w-full h-auto rounded-lg mb-4 shadow-md"
                    />
                  )}

                  {/* ปุ่มต่าง ๆ */}
                  <div className="flex items-center justify-between space-x-4 mt-4">
                    <LikeButton postId={post.PostID} /> {/* ปุ่มไลค์ */}
                    <CommentButton postId={post.PostID} /> {/* ปุ่มคอมเมนต์ */}
                    <DeleteButton
                      postId={post.PostID}
                      isOwner={isOwner}
                      isAdmin={isAdmin}
                      onPostDeleted={handlePostDeleted}
                    /> {/* ปุ่มลบโพสต์ */}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No posts yet. Start sharing your thoughts!</p>
        )}
      </div>
    </div>
  );
}

export default PostForm;
