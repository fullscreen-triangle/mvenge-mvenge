// src/hooks/useAudio.js
import { useEffect, useRef } from 'react';

export const useAudio = (audioSrc, isPlaying, volume = 1) => {
  const audioRef = useRef(null);
  
  useEffect(() => {
    if (!audioSrc) return;
    
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
    }
    
    // Play or pause based on isPlaying prop
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio playback prevented:", error);
        });
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
    
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc, isPlaying, volume]);
  
  return audioRef;
};
