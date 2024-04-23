import styles from './Container.module.scss';
import {ReactNode} from 'react';

interface Props {
  paddingX?: boolean;
  classes?: string;
  id?: string;
  children: ReactNode|ReactNode[];
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
