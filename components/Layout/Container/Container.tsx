import styles from './Container.module.scss';

interface Props {
  paddingX?: boolean;
  classes?: string;
  id?: string;
}

export const Container: React.FC<Props> = ({
  paddingX = true,
  classes,
  children,
  id,
}) => {
  return (
    <div
      className={[
        styles.container,
        !paddingX ? styles.container__noPaddingX : '',
        classes ?? '',
      ].join(' ')}
      id={id}
    >
      {children}
    </div>
  );
};

export default Container;
