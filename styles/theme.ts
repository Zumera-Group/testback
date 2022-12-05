import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { colors } from './foundations/colors';
import { appSpaces as space } from './foundations/spaces';
import { components } from './components';
import { fontSizes, fonts } from './foundations/fontStyles';
import { globalStyles as styles } from './foundations/global';
import { borders } from './foundations/borderStyles';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export default extendTheme({
  borders,
  colors,
  components,
  fonts,
  fontSizes,
  space,
  styles,
  config,
});
