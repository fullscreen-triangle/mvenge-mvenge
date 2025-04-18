import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface HeadSliceMaterialUniforms {
  diffuse: THREE.DataArrayTexture | null;
  depth: number;
  size: THREE.Vector2;
}

const HeadSliceMaterial = shaderMaterial<HeadSliceMaterialUniforms>(
  {
    diffuse: null,
    depth: 55,
    size: new THREE.Vector2(50, 50)
  },
  // Vertex shader
  `
  uniform vec2 size;
  out vec2 vUv;

  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv.xy = position.xy / size + 0.5;
    vUv.y = 1.0 - vUv.y;
  }
  `,
  // Fragment shader
  `
  precision highp float;
  precision highp sampler2DArray;
  
  uniform sampler2DArray diffuse;
  in vec2 vUv;
  uniform int depth;
  
  out vec4 outColor;
  
  void main() {
    vec4 color = texture(diffuse, vec3(vUv, depth));
    outColor = vec4(color.rrr * 1.5, 1.0);
  }
  `
);

export default HeadSliceMaterial; 