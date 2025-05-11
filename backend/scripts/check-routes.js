/**
 * This script checks all routes defined in your Express application
 * for compatibility with path-to-regexp library.
 */

const { pathToRegexp } = require('path-to-regexp');
const express = require('express');
const app = express();

console.log('======= Express Route Validator =======');
console.log('Checking for invalid route patterns...\n');

// Test function for validating route paths
function testRoutePath(path) {
  try {
    // This will throw an error if the path is invalid
    pathToRegexp(path);
    return { valid: true };
  } catch (error) {
    return { 
      valid: false,
      error: error.message
    };
  }
}

// Sample routes to test against
const routes = [
  '/',
  '/api/leads',
  '/api/leads/:id',
  '/api/verify-token',
  '/admin',
  '/about',
  '/*', // wildcard route
  '*',  // Express catch-all
];

// Check each route
routes.forEach(route => {
  const result = testRoutePath(route);
  if (result.valid) {
    console.log(`✅ Valid route: ${route}`);
  } else {
    console.log(`❌ Invalid route: ${route}`);
    console.log(`   Error: ${result.error}`);
  }
});

console.log('\nRouting test completed.');
console.log('If any routes are invalid, they need to be fixed in your server.js file.');
console.log('==========================================='); 