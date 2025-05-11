import React from 'react';
import styles from './ViewLeadModal.module.css';

const ViewLeadModal = ({ lead, onClose }) => {
  if (!lead) return null;
  
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Lead Details</h2>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        
        <div className={styles.leadDetails}>
          <div className={styles.detailRow}>
            <div className={styles.detailLabel}>Name:</div>
            <div className={styles.detailValue}>{lead.name}</div>
          </div>
          
          <div className={styles.detailRow}>
            <div className={styles.detailLabel}>Email:</div>
            <div className={styles.detailValue}>{lead.email}</div>
          </div>
          
          <div className={styles.detailRow}>
            <div className={styles.detailLabel}>Phone:</div>
            <div className={styles.detailValue}>{lead.phone || "Not provided"}</div>
          </div>
          
          <div className={styles.detailRow}>
            <div className={styles.detailLabel}>Message:</div>
            <div className={styles.detailValue}>
              <div className={styles.messageBox}>
                {lead.message || "Not provided"}
              </div>
            </div>
          </div>
          
          <div className={styles.detailRow}>
            <div className={styles.detailLabel}>Created:</div>
            <div className={styles.detailValue}>
              {new Date(lead.createdAt).toLocaleString()}
            </div>
          </div>
          
          {lead.updatedAt && lead.updatedAt !== lead.createdAt && (
            <div className={styles.detailRow}>
              <div className={styles.detailLabel}>Last Updated:</div>
              <div className={styles.detailValue}>
                {new Date(lead.updatedAt).toLocaleString()}
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.buttonContainer}>
          <button 
            className={styles.closeModalButton}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewLeadModal; 