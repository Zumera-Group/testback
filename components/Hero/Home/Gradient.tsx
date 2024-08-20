import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { getCursorPosition } from 'lib/utils/getCursorPosition';
import { getTiltPosition } from 'lib/utils/getTiltPosition';

import styles from './Home.module.scss';

const Gradient = ({ parent }) => {
  const [heroIsInteractive, setHeroIsInteractive] = useState(false);
  const [mousePosition, setMousePosition] = useState({x: 100, y: 0});

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
    `
  };

  const ease = [0.165, 0.840, 0.440, 1.000];
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
    }
  };

  useEffect(() => {
    if (!parent.current) return;
    const parentEl = parent.current;

    // Mouse / tilt controls
    const handleMouseMove = (event) => setMousePosition(getCursorPosition(event, parentEl));
    const handleOrientation = (event) => {
      const orientation = event.currentTarget?.screen?.orientation?.type;
      setMousePosition(getTiltPosition(event, orientation.includes('portrait')));
    };

    window.addEventListener('mousemove', handleMouseMove, true);
    window.addEventListener('deviceorientation', handleOrientation, true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [parent]);

  return (
    <motion.div
      className={styles.gradient}
      initial={variants.initial}
      animate={heroIsInteractive ? 'interactive' : 'initial'}
      variants={variants}
      onAnimationComplete={() => setHeroIsInteractive(true)}>
    </motion.div>
  )
};

export default Gradient;