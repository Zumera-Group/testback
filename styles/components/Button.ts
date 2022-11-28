import { colors } from 'styles/foundations/colors';
import { fontWeights } from 'styles/foundations/fontStyles';

export const ButtonStyles = {
  baseStyle: {
    fontWeight: fontWeights.highlight,
    transition: '.2s ease-in all',
    borderRadius: 'none', // <-- border radius is same for all variants and sizes
    _hover: {
      boxShadow: '0px 15px 40px rgba(12, 78, 64, 0.35)',
    },
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 5, // <-- px is short for paddingLeft and paddingRight
      py: 2, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: 'md',
      px: 6, // <-- these values are tokens from the design system
      py: 3, // <-- these values are tokens from the design system
    },
  },
  variants: {
    outline: {
      border: '1px solid',
      borderColor: 'black',
      color: 'black',
    },
    outlineWhite: {
      border: '1px solid',
      borderColor: 'white',
      color: 'white',
    },
    outlineGreen: {
      border: '1px solid',
      borderColor: colors.primary.darkGreen,
      color: colors.primary.darkGreen,
    },
    solid: {
      bg: colors.primary.darkGreen,
      color: 'white',
      _hover: {
        boxShadow: '0px 15px 40px rgba(12, 78, 64, 0.35)',
        background: colors.primary.darkGreen,
      },
    },
    primary: {
      background:
        'linear-gradient(75.75deg, #202423 -62.74%, #13463D 2.79%, #17AA8B 78.98%, #40DFBA 102.17%)  !important',
      color: colors.white,
      _hover: {
        boxShadow: '0px 15px 40px rgba(12, 78, 64, 0.35)',
        background:
          'linear-gradient(75.75deg, #202423 -62.74%, #13463D 2.79%, #17AA8B 78.98%, #40DFBA 102.17%) !important',
      },
    },
    white: {
      background: colors.white,
      color: colors.primary.darkGreen,
      _hover: {
        boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.35)',
        background: colors.white,
      },
    },
    transparent: {
      bg: 'transparent',
      textTransform: 'capitalize',
      fontWeight: 'inherit',
      _hover: {
        textDecoration: 'underline',
        boxShadow: 'none',
      },
    },
    tab: {
      bg: 'transparent',
      textTransform: 'capitalize',
      _hover: {
        boxShadow: 'none',
      },
    },
    chatButton: {
      boxShadow: '0px 20px 40px rgba(12, 78, 64, 0.35)',
    },
    transactionGrid: {
      bg: 'transparent',
      textTransform: 'capitalize',
      _hover: {
        bg: 'transparent',
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
};
