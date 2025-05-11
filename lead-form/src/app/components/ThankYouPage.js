import React from 'react';
import styles from '../page.module.css';

const ThankYouPage = ({ onReset, wasUpdated }) => {
  return (
    <div className={styles.thankYouContainer}>
      <div className={styles.checkmarkContainer}>
        <div className={styles.checkmark}>✓</div>
      </div>
      <h2 className={styles.thankYouTitle}>Thank You!</h2>
      <p className={styles.thankYouMessage}>
        {wasUpdated 
          ? "Your information has been updated successfully. We'll use this updated information to contact you." 
          : "Your form has been successfully submitted. We appreciate your interest and will get back to you soon."}
      </p>
      <button 
        className={styles.resetButton}
        onClick={onReset}
      >
        Submit Another Form
      </button>
    </div>
  );
};

export default ThankYouPage; 