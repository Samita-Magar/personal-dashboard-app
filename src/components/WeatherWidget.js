import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = ({ apiKey }) => {
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            lat: latitude,
            lon: longitude,
            appid: apiKey,
            units: 'metric',
          },
        });

        setWeather(weatherResponse.data);
        setLocationName(weatherResponse.data.name);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    // Get user's current location using geolocation
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          (error) => {
            console.error('Error getting geolocation:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, [apiKey]);

  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  };

  return (
    <div className="widget weather-widget">
      {weather && (
        <>
          <h2>Current Weather in {locationName}</h2>
          <div className="weather-details">
            <p>{weather.weather[0].description}</p>
            <img
              src={getWeatherIconUrl(weather.weather[0].icon)}
              alt={weather.weather[0].description}
            />
            <p>Temperature: {`${Math.round(weather.main.temp)}°C`}</p>
            <p>Feels Like: {`${Math.round(weather.main.feels_like)}°C`}</p>
            <p>Humidity: {`${weather.main.humidity}%`}</p>
            <p>Wind Speed: {`${weather.wind.speed} m/s`}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;
