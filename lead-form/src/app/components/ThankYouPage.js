import React from 'react';
import styles from '../page.module.css';

const ThankYouPage = ({ onReset, wasUpdated }) => {
  return (
    <div className={styles.thankYouContainer}>
      <div className={styles.checkmarkContainer}>
        <div className={styles.checkmark}>✓</div>
      </div>
      <h2 className={styles.thankYouTitle}>Application Received!</h2>
      <p className={styles.thankYouMessage}>
        {wasUpdated 
          ? "Your application information has been updated successfully. Our HR team will review your updated details and contact you soon." 
          : "Your job application has been successfully submitted. Our HR team will review your application and contact you about part-time opportunities that match your profile."}
      </p>
      <button 
        className={styles.resetButton}
        onClick={onReset}
      >
        Submit Another Application
      </button>
    </div>
  );
};

export default ThankYouPage; 