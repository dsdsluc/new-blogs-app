import React from "react";
import "./BlogModal.css";

const BlogsModal = ({ blog, onClose }) => {
  if (!blog) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>

        {blog.image && (
          <img src={blog.image} alt={blog.title} className="blogs-modal-img" />
        )}

        {/* Tiêu đề */}
        <h2 className="blogs-modal-title">{blog.title}</h2>

        {/* Nội dung */}
        <p className="blogs-modal-content">{blog.content}</p>

        {/* Ngày tạo */}
        <p className="blogs-modal-date">
          <i className="fa-regular fa-clock"></i> {blog.createdAt}
        </p>
      </div>
    </div>
  );
};

export default BlogsModal;
