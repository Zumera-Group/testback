import { durations, eases } from 'lib/animationConstants';

const animationTransition = {
  duration: durations.lg / 1.25,
  ease: eases.out,
  delay: durations.sm / 4,
};

export const animationVariants = {
  initial: {
    y: 16,
    opacity: 0,
    transition: animationTransition,
  },
  in: {
    y: 0,
    opacity: 1,
    transition: animationTransition,
  },
  out: {
    y: 16,
    opacity: 0,
    transition: animationTransition,
  },
}

