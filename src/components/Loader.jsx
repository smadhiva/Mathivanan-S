import React from 'react';

export default function Loader() {
  return (
    <div style={{
      position: 'fixed', 
      top: 0, left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0b0b0b',
      color: '#ffffff',
      fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
      zIndex: 9999,
      fontFamily: 'monospace',
      textAlign: 'center',
      flexDirection: 'column'
    }}>
      <span className="loader-text">🔄 Loading My Website</span>
      <span style={{ marginTop: '0.5rem', fontSize: 'clamp(1rem, 2vw, 1.5rem)', opacity: 0.8 }}>
        (Worth the wait to websurf 🚀)
      </span>
      <style>
        {`
          .loader-text {
            animation: blink 1.2s infinite;
          }

          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
