import React from 'react';
import styles from './DeleteConfirmModal.module.css';

const DeleteConfirmModal = ({ leadName, onCancel, onConfirm, isDeleting, error }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Confirm Delete</h2>
        
        <p className={styles.modalMessage}>
          Are you sure you want to delete the lead from <strong>{leadName}</strong>?<br />
          This action cannot be undone.
        </p>
        
        {error && <p className={styles.errorMessage}>{error}</p>}
        
        <div className={styles.buttonContainer}>
          <button 
            className={styles.cancelButton}
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </button>
          
          <button 
            className={styles.deleteButton}
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal; 