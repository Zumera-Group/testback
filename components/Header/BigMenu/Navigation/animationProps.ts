import { eases, durations } from 'lib/utils/animationConstants';

export const parentAnimationProps = {
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren"
    }
  },
  show: {
    opacity: 1,
    transition: {
      duration: durations.md * 1.5,
      ease: eases.out,
      staggerChildren: durations.sm * 1.25,
    },
  },
};

export const childAnimationProps = {
  hidden: {
    y: 28,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: durations.lg,
      ease: eases.out,
    },
  },
};