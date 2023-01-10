import { CDIGlobalSectionModule } from '../../../domain/contentModule';
import { Box } from '../../../../../../components/Layout/Flex/Flex';
import { FadeInFadeOutAnimation } from '../../../../../animations/FadeInFadeOutAnimation';

export const renderBubbles = (
  percentage: number,
  specificContentModule: CDIGlobalSectionModule,
): JSX.Element[] => {
  const { length } = specificContentModule?.locations;
  const bubblesNumber = Math.floor(length / percentage);
  return specificContentModule.locations
    .slice(0, bubblesNumber)
    .map((b, i) => (
      <Bubble key={i} specificContentModule={specificContentModule} delay={i} />
    ));
};

const Bubble: React.FC<{
  specificContentModule: CDIGlobalSectionModule;
  delay: number;
}> = ({ specificContentModule, delay }) => (
  <FadeInFadeOutAnimation delay={delay}>
    <Box
      backgroundImage={`url(${specificContentModule.getSectionImage(
        'bubble',
      )})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      h={50}
      w={50}
      position="absolute"
      top={`${Math.random() * 100}%`}
      left={`${Math.random() * 100}%`}
    ></Box>
  </FadeInFadeOutAnimation>
);

export const BubbleBox: React.FC<{
  h: number;
  w: number;
  left: string;
  top: string;
  rotate?: number;
  radius?: string;
}> = ({ h, w, left, top, rotate, radius, children }) => (
  <Box
    position="absolute"
    h={h}
    w={w}
    left={left}
    top={top}
    transform={`rotate(${rotate}deg)`}
    borderTopRightRadius={radius}
  >
    {children}
  </Box>
);
