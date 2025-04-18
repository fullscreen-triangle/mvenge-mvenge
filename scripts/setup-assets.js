#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Create necessary directories for a project that will use this library
const createDirectories = () => {
  const dirs = [
    'public/textures/3d',
    'public/audio'
  ];

  dirs.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) {
      console.log(`Creating directory: ${dir}`);
      fs.mkdirSync(fullPath, { recursive: true });
    } else {
      console.log(`Directory already exists: ${dir}`);
    }
  });
};

// Create a README file in each directory with instructions
const createReadmeFiles = () => {
  const readmeContents = {
    'public/textures/3d': `# 3D Textures

This directory should contain the head texture zip file (head256x256x109.zip).
The loader component will look for this file by default.

You can download the sample texture file from the original Three.js examples repository.`,

    'public/audio': `# Audio Files

Place audio files here that will be used by the loader component.
Common formats like .mp3 or .wav work well.

Example usage:
\`\`\`jsx
<Loader 
  audioSrc="/audio/your-audio-file.mp3"
  enableAudio={true}
  audioVolume={0.3}
  audioLoop={false}
/>
\`\`\``
  };

  Object.entries(readmeContents).forEach(([dir, content]) => {
    const readmePath = path.join(process.cwd(), dir, 'README.md');
    if (!fs.existsSync(readmePath)) {
      console.log(`Creating README in: ${dir}`);
      fs.writeFileSync(readmePath, content);
    } else {
      console.log(`README already exists in: ${dir}`);
    }
  });
};

// Main function
const main = () => {
  console.log('Setting up asset directories for Mvenge-Mvenge loader...');
  createDirectories();
  createReadmeFiles();
  console.log('Setup complete!');
};

// Run the script
main(); 