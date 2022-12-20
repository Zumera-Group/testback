import styles from './Grid.module.scss';

interface Props {
  as?: '' | 'section' | 'div' | 'article' | 'aside' | 'footer';
  justifyContent?: 'start' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'stretch' | 'center' | 'start' | 'end';
  fullWidth?: boolean;
  className?: string;
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
    <Component className={[styles.grid, className].join(' ')} {...rest}>
      <div className={[styles.row, fullWidth && styles.row__fullWidth].join(' ')} {...stylesToApply}>
        {children}
      </div>
    </Component>
  );
};

export default Grid;