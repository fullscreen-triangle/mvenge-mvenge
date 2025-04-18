import React, { useRef, useState, useEffect } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { unzipSync } from 'fflate';
import HeadSliceMaterial from '../materials/HeadSliceMaterial';

// Register the material with react-three-fiber
extend({ HeadSliceMaterial });

// Simpler type declaration - we'll explicitly declare headSliceMaterial as 'any'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      headSliceMaterial: any;
    }
  }
}

interface HeadAnimationProps {
  isLoading: boolean;
  textureUrl?: string;
  animationSpeed?: number;
  rotation?: {
    enabled?: boolean;
    speed?: number;
  };
  onAnimationCycle?: () => void;
}

const HeadAnimation: React.FC<HeadAnimationProps> = ({ 
  isLoading, 
  textureUrl = '/textures/3d/head256x256x109.zip',
  animationSpeed = 0.4,
  rotation = { enabled: false, speed: 0.01 },
  onAnimationCycle
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const [texture, setTexture] = useState<THREE.DataArrayTexture | null>(null);
  const [depthStep, setDepthStep] = useState<number>(animationSpeed);
  
  // Load the head texture data
  useEffect(() => {
    const loadTexture = async () => {
      try {
        const response = await fetch(textureUrl);
        const data = await response.arrayBuffer();
        const zip = unzipSync(new Uint8Array(data));
        const array = new Uint8Array(zip['head256x256x109'].buffer);
        
        const tex = new THREE.DataArrayTexture(array, 256, 256, 109);
        tex.format = THREE.RedFormat;
        tex.needsUpdate = true;
        setTexture(tex);
      } catch (error) {
        console.error("Failed to load texture:", error);
      }
    };
    
    loadTexture();
  }, [textureUrl]);

  // Animate the depth value
  useFrame(() => {
    if (!materialRef.current || !isLoading) return;
    
    // Animate depth
    let value = materialRef.current.uniforms.depth.value;
    value += depthStep;
    
    if (value > 109.0 || value < 0.0) {
      if (value > 1.0) value = 109.0 * 2.0 - value;
      if (value < 0.0) value = -value;
      setDepthStep(-depthStep);
      
      // Call the cycle callback if provided
      if (onAnimationCycle) onAnimationCycle();
    }
    
    materialRef.current.uniforms.depth.value = value;
    
    // Handle rotation if enabled
    if (rotation?.enabled && meshRef.current) {
      meshRef.current.rotation.y += rotation.speed || 0.01;
    }
  });

  if (!texture) return null;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[50, 50]} />
      <headSliceMaterial 
        ref={materialRef} 
        diffuse={texture} 
        glslVersion={THREE.GLSL3} 
      />
    </mesh>
  );
};

export default HeadAnimation; 