interface Props {
  iconName?: string;
  width?: number;
  height?: number;
  viewBox?: string;
  stroke?: string;
  fill?: string;
}

export const Icon: React.FC<Props> = ({
  iconName,
  width = 24,
  height = 24,
  viewBox = '0 0 32 32',
  stroke = 'currentColor',
  fill = 'currentColor',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      stroke={stroke}
      fill={fill}
      color={'currentColor'}
    >
      <use href={`#icon-${iconName || 'cross'}`} />
    </svg>
  );
};

export default Icon;
