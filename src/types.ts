// src/types.ts
export interface LoaderProps {
    /** Whether the loader should be shown */
    isLoading: boolean;
    
    /** Path to the audio file to play while loading */
    audioSrc?: string;
    
    /** Whether audio should be enabled */
    enableAudio?: boolean;
    
    /** Volume of the audio (0 to 1) */
    audioVolume?: number;
    
    /** Whether to loop the audio */
    audioLoop?: boolean;
    
    /** Background color for the loading screen */
    backgroundColor?: string;
    
    /** Custom class name for the container */
    className?: string;
    
    /** Glitch effect configuration */
    glitch?: {
      /** Intensity of the glitch effect (0-1) */
      intensity?: number;
      /** Frequency of glitches (0-1) */
      frequency?: number;
      /** Type of glitch effect (1-3) */
      mode?: 1 | 2 | 3;
      /** Whether glitch is active */
      active?: boolean;
    };
    
    /** Animation configuration */
    animation?: {
      /** Speed of the animation */
      speed?: number;
      /** Rotation options */
      rotation?: {
        enabled?: boolean;
        speed?: number;
      };
    };
    
    /** Callback fired when the animation completes a cycle */
    onAnimationCycle?: () => void;
    
    /** Optional children to render in the loader */
    children?: React.ReactNode;
    
    /** Custom texture URL */
    textureUrl?: string;
    
    /** Loading progress (0-100) */
    progress?: number;
    
    /** Whether to show progress */
    showProgress?: boolean;
    
    /** Text to display with the loader */
    loadingText?: string;
  }
  