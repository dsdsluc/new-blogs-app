import React from "react";
import "./NewModal.css";
import "./Modal.css";

const NewModal = ({ show, article, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // tránh đóng modal khi click bên trong
      >
        {/* Close button */}
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>

        {/* Modal Image */}
        <img
          src={article?.image || "https://via.placeholder.com/600x400"}
          alt={article?.title || "News Image"}
          className="modal-image"
        />

        {/* Modal Title */}
        <h2 className="modal-title">{article?.title || "No Title"}</h2>

        {/* Source & Date */}
        <p className="modal-source">
          Source: {article?.source?.name || "Unknown"}
        </p>
        <p className="modal-date">
          {article?.publishedAt?.slice(0, 10) || "Unknown Date"}
        </p>

        {/* Content */}
        <p className="modal-content-text">
          {article?.content || "No content available."}
        </p>

        {/* Read More link */}
        {article?.url && (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="read-more-link"
          >
            Read More
          </a>
        )}
      </div>
    </div>
  );
};

export default NewModal;
