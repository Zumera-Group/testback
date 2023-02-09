import { useBreakpointValue } from '@chakra-ui/react';

import React from 'react';
import { Box, FlexCol } from '../../../../../components/Layout/Flex/Flex';
import { ImageSliderSectionModule } from '../../domain/contentModule';
import Carousel from 'react-elastic-carousel';
// import arrowLeft from '../../../../../public/contentModules/imageSliderSection/arrowLeft.svg';
// import arrowRight from '../../../../../public/contentModules/imageSliderSection/arrowRight.svg';

export const ImageSliderSection: React.FC<{
  specificContentModule: ImageSliderSectionModule;
}> = ({ specificContentModule }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const carouselRef = React.useRef(null);
  const onNextStart = (currentItem, nextItem) => {
    if (currentItem.index === nextItem.index) {
      carouselRef.current.goTo(0);
    }
  };
  const onPrevStart = (currentItem, nextItem) => {
    if (currentItem.index === nextItem.index) {
      carouselRef.current.goTo(specificContentModule.slider.length);
    }
  };
  if (specificContentModule.slider.length === 0) return null;
  return (
    <Box width="100%" position="relative">
      {/* @ts-ignore */}
      <Carousel
        ref={carouselRef}
        onPrevStart={onPrevStart}
        onNextStart={onNextStart}
        disableArrowsOnEnd={false}
        itemPadding={[0, 0]}
        outerSpacing={0}
        enableMouseSwipe={true}
        pagination={false}
        isRTL={false}
        itemsToShow={1}
        itemPosition="START"
        renderArrow={({ type, onClick }) => (
          <FlexCol
            backgroundColor="white"
            zIndex={99}
            top="50%"
            left={type === 'PREV' && 5}
            right={type === 'NEXT' && 5}
            transform="translateY(-50%)"
            position="absolute"
            cursor="pointer"
            borderRadius="40px"
            alignItems="center"
            justifyContent="center"
            boxShadow="0px 10px 20px rgba(0, 0, 0, 0.1)"
            width="40px"
            height="40px"
            onClick={onClick}
          >
            {/*<img*/}
            {/*  style={{ width: '8px', height: '14px' }}*/}
            {/*  src={type === 'PREV' ? arrowLeft.src : arrowRight.src}*/}
            {/*/>*/}
          </FlexCol>
        )}
      >
        {specificContentModule.slider
          .filter((s) => s?.asset?.url)
          .map((s, index) => (
            <Box key={index} position="relative" width="100%">
              <img
                loading="lazy"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  height: isMobile ? 300 : 600,
                  width: '100%',
                }}
                alt={``}
                src={s?.asset?.url}
              />
            </Box>
          ))}
      </Carousel>
    </Box>
  );
};

export default ImageSliderSection;
