import { eases, durations } from 'lib/animationConstants';

export const animationProps = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  transition: {
    duration: durations.md * 1.5,
    ease: eases.out
  },
  exit: {
    opacity: 0,
    transition: {
      duration: durations.sm,
      ease: eases.out
    },
  },
}