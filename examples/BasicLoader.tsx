import React, { useState, useEffect } from 'react';
import { Loader } from '../src';

const BasicLoaderExample = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Simulate loading
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

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      {/* The loading component */}
      <Loader 
        isLoading={loading}
        progress={progress}
        showProgress={true}
        loadingText="Loading Example"
        glitch={{
          intensity: 0.8,
          frequency: 0.3,
          mode: 1,
          active: true
        }}
        animation={{
          speed: 0.5,
          rotation: { enabled: true, speed: 0.02 }
        }}
        textureUrl="/textures/3d/head256x256x109.zip"
        audioSrc="/audio/loading.mp3"
        enableAudio={true}
        audioVolume={0.3}  // 30% volume
        audioLoop={false}  // Play only once
        onAnimationCycle={() => console.log('Animation cycle completed')}
      />

      {/* The main content - only shown when loading is complete */}
      {!loading && (
        <div style={{ padding: '20px' }}>
          <h1>Content Loaded!</h1>
          <p>This content is displayed after loading is complete.</p>
        </div>
      )}
    </div>
  );
};

export default BasicLoaderExample; 