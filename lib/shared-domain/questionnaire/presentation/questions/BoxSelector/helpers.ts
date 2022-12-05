import { borders } from 'styles/foundations/borderStyles';
import { colors } from 'styles/foundations/colors';
import { fontWeights } from 'styles/foundations/fontStyles';

interface UIOnClickBoxSelector {
  borderBoxSelector: string;
  borderCircleSelector: string;
  circleBorder: string;
  fontWeight: number;
  color: string;
}

export const setStylesOnClick = (isActive: boolean): UIOnClickBoxSelector => {
  const borderBoxSelector = isActive
    ? `${borders.borderWidth[1]} solid ${colors.primary.lightGreen}`
    : `${borders.borderWidth[1]} solid ${colors.boxSelector.initial}`;
  const borderCircleSelector = isActive
    ? `${borders.borderWidth[1]} solid ${colors.primary.darkGreen}`
    : `${borders.borderWidth[1]} solid ${colors.boxSelector.initial}`;
  const fontWeight = isActive ? fontWeights.highlight : fontWeights.regular;
  const color = isActive
    ? colors.primary.darkGreen
    : colors.primary.darkestGreen;
  const circleBorder = isActive
    ? `${borders.borderWidth.circleSelected} solid ${colors.primary.darkGreen}`
    : `${borders.borderWidth[1]} solid ${colors.boxSelector.circleInitial}`;

  return {
    borderBoxSelector,
    borderCircleSelector,
    circleBorder,
    fontWeight,
    color,
  };
};
