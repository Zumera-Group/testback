import { Button, ButtonProps } from '@chakra-ui/react';
import { icons } from 'components/Icons';

export const Btn: React.FC<ButtonProps> = ({
  variant = 'primary',
  paddingY = 1.5,
  paddingX = 6,
  onClick = () => {},
  children,
  ...props
}) => {
  const isLoading = false;
  return (
    <Button
      textTransform="unset"
      py={paddingY}
      px={paddingX}
      variant={variant}
      onClick={onClick}
      {...props}
    >
      {isLoading ? <icons.Loader /> : children}
    </Button>
  );
};
