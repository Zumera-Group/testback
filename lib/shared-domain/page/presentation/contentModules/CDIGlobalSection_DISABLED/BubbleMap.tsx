import React from 'react';
import { CDIGlobalSectionModule } from '../../../domain/contentModule';
import { Box } from '../../../../../../components/Layout/Flex/Flex';
import { BubbleBox, renderBubbles } from './BubbleBox';
import { FadeInFadeOutAnimation } from 'lib/animations/FadeInFadeOutAnimation';

const BubbleMap: React.FC<{
  specificContentModule: CDIGlobalSectionModule;
  isVisible: boolean;
}> = ({ specificContentModule, isVisible }) => {
  const bubbleBoxes = [
    <BubbleBox key={1} h={100} w={200} left="39%" top="37%" rotate={-35}>
      {renderBubbles(3, specificContentModule)}
    </BubbleBox>,
    <BubbleBox
      key={2}
      h={50}
      w={125}
      left="47%"
      top="71%"
      rotate={90}
      radius="100px"
    >
      {renderBubbles(5, specificContentModule)}
    </BubbleBox>,
    <BubbleBox key={3} h={100} w={325} left="67%" top="43%">
      {renderBubbles(3, specificContentModule)}
    </BubbleBox>,
    <BubbleBox
      key={4}
      h={50}
      w={125}
      left="65%"
      top="60%"
      rotate={60}
      radius="50px"
    >
      {renderBubbles(5, specificContentModule)}
    </BubbleBox>,
  ];

  return (
    <>
      <Box
        backgroundImage={`url(${specificContentModule.getSectionImage('map')})`}
        backgroundPosition="center"
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        h="90%"
        w="100%"
        position="absolute"
      ></Box>

      {isVisible && (
        <>
          {bubbleBoxes.map((box, i) => (
            <FadeInFadeOutAnimation key={i} delay={i}>
              {box}
            </FadeInFadeOutAnimation>
          ))}
        </>
      )}
    </>
  );
};

const BubbleMapMobile: React.FC<{
  specificContentModule: CDIGlobalSectionModule;
  isVisible: boolean;
}> = ({ specificContentModule, isVisible }) => {
  return (
    <>
      <Box
        backgroundImage={`url(${specificContentModule.getSectionImage('map')})`}
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        h={200}
        w="100%"
        position="relative"
        right="5%"
      ></Box>

      {isVisible && (
        <BubbleBox h={100} w={200} left="25%" top="52%">
          {renderBubbles(3, specificContentModule)}
        </BubbleBox>
      )}
    </>
  );
};

export const animatedMap = {
  BubbleMap,
  BubbleMapMobile,
};
