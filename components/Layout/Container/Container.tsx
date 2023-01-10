import styles from './Container.module.scss';

interface Props {
  paddingX?: boolean;
  classes?: string;
};

export const Container: React.FC<Props> = ({
  paddingX = true,
  classes,
  children
}) => {
  return (
    <div
      className={[
        styles.container,
        !paddingX ? styles.container__noPaddingX : '',
        classes ?? ''
      ].join(' ')}>
      {children}
    </div>
  );
};

export default Container;