import React from 'react';

interface ProgressIndicatorProps {
  progress: number;
  text?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  progress, 
  text = 'Loading...' 
}) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      zIndex: 10000
    }}>
      <div style={{ marginBottom: '10px' }}>
        {text} ({Math.round(progress)}%)
      </div>
      <div style={{
        width: '200px',
        height: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: 'white',
          transition: 'width 0.3s ease-in-out'
        }} />
      </div>
    </div>
  );
};

export default ProgressIndicator; 