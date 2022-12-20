import styles from './Beam.module.scss';

import generateBeamColor from './utils';

interface Props {
  color: 'white' | 'primary' | 'secondary' | 'tertiary' | 'accent';
  glow?: boolean;
  classes?: string;
}

export const Beam: React.FC<Props> = ({ color, glow, classes }) => {
  const beamColor = generateBeamColor(color);
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 309 439"
      className={[
        styles.beam,
        beamColor,
        glow && styles.beam__glow,
        classes ?? ''
      ].join(' ')}
    >
      <path d="M309 0 82.35 409.015A58.174 58.174 0 0 1 31.469 439H0L226.65 29.985A58.168 58.168 0 0 1 277.532 0H309Z" />
    </svg>
  );
};

export default Beam;