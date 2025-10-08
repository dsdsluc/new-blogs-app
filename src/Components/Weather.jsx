import React, { useEffect } from "react";
import "./Weather.css";
import axios from "axios";

const Weather = () => {
  const [data, setData] = React.useState(null);
  const [location, setLocation] = React.useState("");

  const API_KEY = "0857bdfbf9822bcb5f4d0f481d5e160a";

  useEffect(() => {
    const fetchDefaultLocation = async () => {
      const defaultLocation = "Hanoi";
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&appid=${API_KEY}&units=metric`;
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching default location", error);
        setData({ notFound: true });
      }
    };
    fetchDefaultLocation();
  }, []);

  const search = async () => {
    if (!location) return;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      // cod là number, không phải string
      if (response.data.cod === 200) {
        setData(response.data);
        setLocation("");
      } else {
        setData({ notFound: true });
      }
    } catch (error) {
      console.error("City not found", error);
      setData({ notFound: true });
    }
  };

  const handleInChangeLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const getWeatherIcon = (weatherType) => {
    let iconClass;
    switch (weatherType) {
      case "Clear":
        iconClass = "fa-solid fa-sun";
        break;
      case "Clouds":
        iconClass = "fa-solid fa-cloud";
        break;
      case "Rain":
        iconClass = "fa-solid fa-cloud-showers-heavy";
        break;
      case "Snow":
        iconClass = "fa-solid fa-snowflake";
        break;
      case "Thunderstorm":
        iconClass = "fa-solid fa-bolt";
        break;
      case "Drizzle":
        iconClass = "fa-solid fa-cloud-rain";
        break;
      default:
        iconClass = "fa-solid fa-smog";
    }

    return <i className={iconClass}></i>;
  };

  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">
            {data?.notFound
              ? "City not found"
              : data
              ? data.name
              : "No location"}
          </div>
        </div>
        <div className="search-location">
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={handleInChangeLocation}
            onKeyDown={handleKeyDown}
          />
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>

      {data && !data.notFound && (
        <div className="weather-data">
          {/* Icon thời tiết động */}
          {getWeatherIcon(data.weather[0].main)}
          <div className="weather-type">{data.weather[0].main}</div>
          <div className="temp">{Math.round(data.main.temp)}°C</div>
        </div>
      )}

      {data?.notFound && <div className="weather-notfound">City not found</div>}
    </div>
  );
};

export default Weather;
