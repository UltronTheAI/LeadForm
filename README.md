# LeadForm

A full-stack web application for collecting and managing leads with an admin dashboard.

![Lead Form](https://img.shields.io/badge/Lead%20Form-Contact%20Management-3a86ff)
![Next.js](https://img.shields.io/badge/Frontend-Next.js%2015-black)
![Express](https://img.shields.io/badge/Backend-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

## Overview

LeadForm is a modern web application built with Next.js and Express that provides:

- A clean, responsive contact form for lead collection
- Email duplicate detection with automatic updates
- A secure admin dashboard with token authentication
- Lead management features (view, delete)
- Integrated deployment approach where the backend serves both the API and frontend static files

## Project Structure

The project is organized into two main directories:

- **lead-form/**: The Next.js frontend application
- **backend/**: The Express API server that also serves the static frontend

## Features

### Frontend

- Modern, responsive design with dark mode support
- Form validation with error handling
- Loading animations and success feedback
- "Thank you" page after submission
- Admin dashboard for managing leads

### Backend

- RESTful API for lead submission and management
- MongoDB integration for data storage
- Token-based authentication for admin access
- Static file serving for the frontend build
- CORS support

### Admin Dashboard

- Secure authentication with token
- View all leads with privacy-focused display
- View complete lead details in a modal
- Delete leads with confirmation
- Automatic UI updates

## Technology Stack

- **Frontend**: Next.js, React, CSS Modules
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Authentication**: JWT Token-based auth
- **Deployment**: Integrated backend/frontend deployment

## Installation and Setup

### Prerequisites

- Node.js (v16+)
- MongoDB connection string
- npm or yarn

### Local Development Setup

1. Clone the repository
   ```bash
   git clone https://github.com/UltronTheAI/LeadForm.git
   cd LeadForm
   ```

2. Setup the frontend
   ```bash
   cd lead-form
   npm install
   ```

3. Setup the backend
   ```bash
   cd ../backend
   npm install
   ```

4. Create environment variables:

   For frontend (lead-form/.env.local):
   ```
   NEXT_PUBLIC_API_URL=/api
   ```

   For backend (backend/.env):
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   TOKEN_SECRET=your_admin_token_secret
   ```

5. Start development servers:

   For frontend:
   ```bash
   cd lead-form
   npm run dev
   ```

   For backend:
   ```bash
   cd backend
   npm run dev
   ```

## Deployment

### Integrated Deployment (Recommended)

The project is set up for an integrated deployment where the backend serves both the API and the static frontend build:

1. Generate a production build:
   ```bash
   cd backend
   npm run deploy
   ```

   This will:
   - Build the frontend with Next.js export
   - Copy the static files to the backend/out directory
   - Start the Express server serving both API and static files

2. For production deployment, deploy only the backend directory to your hosting platform.

### Environment Setup for Production

Make sure these environment variables are set on your hosting platform:

- `PORT` - The port for the server (often set automatically)
- `MONGO_URI` - Your MongoDB connection string
- `TOKEN_SECRET` - Secret token for admin authentication

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

[UltronTheAI](https://github.com/UltronTheAI)