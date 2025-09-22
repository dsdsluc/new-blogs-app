import React from "react";
import "./Modal.css";
import "./Bookmark.css";

function Bookmark({
  show,
  bookmarks,
  onClose,
  onSelectArticle,
  onDeleteBookmark,
}) {
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

        <h2 className="bookmarks-heading">Bookmarked News</h2>

        {/* List of bookmarks */}
        <div className="bookmarks-list">
          {bookmarks.length === 0 && <p>No bookmarks yet.</p>}
          {bookmarks.map((article, index) => (
            <div className="bookmarks-item" key={index}>
              <img
                src={article.image || "https://via.placeholder.com/150"}
                alt={article.title}
                onClick={() => onSelectArticle(article)}
              />
              <h3 onClick={() => onSelectArticle(article)}>{article.title}</h3>
              <span
                className="delete-button"
                onClick={() => onDeleteBookmark(article)}
              >
                <i className="fa-regular fa-circle-xmark"></i>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Bookmark;
