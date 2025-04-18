import { useEffect, useRef } from 'react';

export const useAudio = (
  audioSrc: string | undefined, 
  isPlaying: boolean, 
  volume: number = 0.3, // Lower default volume
  loop: boolean = false // Default to not looping
): React.RefObject<HTMLAudioElement | null> => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef<boolean>(false); // Track if audio has played
  
  useEffect(() => {
    if (!audioSrc) return;
    
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.loop = loop;
      audioRef.current.volume = volume;
      
      // Add a fade-in effect to avoid startling users
      if (audioRef.current) {
        const originalVolume = volume;
        audioRef.current.volume = 0;
        
        // Gradually increase volume
        let fadeInInterval: number | null = null;
        const fadeIn = () => {
          if (!audioRef.current) return;
          if (audioRef.current.volume < originalVolume) {
            audioRef.current.volume = Math.min(originalVolume, audioRef.current.volume + 0.05);
          } else if (fadeInInterval) {
            clearInterval(fadeInInterval);
            fadeInInterval = null;
          }
        };
        
        fadeInInterval = window.setInterval(fadeIn, 100) as unknown as number;
      }
    }
    
    // Play or pause based on isPlaying prop, but only if it hasn't played yet
    if (isPlaying && !hasPlayedRef.current) {
      const playPromise = audioRef.current.play();
      hasPlayedRef.current = true; // Mark as played
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio playback prevented:", error);
          hasPlayedRef.current = false; // Reset if playback fails
        });
      }
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
    
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc, isPlaying, volume, loop]);
  
  return audioRef;
}; 