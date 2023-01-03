import styles from './Description.module.scss';

interface Props {
  description: string;
  disabled?: boolean;
}

export const Description: React.FC<Props> = ({ description, disabled }) => {
  return (
    <p className={[
      styles.description,
      disabled ? styles.description__disabled : ''
    ].join(' ')}
    >
      {description}
    </p>
  );
};

export default Description;