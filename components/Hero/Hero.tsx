import styles from './Hero.module.scss';

interface Props {}

const Hero: React.FC<Props> = ({ ...rest }) => {
  console.log(rest, 'rest');
  return (
    <div className={styles.heroContainer}>
      this is our hero!!
    </div>
  );
};

export default Hero;
