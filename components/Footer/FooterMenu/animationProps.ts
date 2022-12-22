import { eases, durations } from 'lib/animationConstants';

export const menuAnimationProps = {
  initial: {
    opacity: 0,
    y: '-16px',
    height: 0,
  },
  animate: {
    opacity: 1,
    y: 0,
    height: 'auto',
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      ease: eases.out,
      duration: durations.sm,
    },
  },
  transition: {
    ease: eases.out,
    duration: durations.md,
  },
};

export const toggleIconVariants = {
  open: {
    rotate: -180,
    transition: {
      ease: eases.out,
      duration: durations.sm * 1.5,
    },
  },
  closed: {
    rotate: 0,
    transition: {
      ease: eases.out,
      duration: durations.sm,
    },
  },
}