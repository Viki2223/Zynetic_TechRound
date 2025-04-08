import React from 'react';
import styles from './RecentSearches.module.css';

const RecentSearches = ({ searches, onSearch }) => {
  if (!searches.length) return null;
  console.log("RecentSearches:", RecentSearches);
  return (
    <div className={styles.recentSearchesContainer}>
      <h2 className={styles.title}>Recent Searches:</h2>
      <ul className={styles.list}>
        {searches.map((search, i) => (
          <li key={i} className={styles.listItem}>
            <button onClick={() => onSearch(search)} className={styles.button}>
              {search}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;
