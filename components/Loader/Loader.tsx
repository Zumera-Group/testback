import styles from './Loader.module.scss';

export const Loader: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`${styles.loader} ${className}`}>
      <span></span>
    </div>
  );
};

export default Loader;
