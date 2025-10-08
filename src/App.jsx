import React, { useState, useEffect } from "react";
import News from "./Components/News";
import Blogs from "./Components/Blogs";

function App() {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogs, setBlogs] = useState(() => {
    const stored = localStorage.getItem("blogs");
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  const handleCreateBlog = (newBlog) => {
    setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
  };

  const handleShowBlogs = () => {
    setShowBlogs(true);
    setShowNews(false);
  };

  const handleDeleteBlog = (id) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
  };

  const handleShowNews = () => {
    setShowBlogs(false);
    setShowNews(true);
  };

  return (
    <div className="container">
      <div className="news-blog-app">
        {showNews && (
          <News
            onShowBlogs={handleShowBlogs}
            blogs={blogs}
            onDeleteBlog={handleDeleteBlog}
          />
        )}
        {showBlogs && (
          <Blogs onBack={handleShowNews} onCreateBlog={handleCreateBlog} />
        )}
      </div>
    </div>
  );
}

export default App;
