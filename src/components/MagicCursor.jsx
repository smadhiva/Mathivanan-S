import React, { useEffect } from 'react';
import '../styles/MagicCursor.css';

const MagicCursor = () => {
  useEffect(() => {
    const addSparkle = (e) => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;
      sparkle.style.setProperty('--r', Math.random()); // Add rotation randomness
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    };

    const addTrail = (e) => {
      const dot = document.createElement('div');
      dot.className = 'magic-dot';
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 1200);
    };

    document.addEventListener('click', addSparkle);
    document.addEventListener('mousemove', addTrail);

    return () => {
      document.removeEventListener('click', addSparkle);
      document.removeEventListener('mousemove', addTrail);
    };
  }, []);

  return null;
};

export default MagicCursor;
