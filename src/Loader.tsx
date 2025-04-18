// src/Loader.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Glitch } from '@react-three/postprocessing';
import HeadAnimation from './components/HeadAnimation';
import ProgressIndicator from './components/ProgressIndicator';
import { useAudio } from './hooks/useAudio';
import type { LoaderProps } from './types';

export const Loader: React.FC<LoaderProps> = ({
  isLoading = true,
  audioSrc,
  enableAudio = true,
  audioVolume = 0.3,
  audioLoop = false,
  backgroundColor = '#000000',
  className = '',
  glitch = { 
    intensity: 1, 
    frequency: 0.5, 
    mode: 1, 
    active: true 
  },
  animation = {
    speed: 0.4,
    rotation: { enabled: false, speed: 0.01 }
  },
  progress,
  showProgress = false,
  loadingText = 'Loading...',
  textureUrl = '/textures/3d/head256x256x109.zip',
  onAnimationCycle,
  children
}) => {
  // Use the audio hook with volume and loop parameters
  useAudio(audioSrc, isLoading && enableAudio, audioVolume, audioLoop);
  
  if (!isLoading) return null;
  
  return (
    <div 
      className={`threejs-loader ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor,
        zIndex: 9999,
        overflow: 'hidden'
      }}
    >
      <Canvas camera={{ position: [0, 0, 70], fov: 45 }}>
        <HeadAnimation 
          isLoading={isLoading} 
          textureUrl={textureUrl}
          animationSpeed={animation.speed}
          rotation={animation.rotation}
          onAnimationCycle={onAnimationCycle}
        />
        <EffectComposer>
          {glitch.active && (
            <Glitch 
              strength={glitch.intensity || 1}
              perturbationSpeed={(glitch.frequency || 0.5) * 10}
              mode={glitch.mode || 1}
              active={isLoading}
              ratio={0.85}
            />
          )}
        </EffectComposer>
      </Canvas>
      
      {showProgress && (
        <ProgressIndicator 
          progress={progress || 0} 
          text={loadingText} 
        />
      )}
      
      {children && (
        <div className="threejs-loader-content">
          {children}
        </div>
      )}
    </div>
  );
};
