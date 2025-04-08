import React from 'react';
import styles from './WeatherInfo.module.css';

const WeatherInfo = ({ data }) => {
  console.log("WeatherInfo:", WeatherInfo);
  return (
    <div className={styles.weatherInfo}>
      <div className={styles.name}>{data.name}, {data.sys.country}</div>
      <div className={styles.iconTempContainer}>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="Weather icon"
          className={styles.weatherIcon}
        />
        <div className={styles.temperature}>{Math.round(data.main.temp)}°C</div>
      </div>
      <div className={styles.description}>{data.weather[0].description}</div>
      <div className={styles.detailsGrid}>
        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>Humidity</div>
          <div className={styles.detailValue}>{data.main.humidity}%</div>
        </div>
        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>Wind</div>
          <div className={styles.detailValue}>{data.wind.speed} m/s</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
