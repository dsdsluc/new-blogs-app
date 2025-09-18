import React from "react";
import Weather from "./Weather";
import Calender from "./Calender";
import "./News.css";
import userImage from "../assets/images/user.jpg";
import techImage from "../assets/images/tech.jpg";
import sportImage from "../assets/images/sport.jpg";
import scienceImage from "../assets/images/science.jpg";
import worldImage from "../assets/images/world.jpg";
import healthImage from "../assets/images/health.jpg";
import nationsImage from "../assets/images/nations.jpg";

function News() {
  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">News & Blogs</h1>
        <div className="search-bar">
          <form action="">
            <input type="text" placeholder="Search News..." />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news-content">
        <div className="nav-bar">
          <div className="user">
            <img src={userImage} alt="User Image" />
            <p>Mary Blogs</p>
          </div>
          <div className="categories">
            <h1 className="nav-heading"> Categories</h1>
            <div className="nav-links">
              <a href="#" className="nav-link">
                General
              </a>
              <a href="#" className="nav-link">
                World
              </a>
              <a href="#" className="nav-link">
                Business
              </a>
              <a href="#" className="nav-link">
                Technology
              </a>
              <a href="#" className="nav-link">
                Sports
              </a>
              <a href="#" className="nav-link">
                Science
              </a>
              <a href="#" className="nav-link">
                Nation
              </a>
              <a href="#" className="nav-link">
                BookMarks <i className="fa-regular fa-bookmark"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="news-section">
          <div className="headline">
            <img src={techImage} alt="Headline Image" />
            <h2 className="headline-title">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
              <i className="fa-regular fa-bookmark bookmark"></i>
            </h2>
          </div>
          <div className="news-grid">
            <div className="news-grid-item">
              <img src={techImage} alt="News Image" />
              <h3>
                Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
            <div className="news-grid-item">
              <img src={sportImage} alt="News Image" />
              <h3>
                Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
            <div className="news-grid-item">
              <img src={scienceImage} alt="News Image" />
              <h3>
                Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
            <div className="news-grid-item">
              <img src={worldImage} alt="News Image" />
              <h3>
                Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
            <div className="news-grid-item">
              <img src={healthImage} alt="News Image" />
              <h3>
                Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
            <div className="news-grid-item">
              <img src={nationsImage} alt="News Image" />
              <h3>
                Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
          </div>
        </div>
        <div className="my-blogs">My Blogs</div>
        <div className="weather-calender">
          <Weather />
          <Calender />
        </div>
      </div>
      <footer className="news-footer">Footer</footer>
    </div>
  );
}

export default News;
