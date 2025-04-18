# Mvenge-Mvenge Examples

These examples show how to use the Mvenge-Mvenge loader component in different scenarios.

## Basic Example

The basic example shows a simple implementation of the loading component with progress tracking:

```jsx
import React, { useState, useEffect } from 'react';
import { Loader } from 'mvenge-mvenge';

function MyApp() {
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
      />
      
      {!loading && <div>Your content here...</div>}
    </div>
  );
}
```

## With Audio

This example shows how to use the audio features:

```jsx
import React, { useState } from 'react';
import { Loader } from 'mvenge-mvenge';

function LoaderWithAudio() {
  const [loading, setLoading] = useState(true);
  
  return (
    <Loader 
      isLoading={loading}
      audioSrc="/audio/loading.mp3"
      enableAudio={true}
      audioVolume={0.3}  // 30% volume
      audioLoop={false}  // Play only once
    />
  );
}
```

## With Glitch Effects

Customize the glitch effect:

```jsx
import React from 'react';
import { Loader } from 'mvenge-mvenge';

function GlitchLoader() {
  return (
    <Loader 
      isLoading={true}
      glitch={{
        intensity: 0.8,    // 0-1 intensity
        frequency: 0.3,    // 0-1 frequency
        mode: 2,           // 1, 2, or 3
        active: true       // Enable/disable
      }}
    />
  );
}
```

## With Rotation Animation

Add rotation to the animation:

```jsx
import React from 'react';
import { Loader } from 'mvenge-mvenge';

function RotatingLoader() {
  return (
    <Loader 
      isLoading={true}
      animation={{
        speed: 0.5,
        rotation: { 
          enabled: true, 
          speed: 0.02 
        }
      }}
    />
  );
}
```

## Complete Configuration

Here's an example with all options:

```jsx
import React from 'react';
import { Loader } from 'mvenge-mvenge';

function FullConfigLoader() {
  return (
    <Loader 
      isLoading={true}
      progress={75}
      showProgress={true}
      loadingText="Loading Assets..."
      backgroundColor="#121212"
      className="my-custom-loader"
      
      // Audio options
      audioSrc="/audio/loading.mp3"
      enableAudio={true}
      audioVolume={0.3}
      audioLoop={false}
      
      // Visual effects
      glitch={{
        intensity: 0.8,
        frequency: 0.3,
        mode: 1,
        active: true
      }}
      
      // Animation settings
      animation={{
        speed: 0.5,
        rotation: { enabled: true, speed: 0.02 }
      }}
      
      // Custom texture path
      textureUrl="/textures/3d/head256x256x109.zip"
      
      // Event callbacks
      onAnimationCycle={() => console.log('Animation cycle completed')}
    />
  );
}
``` 