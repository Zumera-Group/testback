import styles from './Beam.module.scss';

const generateBeamColor = (color) => {

  const colors = {
    'white': styles.beam__white,
    'primary': styles.beam__primary,
    'secondary': styles.beam__secondary,
    'tertiary': styles.beam__tertiary,
    'accent': styles.beam__accent,
  };

  if (!colors[color]) return;
  return colors[color];
}

export default generateBeamColor;