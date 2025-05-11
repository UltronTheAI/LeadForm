const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'out' directory
app.use(express.static(path.join(__dirname, 'out')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'LeadForm',
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Define Schema for Leads
const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  message: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create models
const Lead = mongoose.model('Lead', leadSchema, 'Leads');

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    
    // Directly compare with TOKEN_SECRET
    if (bearerToken === process.env.TOKEN_SECRET) {
      next();
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    // Forbidden
    res.status(403).json({ message: 'No token provided' });
  }
};

// Sample route for testing
app.get('/', (req, res) => {
  res.send('LeadForm API is running');
});

// Routes for Leads
app.post('/api/leads', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if lead with this email already exists
    const existingLead = await Lead.findOne({ email });

    if (existingLead) {
      // If email exists, update the existing record
      const updatedLead = await Lead.findOneAndUpdate(
        { email },
        { 
          ...req.body,
          updatedAt: Date.now() // Add an updatedAt field to track when it was updated
        },
        { new: true, runValidators: true } // Return the updated document and run validators
      );
      
      return res.status(200).json({ 
        ...updatedLead.toObject(), 
        message: 'Lead information updated successfully' 
      });
    }

    // If email doesn't exist, create a new lead
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Protected route - requires token
app.get('/api/leads', verifyToken, async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete lead endpoint - requires token
app.delete('/api/leads/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'Lead ID is required' });
    }

    // Check if lead exists
    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Delete the lead
    await Lead.findByIdAndDelete(id);
    
    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    
    // Handle invalid ID format
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid lead ID format' });
    }
    
    res.status(500).json({ message: 'Error deleting lead', error: error.message });
  }
});

// Token verification endpoint
app.post('/api/verify-token', (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ valid: false, message: 'Token is required' });
    }
    
    // Direct comparison with TOKEN_SECRET
    const isValid = token === process.env.TOKEN_SECRET;
    
    if (isValid) {
      return res.status(200).json({ valid: true, message: 'Token is valid' });
    } else {
      return res.status(200).json({ valid: false, message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ valid: false, message: 'Internal server error' });
  }
});

// Instead of using a wildcard, set specific routes for frontend pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'out', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'out', 'admin.html'));
});

// Fallback route for any other requests
app.use((req, res, next) => {
  // Skip API routes
  if (req.url.startsWith('/api')) {
    return next();
  }
  
  // Clean up URL to prevent path traversal
  const cleanUrl = req.url.split('?')[0]; // Remove query parameters
  
  // Try to serve the file directly first
  const filePath = path.join(__dirname, 'out', cleanUrl);
  
  // Use try-catch with synchronous fs.existsSync for better error handling
  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      // File exists, serve it
      return res.sendFile(filePath);
    }
    
    // File doesn't exist, serve index.html
    return res.sendFile(path.join(__dirname, 'out', 'index.html'));
  } catch (error) {
    console.error('Error serving static file:', error);
    // In case of any error, default to index.html
    return res.sendFile(path.join(__dirname, 'out', 'index.html'));
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving static files from ${path.join(__dirname, 'out')}`);
});
