import * as THREE from 'three';
import { unzipSync } from 'fflate';

/**
 * Load a zipped 3D texture file and return a DataArrayTexture
 * @param url Path to the zip file containing the texture data
 * @param width Width of the texture (default 256)
 * @param height Height of the texture (default 256)
 * @param depth Depth of the texture (default 109)
 * @param fileName Name of the file inside the zip archive (default 'head256x256x109')
 * @returns Promise with the loaded DataArrayTexture
 */
export const loadHeadTexture = async (
  url: string, 
  width: number = 256, 
  height: number = 256, 
  depth: number = 109,
  fileName: string = 'head256x256x109'
): Promise<THREE.DataArrayTexture> => {
  try {
    const response = await fetch(url);
    const data = await response.arrayBuffer();
    const zip = unzipSync(new Uint8Array(data));
    const array = new Uint8Array(zip[fileName].buffer);
    
    const texture = new THREE.DataArrayTexture(array, width, height, depth);
    texture.format = THREE.RedFormat;
    texture.needsUpdate = true;
    
    return texture;
  } catch (error) {
    console.error("Failed to load texture:", error);
    throw error;
  }
};

/**
 * Get a specific slice from a 3D texture
 * @param texture The 3D texture to get a slice from
 * @param sliceIndex The index of the slice to retrieve
 * @returns A 2D texture containing the specified slice
 */
export const getTextureSlice = (
  texture: THREE.DataArrayTexture, 
  sliceIndex: number
): THREE.Texture => {
  // This is a simplified implementation
  // In a real app, you'd need to render the slice to a texture
  // For now, we're just returning the original texture
  return texture;
}; 