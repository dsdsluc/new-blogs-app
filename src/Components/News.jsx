import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import Calender from "./Calender";
import "./News.css";
import userImage from "../assets/images/user.jpg";
import noImage from "../assets/images/no-img.jpg";

import axios from "axios";
import NewModal from "./NewModal";
import Bookmark from "./Bookmark";

const categoriesList = [
  "general",
  "world",
  "business",
  "technology",
  "sports",
  "science",
  "nation",
];

const News = () => {
  const [headlines, setHeadlines] = useState(null);
  const [news, setNews] = useState([]);
  const [useModal, setUseModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [category, setCategory] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");

  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
  });
  const [showBookmarks, setShowBookmarks] = useState(false);

  // Fetch news mỗi khi category thay đổi
  useEffect(() => {
    if (!searchTerm) {
      fetchNewsByCategory(category);
    }
  }, [category]);

  // Fetch tin tức theo category
  const fetchNewsByCategory = async (cat) => {
    try {
      const url = `https://gnews.io/api/v4/top-headlines?category=${cat}&lang=en&apikey=927c74ce76ff8aaaff05f32767f004bb`;
      const response = await axios.get(url);
      const fetchedNews = response.data.articles;

      fetchedNews.forEach((article) => {
        if (!article.image) {
          article.image = noImage;
        }
      });

      setHeadlines(fetchedNews[0]);
      setNews(fetchedNews.slice(1, 7));
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  // Fetch tin tức theo search term
  const fetchNewsBySearch = async (query) => {
    try {
      const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&apikey=927c74ce76ff8aaaff05f32767f004bb`;
      const response = await axios.get(url);
      const fetchedNews = response.data.articles;

      fetchedNews.forEach((article) => {
        if (!article.image) {
          article.image = noImage;
        }
      });

      setHeadlines(fetchedNews[0]);
      setNews(fetchedNews.slice(1, 7));
    } catch (error) {
      console.error("Error fetching search news:", error);
    }
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setUseModal(true);
    setShowBookmarks(false);
  };

  const handleCategoryClick = (cat) => {
    setCategory(cat);
    setSearchTerm("");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      fetchNewsBySearch(searchTerm);
    }
  };

  const handleBookmarkClick = (article) => {
    setBookmarks((prevBookmarks) => {
      const exists = prevBookmarks.find(
        (bookmark) => bookmark.title === article.title
      );

      if (exists) {
        // Nếu đã có, bỏ khỏi bookmarks
        return prevBookmarks.filter(
          (bookmark) => bookmark.title !== article.title
        );
      } else {
        localStorage.setItem(
          "bookmarks",
          JSON.stringify([...prevBookmarks, article])
        );
        return [...prevBookmarks, article];
      }
    });
  };

  // Cập nhật localStorage mỗi khi bookmarks thay đổi
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  return (
    <div className="news">
      {/* Header */}
      <header className="news-header">
        <h1 className="logo">News & Blogs</h1>
        <div className="search-bar">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search News..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <div className="news-content">
        {/* Sidebar */}
        <aside className="nav-bar">
          <div className="user">
            <img src={userImage} alt="User Image" />
            <p>Mary Blogs</p>
          </div>
          <div className="categories">
            <h2 className="nav-heading">Categories</h2>
            <div className="nav-links">
              {categoriesList.map((cat) => (
                <a
                  href="#"
                  key={cat}
                  className={`nav-link ${category === cat ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick(cat);
                  }}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </a>
              ))}
              <a
                href="#"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  setShowBookmarks(true);
                }}
              >
                BookMarks <i className="fa-solid fa-bookmark"></i>
              </a>
            </div>
          </div>
        </aside>

        {/* News Section */}
        <section className="news-section">
          {headlines && (
            <div
              className="headline"
              onClick={() => handleArticleClick(headlines)}
            >
              <img src={headlines.image} alt={headlines.title} />
              <h2 className="headline-title">
                {headlines.title}
                <i
                  className={`fa-bookmark bookmark ${
                    bookmarks.some(
                      (bookmark) => bookmark.title === headlines.title
                    )
                      ? "fa-solid"
                      : "fa-regular"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmarkClick(headlines);
                  }}
                ></i>
              </h2>
            </div>
          )}

          <div className="news-grid">
            {news.map((article, index) => (
              <div
                className="news-grid-item"
                key={index}
                onClick={() => handleArticleClick(article)}
              >
                <img src={article.image} alt={article.title} />
                <h3>
                  {article.title}
                  <i
                    className={`fa-bookmark bookmark ${
                      bookmarks.some(
                        (bookmark) => bookmark.title === article.title
                      )
                        ? "fa-solid"
                        : "fa-regular"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarkClick(article);
                    }}
                  ></i>
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Modal */}
        <NewModal
          show={useModal}
          article={selectedArticle}
          onClose={() => setUseModal(false)}
        />
        <Bookmark
          show={showBookmarks}
          bookmarks={bookmarks}
          onClose={() => setShowBookmarks(false)}
          onSelectArticle={handleArticleClick}
          onDeleteBookmark={handleBookmarkClick}
        />

        {/* My Blogs */}
        <div className="my-blogs">My Blogs</div>

        {/* Weather & Calendar */}
        <div className="weather-calender">
          <Weather />
          <Calender />
        </div>
      </div>

      {/* Footer */}
      <footer className="news-footer">Footer</footer>
    </div>
  );
};

export default News;
