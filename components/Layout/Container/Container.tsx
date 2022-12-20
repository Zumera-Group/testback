import styles from './Container.module.scss';

export const Container: React.FC<{ classes?: string }> = ({ children, classes }) => {
  return (
    <div className={[styles.container, classes ?? ''].join(' ')}>
      {children}
    </div>
  );
};

export default Container;