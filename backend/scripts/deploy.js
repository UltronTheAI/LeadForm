const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

console.log('===== LEAD FORM DEPLOYMENT SCRIPT =====');

// Step 1: Build the frontend
console.log('\n📦 Step 1: Building the frontend...');
try {
  console.log('Changing to frontend directory...');
  const frontendDir = path.join(__dirname, '../../lead-form');
  process.chdir(frontendDir);
  console.log(`Working directory: ${process.cwd()}`);
  
  console.log('Running export command...');
  execSync('npm run export', { stdio: 'inherit' });
  
  console.log('✅ Frontend build completed successfully!');
} catch (error) {
  console.error('❌ Frontend build failed:', error.message);
  process.exit(1);
}

// Step 2: Copy the build to backend
console.log('\n📋 Step 2: Copying the frontend build to backend...');
try {
  const frontendOutDir = path.join(__dirname, '../../lead-form/out');
  const backendOutDir = path.join(__dirname, '../out');
  
  console.log(`Source: ${frontendOutDir}`);
  console.log(`Destination: ${backendOutDir}`);
  
  fs.ensureDirSync(backendOutDir);
  fs.copySync(frontendOutDir, backendOutDir, { overwrite: true });
  
  console.log('✅ Frontend build copied successfully!');
} catch (error) {
  console.error('❌ Copy operation failed:', error.message);
  process.exit(1);
}

// Step 3: Change back to backend directory and start the server
console.log('\n🚀 Step 3: Starting the backend server...');
try {
  process.chdir(path.join(__dirname, '..'));
  console.log(`Working directory: ${process.cwd()}`);
  
  console.log('Starting server...');
  const server = spawn('node', ['server.js'], { stdio: 'inherit' });
  
  server.on('error', (error) => {
    console.error('❌ Server failed to start:', error.message);
    process.exit(1);
  });
  
  process.on('SIGINT', () => {
    console.log('\nReceived SIGINT. Shutting down gracefully...');
    server.kill('SIGINT');
  });
  
  console.log('✅ Server started successfully!');
} catch (error) {
  console.error('❌ Server start failed:', error.message);
  process.exit(1);
} 