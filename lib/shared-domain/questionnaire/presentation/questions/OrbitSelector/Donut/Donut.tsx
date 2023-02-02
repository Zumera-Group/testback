import { motion } from 'framer-motion';
import { eases, durations } from 'lib/animationConstants';
import styles from './Donut.module.scss';

interface Props {
  progress: number;
  total: number;
}

export const Donut: React.FC<Props> = ({ progress, total }) => {
  const PATH_LENGTH = 810;
  const LENGTH_TO_ANIMATE = (progress / total) * PATH_LENGTH + PATH_LENGTH;

  const animate = {
    strokeDashoffset: LENGTH_TO_ANIMATE,
    transition: {
      duration: durations.md,
      ease: eases.out,
    }
  };

  return (
    <svg className={styles.donut} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 619.21 309.6">
      <defs>
        <linearGradient id="orbitVisualGradient" x1="-15%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="var(--stop-color-1)" />
          <stop offset="85%" stopColor="var(--stop-color-2)" />
        </linearGradient>
      </defs>
      <path
        d="M564.71,309.6c0-140.89-114.21-255.1-255.1-255.1S54.5,168.71,54.5,309.6"
        style={{
          fill: 'none',
          stroke: 'var(--track-color)',
          strokeWidth: '108px',
          strokeMiterlimit: 10,
        }}
      />
      <motion.path
        animate={animate}
        d="M564.71,309.6c0-140.89-114.21-255.1-255.1-255.1S54.5,168.71,54.5,309.6"
        style={{
          fill: 'none',
          stroke: 'url(#orbitVisualGradient)',
          strokeWidth: '108px',
          strokeMiterlimit: 10,
          strokeDasharray: PATH_LENGTH,
        }}
      />
    </svg>
  );
};

export default Donut;