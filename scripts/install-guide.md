# Mvenge-Mvenge Installation Guide

This guide will help you install and set up the Mvenge-Mvenge 3D loader component in your React project.

## Quick Start

```bash
# Install the package
yarn add mvenge-mvenge

# Install peer dependencies if you don't have them already
yarn add react react-dom three @react-three/fiber @react-three/drei @react-three/postprocessing
```

## Project Setup

After installing the package, you need to set up the necessary assets:

1. Create the required folders structure:

```bash
mkdir -p public/textures/3d
mkdir -p public/audio
```

2. Download the head texture file and place it in the `public/textures/3d` directory:

You can get the texture file from the Three.js examples or use your own 3D texture.
The default path that the component looks for is: `public/textures/3d/head256x256x109.zip`

3. (Optional) Add audio files to the `public/audio` directory for sound feedback.

## Basic Usage

Import and use the loader in your React component:

```jsx
import React, { useState, useEffect } from 'react';
import { Loader } from 'mvenge-mvenge';

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Simulate loading (replace with your actual loading logic)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setLoading(false);
          return 100;
        }
        return oldProgress + 5;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <Loader 
        isLoading={loading}
        progress={progress}
        showProgress={true}
        textureUrl="/textures/3d/head256x256x109.zip"
        audioSrc="/audio/loading.mp3"
        enableAudio={true}
        audioVolume={0.3}
        audioLoop={false}
      />
      
      {!loading && <div>Your content here...</div>}
    </div>
  );
}

export default App;
```

## Troubleshooting

If you encounter issues:

1. Make sure all peer dependencies are installed
2. Check that your 3D texture file is in the correct location
3. Ensure your React version is compatible (17, 18, or 19)
4. For audio issues, check that your audio file exists and the path is correct
5. Some browsers require user interaction before playing audio, so the sound may not play immediately

For further help, check the examples in the package repository. 