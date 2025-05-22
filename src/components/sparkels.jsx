import React, { useState, useEffect } from 'react';

const COLORS = ['#0ff', '#f0f', '#ff0', '#0f0', '#f00', '#00f', '#fff'];

const createSparkle = (x, y) => {
  return {
    id: Date.now() + Math.random(),
    x,
    y,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
};

const Sparkles = () => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    if (sparkles.length === 0) return;
    const timeout = setTimeout(() => {
      setSparkles(sparkles.slice(1)); // remove oldest sparkle after animation
    }, 1000); // sparkle life duration
    return () => clearTimeout(timeout);
  }, [sparkles]);

  const handleClick = (e) => {
    const sparkle = createSparkle(e.clientX, e.clientY);
    setSparkles((prev) => [...prev, sparkle]);
  };

  return (
    <div className="sparkle-container" onClick={handleClick}>
      {sparkles.map(({ id, x, y, color }) => (
        <span
          key={id}
          className="sparkle"
          style={{
            top: y,
            left: x,
            color,
            position: 'fixed',
            pointerEvents: 'none',
            userSelect: 'none',
            fontSize: '1.5rem',
            animation: 'sparkleAnimation 1s ease-out',
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
          }}
        >
          ✨
        </span>
      ))}
    </div>
  );
};

export default Sparkles;
