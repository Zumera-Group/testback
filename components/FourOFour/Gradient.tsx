import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { getCursorPosition } from 'lib/utils/getCursorPosition';
import { getTiltPosition } from 'lib/utils/getTiltPosition';

import styles from './FourOFour.module.scss';

export const Gradient = ({ parent }) => {
  const [heroIsInteractive, setHeroIsInteractive] = useState(false);
  const [isPortrait, setIsPortrait] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 100, y: 0 });

  // Gradient styles
  const gradientSize = 'var(--gradient-size)';
  const gradientColors = {
    front: 'var(--gradient-front)',
    middleFront: 'var(--gradient-middle-front)',
    middleBack: 'var(--gradient-middle-back)',
    back: 'var(--gradient-back)',
  };

  const setGradient = (x: number, y: number) => {
    return `
      radial-gradient(
        ${gradientSize} ${gradientSize} at ${x}% ${y}%,
        ${gradientColors.front} 0%,
        ${gradientColors.middleFront} 25%,
        ${gradientColors.middleBack} 75%,
        ${gradientColors.back} 100%
      )
    `;
  };

  const ease = [0.165, 0.84, 0.44, 1.0];
  const variants = {
    initial: {
      opacity: 0,
      background: setGradient(100, 0),
      transition: {
        duration: 0.5,
        ease: ease,
      },
    },
    interactive: {
      opacity: 1,
      background: setGradient(mousePosition.x, mousePosition.y),
      transition: {
        duration: 1.75,
        ease: ease,
      },
    },
  };

  useEffect(() => {
    if (!parent.current) return;
    const parentEl = parent.current;

    // Determine the screen orientation
    // Needed for passing in the boolean to getTiltPosition
    const screenOrientation = window.matchMedia('(orientation: portrait)');
    setIsPortrait(screenOrientation.matches);
    const handlePortrait = (event) => setIsPortrait(event.matches);
    screenOrientation.addEventListener('change', handlePortrait);

    // Mouse / tilt controls
    const handleMouseMove = (event) =>
      setMousePosition(getCursorPosition(event, parentEl));
    const handleOrientation = (event) =>
      setMousePosition(getTiltPosition(event, true));
    window.addEventListener('mousemove', handleMouseMove, true);
    window.addEventListener('deviceorientation', handleOrientation, true);

    return () => {
      screenOrientation.removeEventListener('change', handlePortrait);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [parent, isPortrait]);

  return (
    <motion.div
      className={styles.gradient}
      initial={variants.initial}
      animate={heroIsInteractive ? 'interactive' : 'initial'}
      variants={variants}
      onAnimationComplete={() => setHeroIsInteractive(true)}
    ></motion.div>
  );
};

export default Gradient;
