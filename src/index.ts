// src/index.ts
import { Loader } from './Loader';
import HeadAnimation from './components/HeadAnimation';
import ProgressIndicator from './components/ProgressIndicator';
import HeadSliceMaterial from './materials/HeadSliceMaterial';
import { useAudio } from './hooks/useAudio';
import { loadHeadTexture, getTextureSlice } from './utils/textureLoader';
import type { LoaderProps } from './types';

export {
  Loader,
  HeadAnimation,
  ProgressIndicator,
  HeadSliceMaterial,
  useAudio,
  loadHeadTexture,
  getTextureSlice
};

export type { LoaderProps };

// Default export
export default Loader; 