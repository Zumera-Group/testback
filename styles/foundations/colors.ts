// import { theme as baseTheme } from '@chakra-ui/react';

const palette = {
  green: {
    100: '#F9FCFA',
    300: '#3DDFBA',
    500: '#17AA8B',
    800: '#0C4E40',
    900: '#14302D',
  },
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  duckEggLight: '#F4F5F0',
  duckEgg: '#F7F7E6',
  heroBlack: '##001D1A',
  gray: {
    50: '#f7fafc',
    200: '#F3F4F4',
    250: '#ebebeb',
    300: '#EDE8E2',
    400: '#CACACA',
    500: '#6B7280',
    600: '#9d9d9d',
    800: '#595959',
    850: '#202423',
    900: '#171923',
  },
};

export const colors = {
  // ...baseTheme.colors,
  duckEgg: palette.duckEgg,

  primary: {
    darkestGreen: palette.green[900],
    darkGreen: palette.green[800],
    lightGreen: palette.green[500],
    lighterGreen: palette.green[300],
    lightestGreen: palette.green[100],
    500: palette.green[800], // Needed to get the chakra progress bar running
  },
  black: palette.black,
  white: palette.white,
  transparent: palette.transparent,
  gray: palette.gray,
  text: {
    lightest: palette.gray[400],
    light: palette.gray[800],
    regular: palette.black,
    darker: palette.gray[850],
    textBoxGroup: palette.green[900],
  },
  circleBg: {
    inactive: palette.duckEgg,
    active: 'linear-gradient(101.37deg, #0C4E40 25.92%, #17AA8B 127.59%)',
  },
  circleCol: {
    inactive: palette.green[800],
    active: palette.duckEgg,
  },
  chatButtonBg:
    'linear-gradient(75.75deg, #202423 -62.74%, #13463D 2.79%, #17AA8B 78.98%, #40DFBA 102.17%);',
  estimationBoxBg: palette.duckEgg,
  //Input
  inputBgColor: palette.white,
  inputBorderColor: palette.gray[400],
  //Slider
  sliderBgColor: palette.gray[400],
  sliderActiveBgColor:
    'linear-gradient(101.37deg, #0C4E40 25.92%, #17AA8B 127.59%)',
  sliderThumbColor: palette.green[800],
  // Box Selector
  boxSelector: {
    initial: palette.gray[300],
    circleInitial: palette.gray[800],
  },
  // Partners About With Image Section
  partnersAboutBg: 'linear-gradient(90deg, #f1eae2, #fffffe)',
  // Orbit Selector

  orbitSelector:
    'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #F1005C 99.99%, rgba(255, 255, 255, 0) 100%)',
  achievedTransactionMultipleBar:
    'linear-gradient(273.27deg, #F7F7E6 47.91%, #CBA78D 106.17%)',
  achievedTransactionMultipleBarMobile:
    'linear-gradient(183.27deg, #F7F7E6 47.91%, #CBA78D 106.17%)',
  // Mobile Progressbar
  mobileProgressBarBg: palette.duckEgg,
  // Evaluation
  evaluationResultBg: palette.duckEgg,
  // Mobile Menu BG
  mobileMenuBg:
    'linear-gradient(235.93deg, rgba(12, 78, 64, 1) 19.54%, rgba(6, 98, 80, 1) 70.17%)',
  timelineBar: palette.gray[250],
  // Slider Chevron Hover
  sliderChevronBorderColor: palette.green[900],
  textBoxGroupCircleBgColor: palette.duckEgg,
  transactionsCardBoxShadow: '0px 10px 30px rgba(12, 78, 64, 0.25)',
  transactionsCardBoxShadowStrong:
    '0px 10px 30px rgba(24, 78, 64, 0.25)!important',
  transactionsCardBoxShadowHover:
    'drop-shadow(0px 20px 40px rgba(12, 78, 64, 0.35))',
  // service tabs
  tabsContainer: palette.duckEggLight,
};
