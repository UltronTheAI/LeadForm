import React, { useState } from 'react';
import styles from './TokenModal.module.css';

const TokenModal = ({ onSubmit, error, setError }) => {
  const [token, setToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token.trim()) {
      setError('Please enter a token');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await onSubmit(token);
    } catch (err) {
      // Error is handled in the parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Admin Authentication</h2>
        <p className={styles.modalDescription}>
          Please enter your admin token to access the dashboard.
        </p>
        
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="token" className={styles.formLabel}>
              Admin Token
            </label>
            <input
              type="password"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter your admin token"
              className={styles.formInput}
              disabled={isSubmitting}
            />
          </div>
          
          {error && <p className={styles.errorMessage}>{error}</p>}
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Verifying...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TokenModal; 