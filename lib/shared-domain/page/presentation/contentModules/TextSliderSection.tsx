import Image from 'next/image';

import React from 'react';
import {
  Box,
  FlexCol,
  FlexRow,
} from '../../../../../components/Layout/Flex/Flex';
import { TextSliderSectionModule } from '../../domain/contentModule';
import Carousel from 'react-elastic-carousel';
import { P } from 'components/Typography/P';
import { colors } from 'styles/foundations/colors';
import { SanityBlockContent } from 'components/SanityBlockContent';
import { SectionContainer } from '../../../../../components/Layout/SectionContainer';
import { fontSizes } from 'styles/foundations/fontStyles';
import { Flex } from '@chakra-ui/react';
import { useOnElementIntersecting } from 'lib/hooks/useOnElementIntersecting';

export const TextSliderSection: React.FC<{
  specificContentModule: TextSliderSectionModule;
}> = ({ specificContentModule }) => {
  const carouselRef = React.useRef(null);
  const [enableAutoPlay, setEnableAutoPlay] = React.useState(false);

  const [containerRef, isVisible] = useOnElementIntersecting({
    threshold: 0,
    rootMargin: '0px 0px -20px 0px',
  });
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

  React.useEffect(() => {
    if (isVisible) {
      setEnableAutoPlay(true);
    } else {
      setEnableAutoPlay(false);
    }
  }, [isVisible]);

  if (specificContentModule.slider.length === 0) return null;

  return (
    <SectionContainer py="lg">
      <Flex
        ref={containerRef}
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems="center"
        width="100%"
        position="relative"
      >
        <FlexCol flex={1} width="100%">
          <Carousel
            ref={carouselRef}
            onPrevStart={onPrevStart}
            onNextStart={onNextStart}
            disableArrowsOnEnd={false}
            showArrows={false}
            autoPlaySpeed={5000}
            enableAutoPlay={enableAutoPlay}
            itemPadding={[25, 20]}
            outerSpacing={0}
            enableMouseSwipe={true}
            isRTL={false}
            itemsToShow={1}
            itemPosition="START"
            renderPagination={({ pages, activePage, onClick }) => (
              <FlexRow>
                {pages.map((p) => (
                  <Box
                    cursor="pointer"
                    onClick={() => onClick(String(p))}
                    mx={0.5}
                    key={p}
                    width="10px"
                    height="10px"
                    borderRadius="100%"
                    backgroundColor={activePage === p ? '#07362E' : '#9DBDB2'}
                  />
                ))}
              </FlexRow>
            )}
          >
            {specificContentModule.slider.map((s, index) => (
              <Box
                boxShadow="3px 5px 20px rgba(0, 29, 26, 0.25)"
                height={{ base: '350px', md: '300px' }}
                backgroundImage={`url(${specificContentModule.getBackgroundImage()})`}
                backgroundPosition="center"
                backgroundSize="cover"
                backgroundRepeat="no-repeat"
                key={index}
                position="relative"
                width="100%"
                p={4}
              >
                <P
                  fontWeight="600"
                  fontSize={{ base: fontSizes.h1_2, md: fontSizes.h1 }}
                  color={colors.white}
                  mb={2}
                >
                  {s.title}
                </P>
                <P
                  fontSize={{ base: fontSizes.p, md: fontSizes.h3 }}
                  color={colors.white}
                >
                  {Array.isArray(s.description) ? (
                    <SanityBlockContent text={s.description} />
                  ) : (
                    s.description
                  )}
                </P>
              </Box>
            ))}
          </Carousel>
        </FlexCol>
        <FlexCol flex={1} width="100%" mt={{ base: 4, md: 0 }}>
          {specificContentModule?.image?.asset?.url && (
            <Box position="relative" height="200px">
              <Image
                unoptimized
                loading="lazy"
                objectFit={'contain'}
                layout="fill"
                alt={``}
                src={specificContentModule?.image?.asset?.url}
              />
            </Box>
          )}
        </FlexCol>
      </Flex>
    </SectionContainer>
  );
};

export default TextSliderSection;
