import { eases, durations } from 'lib/animationConstants';

export const animationProps = {
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    height: 'auto',
    opacity: 1,
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      duration: durations.sm,
      ease: eases.in,
    }
  },
  transition: {
    duration: durations.md,
    ease: eases.out,
  }
}