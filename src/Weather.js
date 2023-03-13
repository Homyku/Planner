import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import './Weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('Kraków');
  const [debouncedLocation] = useDebounce(location, 1500); 

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${debouncedLocation}&appid=61eeec7da35602672e741ef51624b8c9&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
    };
    fetchWeatherData();
  }, [debouncedLocation]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  

  return (
    <div className='weather-container'>
      <h2>Weather in<div className='location-input'>
        <input placeholder="Enter location" class="input-location" type='text' id='location' value={location} onChange={handleLocationChange} />
      </div></h2>
      <div className='weather-info'>
        {weatherData ? (
          <>
            <div className='temp'>{weatherData.main.temp.toFixed(1)}&#8451;</div>
            <div className='description'>{weatherData.weather[0].description}</div>
            <div className='icon'>
              <img
                src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
              />
              
            </div>
            
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      
      
    </div>
  );
};

export default Weather;
