import { eases, durations } from 'lib/animationConstants';

export const staggerChildrenAnimationProps = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: durations.sm / 2,
    },
  },
};

export const verticalLineAnimationProps = {
  initial: {
    // scaleY: 0,
    opacity: 0,
  },
  animate: {
    // scaleY: 1,
    // originY: '100%',
    // originX: '50%',
    opacity: 1,
    transition: {
      duration: durations.xl * 2,
      ease: eases.out,
    },
  },
};

export const horizontalLineAnimationProps = {
  initial: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
  },
  animate: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: {
      duration: durations.xl * 2,
      ease: eases.inOut,
    },
  },
};

export const regionAnimationProps = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: durations.xl,
      duration: durations.xl * 1.5,
      eases: eases.out,
    },
  },
};

export const staggerLocationsAnimationProps = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: durations.xl * 2,
      ease: eases.in,
      duration: durations.md,
      // duration: durations.xl,
      // staggerChildren: durations.sm * 2,
    },
  },
};

export const locationPointAnimationProps = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1.3,
    transition: {
      // duration: durations.xl,
      duration: durations.md,
      eases: eases.in,
      // repeat: Infinity,
      // repeatType: "mirror",
      // repeatDelay: durations.sm * 4,
    },
  },
};

export const staggerLocationLinesAnimationProps = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: durations.xl * 2,
      ease: eases.in,
      duration: durations.xl,
      // staggerChildren: durations.md * 7,
      staggerChildren: durations.md * 4,
      // staggerDirection: -1,
    },
  },
};

export const locationLineAnimationProps = {
  initial: {
    pathLength: 0,
    pathOffset: 0,
  },

  animate: {
    pathLength: [0, 1, 1, 0, 0],
    pathOffset: [0, 0, 1, 1, 0],
    stroke: [
      '#F0005C',
      '#300032',
      '#F0005C',
      '#300032',
      '#F0005C',
      '#300032',
      '#F0005C',
      '#300032',
      '#F0005C',
      '#300032',
      '#F0005C',
    ],

    transition: {
      // duration: durations.xl * 5.5,
      duration: durations.xl * 3,
      eases: eases.inOut,
      repeat: Infinity,
      repeatType: 'reverse',
      repeatDelay: durations.md,
    },
  },
};
