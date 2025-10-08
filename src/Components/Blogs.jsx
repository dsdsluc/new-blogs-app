import React, { useState } from "react";
import userImg from "../assets/images/user.jpg";
import "./Blogs.css";

const Blogs = ({ onBack, onCreateBlog }) => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // --- Xử lý khi chọn ảnh ---
  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file); // tạo base64 preview
    }
  };

  // --- Xử lý khi bấm Submit ---
  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      image: image,
      createdAt: new Date().toLocaleString(),
    };

    onCreateBlog(newBlog);

    setTitle("");
    setContent("");
    setImage(null);
    setShowForm(false);
    setSubmitted(true);

    // Ẩn thông báo sau 2 giây
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className="blogs">
      {/* --- LEFT SIDE --- */}
      <div className="blogs-left">
        <img src={userImg} alt="User" className="user-img" />
      </div>

      {/* --- RIGHT SIDE --- */}
      <div className={`blogs-right ${!showForm ? "centered" : ""}`}>
        {/* Nút quay lại */}
        <button className="blogs-close-btn" onClick={onBack}>
          Back <i className="bx bx-chevron-right"></i>
        </button>

        {/* --- CONDITIONAL RENDER --- */}
        {showForm ? (
          <div className="blogs-right-form">
            <h1>New Post</h1>

            <form onSubmit={handleSubmit}>
              {/* Upload Image */}
              <div className="img-upload">
                <label htmlFor="file-upload" className="file-upload">
                  <i className="bx bx-image"></i> Upload Image
                </label>
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {/* Preview ảnh */}
                {image && (
                  <img
                    src={image}
                    alt="Preview"
                    className="preview-img"
                    style={{ marginTop: "1rem", borderRadius: "0.5rem" }}
                  />
                )}
              </div>

              {/* Title */}
              <input
                type="text"
                placeholder="Add Title (max 60 characters)"
                className="title-input"
                maxLength="60"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              {/* Content */}
              <textarea
                name="text-input"
                placeholder="Write your post here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>

              {/* Submit Button */}
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
          </div>
        ) : (
          <>
            {!submitted && (
              <button className="post-btn" onClick={() => setShowForm(true)}>
                Create New Post
              </button>
            )}

            {submitted && (
              <p className="submit-success"> Blog created successfully!</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blogs;
