// src/components/WeatherHistory.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, subDays } from 'date-fns';
import Content from './Content';

const WeatherHistory = ({ city }) => {
  const [weatherData, setWeatherData] = useState([]);


  useEffect(() => {
    const fetchWeatherData = async () => {
      const today = new Date();
      const tempData = [];

      for (let i = 1; i <= 5; i++) {
        const date = format(subDays(today, i), 'yyyy-MM-dd');
        const url = `https://api.weatherapi.com/v1/history.json?key=48aaf386535449c785251922242505&q=ahmedabad&dt=${date}`;
        try {
          const response = await axios.get(url);
          tempData.push(response.data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      }

      // Set the state after all data is fetched
      setWeatherData(tempData);
      console.log(tempData)
    };

    fetchWeatherData();
  }, [city]);

  return (
    <div>
      <h1>Weather History for {city}</h1>
     
      {/* {weatherData.map((dayData, index) => (
       
        <div key={index}>
          <h2>{dayData.forecast.forecastday[0].date}</h2>
          <p>Max Temp: {dayData.forecast.forecastday[0].day.maxtemp_c}°C</p>
          <p>Min Temp: {dayData.forecast.forecastday[0].day.mintemp_c}°C</p>
          <p>Condition: {dayData.forecast.forecastday[0].day.condition.text}</p>
        </div>
      ))} */}
      <Content weatherData={weatherData} />
    </div>
  );
};

export default WeatherHistory;
