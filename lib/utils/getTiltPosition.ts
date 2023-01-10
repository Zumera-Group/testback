// Use a ticker for performance
let TICKER = 0;
const TICKER_RATE = 10;
const updateNow = () => {
  return TICKER++ % TICKER_RATE === 0;
};

// Initial tilt values
let x = 0;
let y = 0;

export const getTiltPosition = (event, isPortrait) => {
  if (!event.gamma || !event.beta) {
    return {
      x: 0,
      y: 0,
    }
  };
  const TILT_OFFSET_X = 50;
  const TILT_LIMIT_X = isPortrait ? 180 + TILT_OFFSET_X : -180;
  const { alpha, beta, gamma} = event;

  if (updateNow()) {
    const normaliseAlpha = Math.round(alpha + 50); // Compensate for phone angle
    x = isPortrait ? Math.round(gamma) + TILT_OFFSET_X : Math.min(100, Math.max(0, normaliseAlpha));
    y = isPortrait ? Math.round(beta) : -Math.round(gamma);
    if (!isPortrait) {
      if (alpha > 100) {
        x = normaliseAlpha - 360;
      }
      if (x < 0) {
        x = 0;
      }
    } else {
      if (Math.abs(x) > TILT_LIMIT_X) {
        if (x > TILT_LIMIT_X) {
          x = TILT_LIMIT_X;
        }
      }
    }
  };

  return {
    x: x,
    y: y
  };
}