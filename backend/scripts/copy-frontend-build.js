const fs = require('fs-extra');
const path = require('path');

const frontendOutDir = path.join(__dirname, '../../lead-form/out');
const backendOutDir = path.join(__dirname, '../out');

console.log('Copying frontend build to backend...');
console.log(`Source: ${frontendOutDir}`);
console.log(`Destination: ${backendOutDir}`);

// Check if frontend build exists
if (!fs.existsSync(frontendOutDir)) {
  console.error('Frontend build directory does not exist!');
  console.error('Please run "npm run export" in the frontend directory first.');
  process.exit(1);
}

// Ensure the backend out directory exists
fs.ensureDirSync(backendOutDir);

// Copy all files
try {
  fs.copySync(frontendOutDir, backendOutDir, { overwrite: true });
  console.log('Frontend build copied successfully!');
} catch (err) {
  console.error('Error copying files:', err);
  process.exit(1);
}

console.log('Static files are now ready to be served by the backend.');
console.log('Start your server with "npm start" to serve both API and static files.'); 