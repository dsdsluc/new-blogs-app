import React from "react";
import "./Weather.css";

const Weather = () => {
  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">Tbsiis</div>
        </div>
        <div className="search-location">
          <input type="text" placeholder="Enter Location" />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div className="weather-data">
        <i className="bx bxs-sun"></i>
        <div className="weather-type">Clear</div>
        <div className="temp">25°C</div>
      </div>
    </div>
  );
};

export default Weather;
