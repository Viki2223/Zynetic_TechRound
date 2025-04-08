import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './WeatherDashboard.module.css';
import SearchBar from './SearchBar';
import WeatherInfo from './WeatherInfo';
import RecentSearches from './RecentSearches';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const MAX_RECENT_SEARCHES = 5;

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentWeatherSearches');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('recentWeatherSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const res = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      });
      setWeatherData(res.data);
      setRecentSearches(prev => {
        const updated = [city, ...prev.filter(c => c !== city)];
        return updated.slice(0, MAX_RECENT_SEARCHES);
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Weather Dashboard</h1>
      <SearchBar onSearch={fetchWeatherData} />
      <RecentSearches searches={recentSearches} onSearch={fetchWeatherData} />
      {loading && <p className={styles.loading}>Loading weather data...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      {weatherData && !loading && <WeatherInfo data={weatherData} />}
    </div>
  );
};

export default WeatherDashboard;
