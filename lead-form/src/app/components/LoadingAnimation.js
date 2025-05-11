import React from 'react';
import styles from '../page.module.css';

const LoadingAnimation = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}>
        <div className={styles.spinnerCircle}></div>
      </div>
      <p className={styles.loadingText}>Sending your information...</p>
    </div>
  );
};

export default LoadingAnimation; 