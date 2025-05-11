"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./admin.module.css";
import TokenModal from "../components/TokenModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import ViewLeadModal from "../components/ViewLeadModal";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    leadId: null,
    leadName: '',
  });
  const [deleteStatus, setDeleteStatus] = useState({
    isDeleting: false,
    message: '',
    isError: false,
  });
  const [viewLead, setViewLead] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("adminToken");
    if (token) {
      // Validate token by fetching leads
      fetchLeads(token);
    } else {
      setShowTokenModal(true);
      setLoading(false);
    }
  }, []);

  const handleTokenSubmit = async (token) => {
    try {
      const validToken = await validateToken(token);
      if (validToken) {
        localStorage.setItem("adminToken", token);
        setIsAuthenticated(true);
        setShowTokenModal(false);
        fetchLeads(token);
      } else {
        setError("Invalid token. Please check and try again.");
      }
    } catch (error) {
      console.error("Token validation error:", error);
      setError("An error occurred during validation. Please try again.");
    }
  };

  const validateToken = async (token) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      return data.valid;
    } catch (error) {
      console.error("Error validating token:", error);
      return false;
    }
  };

  const fetchLeads = async (token) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          // Token is invalid or expired
          localStorage.removeItem("adminToken");
          setIsAuthenticated(false);
          setShowTokenModal(true);
          throw new Error("Invalid or expired token");
        }
        throw new Error("Failed to fetch leads");
      }

      const data = await response.json();
      setLeads(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching leads:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (lead) => {
    setDeleteConfirm({
      show: true,
      leadId: lead._id,
      leadName: lead.name,
    });
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({
      show: false,
      leadId: null,
      leadName: '',
    });
  };

  const handleDeleteConfirm = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token || !deleteConfirm.leadId) return;

    setDeleteStatus({
      isDeleting: true,
      message: '',
      isError: false,
    });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/${deleteConfirm.leadId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete lead: ${response.statusText}`);
      }

      // Update local state to remove the deleted lead
      setLeads(prevLeads => prevLeads.filter(lead => lead._id !== deleteConfirm.leadId));
      
      setDeleteStatus({
        isDeleting: false,
        message: 'Lead deleted successfully',
        isError: false,
      });

      // Reset delete confirmation
      setTimeout(() => {
        setDeleteConfirm({
          show: false,
          leadId: null,
          leadName: '',
        });
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setDeleteStatus({
            isDeleting: false,
            message: '',
            isError: false,
          });
        }, 3000);
      }, 500);

    } catch (error) {
      console.error("Error deleting lead:", error);
      setDeleteStatus({
        isDeleting: false,
        message: error.message || 'Error deleting lead',
        isError: true,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    setShowTokenModal(true);
    setLeads([]);
  };

  const handleViewClick = (lead) => {
    setViewLead(lead);
  };

  const handleViewClose = () => {
    setViewLead(null);
  };

  // Helper function to render truncated text with tooltip
  const renderTruncatedText = (text, length) => {
    if (!text) return "N/A";
    
    const truncated = text.length > length;
    const displayText = truncated ? `${text.substring(0, length)}...` : text;
    
    if (truncated) {
      return (
        <span className={styles.truncatedText} data-tooltip={text}>
          {displayText}
        </span>
      );
    }
    
    return displayText;
  };

  // Helper function to truncate text (for cases where we don't need the tooltip)
  const truncateText = (text, length) => {
    if (!text) return "N/A";
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      {showTokenModal && (
        <TokenModal
          onSubmit={handleTokenSubmit}
          error={error}
          setError={setError}
        />
      )}

      {deleteConfirm.show && (
        <DeleteConfirmModal
          leadName={deleteConfirm.leadName}
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          isDeleting={deleteStatus.isDeleting}
          error={deleteStatus.isError ? deleteStatus.message : null}
        />
      )}

      {viewLead && (
        <ViewLeadModal
          lead={viewLead}
          onClose={handleViewClose}
        />
      )}

      {isAuthenticated && (
        <>
          <div className={styles.adminHeader}>
            <h1 className={styles.adminTitle}>Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              Logout
            </button>
          </div>

          {deleteStatus.message && !deleteStatus.isError && (
            <div className={styles.successMessage}>
              {deleteStatus.message}
            </div>
          )}

          <div className={styles.leadsContainer}>
            <h2 className={styles.leadsTitle}>Leads</h2>
            {leads.length === 0 ? (
              <p className={styles.noLeads}>No leads found.</p>
            ) : (
              <table className={styles.leadsTable}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead._id}>
                      <td>{renderTruncatedText(lead.name, 5)}</td>
                      <td>{renderTruncatedText(lead.email, 10)}</td>
                      <td>{renderTruncatedText(lead.phone, 5)}</td>
                      <td className={styles.messageCell}>
                        {renderTruncatedText(lead.message, 5)}
                      </td>
                      <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                      <td className={styles.actionCell}>
                        <button 
                          className={styles.viewButton}
                          onClick={() => handleViewClick(lead)}
                        >
                          View
                        </button>
                        <button 
                          className={styles.deleteButton}
                          onClick={() => handleDeleteClick(lead)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
} 