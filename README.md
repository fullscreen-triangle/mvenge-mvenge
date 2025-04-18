<h1 align="center">Mvenge-Mvenge</h1>
<p align="center"><em>What people should see before you land a helicopter upside down. </em></p>

<p align="center">
  <a href="https://www.npmjs.com/package/mvenge-mvenge"><img src="https://img.shields.io/npm/v/mvenge-mvenge.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/mvenge-mvenge"><img src="https://img.shields.io/npm/dm/mvenge-mvenge.svg" alt="Downloads"></a>
  <a href="https://github.com/username/mvenge-mvenge/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/mvenge-mvenge.svg" alt="License"></a>
</p>

<p align="center">
  <img src="./Pugachev_Cobra.svg" alt="Mvenge-Mvenge Logo" width="100%" style="max-width: 600px;"/>
</p>

A customizable, reusable loading animation component for React applications built with Three.js and React Three Fiber. Create stunning 3D loading visualizations with glitch effects and audio feedback that dynamically adapts to any loading scenario.

## Features

*   3D head slice animation with smooth transitions
    
*   Dynamic loading visualization that adapts to any duration
    
*   Post-processing effects including customizable glitch filter
    
*   Audio support for sound feedback during loading
    
*   Progress indicator option
    
*   Fully customizable via props
    
*   TypeScript support with comprehensive type definitions
    
*   Built with React and @react-three/fiber

## Installation

```bash
# with npm
npm install mvenge-mvenge

# with yarn
yarn add mvenge-mvenge
```

Make sure to also install peer dependencies if you don't have them:

```bash
yarn add react react-dom three @react-three/fiber @react-three/drei @react-three/postprocessing
```

## Asset Setup

You can set up the required directory structure in two ways:

### Automatic Setup

If you've installed this package, you can use the provided setup script:

```bash
# Using npm
npm run setup-assets

# Using yarn
yarn setup-assets
```

This will create the necessary folders and README files with instructions.

### Manual Setup

1. Create a `public/textures/3d` directory in your project
2. Add the head texture zip file (`head256x256x109.zip`) to this directory
3. Optional: Add audio files to a `public/audio` directory

## Project Structure

```
├── src/
│   ├── components/         # React components
│   │   ├── HeadAnimation.tsx    # The 3D animation component
│   │   └── ProgressIndicator.tsx # Optional loading progress
│   ├── hooks/              # Custom React hooks
│   │   └── useAudio.ts     # Audio handling hook
│   ├── materials/          # Shader materials 
│   │   └── HeadSliceMaterial.ts  # The shader material
│   ├── utils/              # Utility functions
│   │   └── textureLoader.ts  # Texture loading helper
│   ├── types.ts            # TypeScript interfaces
│   ├── Loader.tsx          # Main loader component
│   └── index.ts            # Package entry point
└── examples/               # Usage examples
```

## Basic Usage

```jsx
import React, { useState, useEffect } from 'react';
import { Loader } from 'mvenge-mvenge';

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Simulate loading (replace with your actual loading logic)
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

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <Loader 
        isLoading={loading}
        progress={progress}
        showProgress={true}
        textureUrl="/textures/3d/head256x256x109.zip"
      />
      
      {!loading && <div>Your content here...</div>}
    </div>
  );
}

export default App;
```

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isLoading` | boolean | true | Whether the loader should be shown |
| `audioSrc` | string | undefined | Path to the audio file to play while loading |
| `enableAudio` | boolean | true | Whether audio should be enabled |
| `audioVolume` | number | 0.3 | Volume of the audio (0 to 1) |
| `audioLoop` | boolean | false | Whether to loop the audio |
| `backgroundColor` | string | '#000000' | Background color for the loading screen |
| `className` | string | '' | Custom class name for the container |
| `glitch` | object | { intensity: 1, frequency: 0.5, mode: 1, active: true } | Glitch effect configuration |
| `animation` | object | { speed: 0.4, rotation: { enabled: false, speed: 0.01 } } | Animation configuration |
| `progress` | number | undefined | Loading progress (0-100) |
| `showProgress` | boolean | false | Whether to show progress |
| `loadingText` | string | 'Loading...' | Text to display with the loader |
| `textureUrl` | string | '/textures/3d/head256x256x109.zip' | Custom texture URL |
| `onAnimationCycle` | function | undefined | Callback fired when the animation completes a cycle |
| `children` | ReactNode | undefined | Optional children to render in the loader |

## Advanced Examples

Check the [examples](./examples) directory for more usage examples.

## Browser Support

This component uses WebGL and modern JavaScript features. It works in all modern browsers that support WebGL.

## Local Development

If you want to test this package with your local application, you can use npm linking:

```bash
# In the mvenge-mvenge package directory
npm link

# In your application directory
npm link mvenge-mvenge
```

Or with yarn:

```bash
# In the mvenge-mvenge package directory
yarn link

# In your application directory
yarn link mvenge-mvenge
```

This creates a symbolic link from your global node_modules folder to this package, allowing you to test local changes immediately in your application.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.