import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';

const SmoothCursor = () => {
  const cursorX = useSpring(0, { damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 });
  const cursorY = useSpring(0, { damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 });
  
  const rotationSpring = useSpring(0, { damping: 60, stiffness: 300, mass: 1, restDelta: 0.001 });
  const scaleSpring = useSpring(1, { damping: 35, stiffness: 500, visible: true });

  const mouse = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const lastTime = useRef(performance.now());
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);
  const isMovingTimeout = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device has fine pointer (mouse) to avoid showing on touch devices
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    document.body.style.cursor = 'none';

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.body.style.cursor = 'auto'; // Restore cursor on unmount
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useAnimationFrame((time) => {
    if (!isVisible) return;

    const deltaTime = time - lastTime.current;
    if (deltaTime === 0) return;

    const currentX = mouse.current.x;
    const currentY = mouse.current.y;

    cursorX.set(currentX);
    cursorY.set(currentY);

    // Velocity calculation for rotation
    const dx = currentX - lastMouse.current.x;
    const dy = currentY - lastMouse.current.y;
    
    // Simple velocity check
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (speed > 0.1) {
      // Calculate angle
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      
      let angleDiff = angle - previousAngle.current;
      
      // Handle wrapping for continuous rotation
      if (angleDiff > 180) angleDiff -= 360;
      if (angleDiff < -180) angleDiff += 360;
      
      accumulatedRotation.current += angleDiff;
      previousAngle.current = angle;
      
      rotationSpring.set(accumulatedRotation.current);
      
      // Temporary shrink effect
      scaleSpring.set(0.8);
      
      if (isMovingTimeout.current) clearTimeout(isMovingTimeout.current);
      isMovingTimeout.current = setTimeout(() => {
        scaleSpring.set(1);
      }, 150);
    }

    lastMouse.current = { x: currentX, y: currentY };
    lastTime.current = time;
  });

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: cursorX,
        y: cursorY,
        rotate: rotationSpring,
        scale: scaleSpring,
        translateX: '-50%',
        translateY: '-50%',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        className="text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
      >
        <path
          fill="currentColor"
          d="M9.391 2.32C8.42 1.56 7 2.253 7 3.486V28.41c0 1.538 1.966 2.18 2.874.938l6.225-8.523a2 2 0 0 1 1.615-.82h9.69c1.512 0 2.17-1.912.978-2.844z"
        />
      </svg>
    </motion.div>
  );
};

export default SmoothCursor;
