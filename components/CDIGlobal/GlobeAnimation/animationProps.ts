import { eases, durations } from 'lib/animationConstants';

export const staggerChildrenAnimationProps = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: durations.sm / 2,
    }
  },
};

export const verticalLineAnimationProps = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
    originY: '100%',
    originX: '50%',
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
    }
  }
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
      duration: durations.xl,
      staggerChildren: durations.sm * 2,
    }
  },
};

export const locationPointAnimationProps = {
  initial: {
    opacity: 0,
    scale: 0.75,
  },
  animate: {
    opacity: 1,
    scale: 1.25,
    transition: {
      duration: durations.xl,
      eases: eases.in,
      repeat: Infinity,
      repeatType: "mirror",
      repeatDelay: durations.sm * 4,
    }
  }
};