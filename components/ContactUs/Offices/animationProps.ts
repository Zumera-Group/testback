import { eases, durations } from 'lib/animationConstants';

export const animationProps = {
  initial: {
    opacity: 0,
    y: '16px',
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    transition: {
      ease: eases.out,
      duration: durations.sm / 2,
    },
  },
  transition: {
    ease: eases.out,
    duration: durations.lg,
  },
};