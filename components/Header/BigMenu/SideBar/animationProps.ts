import { eases, durations } from 'lib/utils/animationConstants';

export const animationProps = {
  initial: {
    x: '-100%',
  },
  animate: {
    x: '0%',
  },
  transition: {
    delay: durations.sm * .75,
    duration: durations.lg,
    ease: eases.out
  },
};