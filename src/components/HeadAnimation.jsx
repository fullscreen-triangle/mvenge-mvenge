// src/components/HeadAnimation.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { unzipSync } from 'three/examples/jsm/libs/fflate.module.js';
import HeadSliceMaterial from '../materials/HeadSliceMaterial';

// Register the material with react-three-fiber
extend({ HeadSliceMaterial });

const HeadAnimation = ({ 
  isLoading, 
  textureUrl = '/textures/3d/head256x256x109.zip',
  animationSpeed = 0.4,
  rotation = { enabled: false, speed: 0.01 },
  onAnimationCycle
}) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const [texture, setTexture] = useState(null);
  const [depthStep, setDepthStep] = useState(animationSpeed);
  
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
      meshRef.current.rotation.y += rotation.speed;
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
