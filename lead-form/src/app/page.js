"use client";

import { useState } from "react";
import styles from "./page.module.css";
import LoadingAnimation from "./components/LoadingAnimation";
import ThankYouPage from "./components/ThankYouPage";
import JsonLd from "./components/JsonLd";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  
  const [formState, setFormState] = useState({
    view: "form", // 'form', 'loading', or 'thankYou'
    error: false,
    errorMessage: "",
    wasUpdated: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({
      ...formState,
      view: "loading",
      error: false,
      errorMessage: "",
    });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      
      // Determine if this was an update or a new submission
      const wasUpdated = response.status === 200;
      
      // Simulate a slight delay for better UX
      setTimeout(() => {
        setFormState({
          ...formState,
          view: "thankYou",
          error: false,
          wasUpdated: wasUpdated,
        });
      }, 1000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormState({
        ...formState,
        view: "form",
        error: true,
        errorMessage: "Something went wrong. Please try again later.",
      });
    }
  };
  
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setFormState({
      view: "form",
      error: false,
      errorMessage: "",
      wasUpdated: false,
    });
  };

  const renderFormContent = () => {
    switch (formState.view) {
      case "loading":
        return <LoadingAnimation />;
      case "thankYou":
        return <ThankYouPage 
          onReset={resetForm} 
          wasUpdated={formState.wasUpdated} 
        />;
      case "form":
      default:
        return (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your email address"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone (optional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message (optional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                className={styles.textarea}
                rows="4"
              ></textarea>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={formState.view === "loading"}
            >
              Submit
            </button>

            {formState.error && (
              <p className={styles.errorMessage}>{formState.errorMessage}</p>
            )}
          </form>
        );
    }
  };

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "LeadForm Contact Page",
    "description": "Contact us for more information about our services.",
    "mainEntity": {
      "@type": "Organization",
      "name": "LeadForm",
      "url": "https://leadform.onrender.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "availableLanguage": "English"
      }
    }
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      <div className={styles.page}>
        <main className={styles.main}>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.description}>
            Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>

          <div className={styles.formContainer}>
            {renderFormContent()}
          </div>
        </main>
        <footer className={styles.footer}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Swaraj Puppalwar | 
            <a 
              href="https://github.com/UltronTheAI"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.developerLink}
            >
              UltronTheAI
            </a>
            <span className={styles.adminLinkContainer}>
              <a href="/admin" className={styles.adminLink}>Admin</a>
            </span>
          </p>
        </footer>
      </div>
    </>
  );
}
