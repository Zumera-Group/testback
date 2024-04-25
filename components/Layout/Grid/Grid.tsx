import styles from './Grid.module.scss';
import {ReactNode} from 'react';

interface Props {
  as?: '' | 'section' | 'div' | 'article' | 'aside' | 'footer';
  justifyContent?:
    | 'start'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'flex-end';
  alignItems?: 'stretch' | 'center' | 'start' | 'end';
  fullWidth?: boolean;
  className?: string;
  children: ReactNode|ReactNode[];
  style?: object;
}

export const Grid: React.FC<Props> = ({
  as,
  justifyContent,
  alignItems,
  fullWidth,
  className,
  children,
  ...rest
}) => {
  const Component = as || 'div';

  const stylesToApply = {
    style: {
      ...(justifyContent ? { justifyContent: justifyContent } : ''),
      ...(alignItems ? { alignItems: alignItems } : ''),
    },
  };

  return (
    <Component
      className={[
        styles.grid,
        fullWidth ? styles.grid__fullWidth : '',
        className,
      ].join(' ')}
      {...rest}
    >
      <div className={styles.row} {...stylesToApply}>
        {children}
      </div>
    </Component>
  );
};

export default Grid;
