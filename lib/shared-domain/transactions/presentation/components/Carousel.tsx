import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { Box, FlexCol, FlexRow } from 'components/Layout/Flex/Flex';
import React, { useRef, useState } from 'react';

import Carousel from 'react-elastic-carousel';
import { colors } from 'styles/foundations/colors';

const Button: React.FC<{
  icon: JSX.Element;
  onClick: () => void;
  justify: 'flex-end' | 'flex-start';
  isVisible: boolean;
}> = ({ icon, onClick, justify, isVisible }) => {
  return (
    <Flex
      bg="white"
      w={'46px'}
      h={'46px'}
      cursor={isVisible ? 'pointer' : 'auto'}
      onClick={isVisible ? onClick : undefined}
      align="center"
      transition="opacity 500ms"
      justify={justify}
      borderWidth="1px"
      borderColor={colors.gray[400]}
      _hover={{ borderColor: colors.black }}
      justifyContent="center"
    >
      {icon}
    </Flex>
  );
};

export const CostumedCarousel: React.FC<{
  iconLeft: any;
  iconRight: any;
  description?: any;
}> = ({ children, iconLeft, iconRight, description }) => {
  const reference = useRef<any>();
  const [previousVisible, setPreviousVisible] = useState(false);
  // const isMobile = useBreakpointValue({ base: true, md: false });
  const isMobile = false;
  const [nextVisible, setNextVisible] = useState(true);

  const onChange = () => {
    if (reference.current?.state) {
      const hasNext =
        reference.current.state.activePage <=
        reference.current.state.pages.length - 1;

      setPreviousVisible(reference.current.state.activePage > 0);
      setNextVisible(hasNext);
    }
  };

  const slideNext = () => {
    if (reference.current) {
      reference.current.slideNext();
    }
  };

  const slidePrevious = () => {
    if (reference.current) {
      reference.current.slidePrev();
    }
  };

  const getItemsToShow = () => {
    if (isMobile) return 1;
    return 3;
  };

  return (
    <FlexCol maxH="900px" w="100%">
      <Flex
        flex={1}
        direction={{ base: 'row', md: 'row' }}
        justifyContent={{ base: null, md: 'flex-end' }}
        w={{ base: '100%', md: '100%' }}
        ml={{ xs: 1 }}
      >
        {description}

        <FlexRow mb={{ base: 4, md: 0 }} mr={4.5} flex={1} justify="flex-end">
          <Button
            icon={iconLeft}
            onClick={slidePrevious}
            justify="flex-start"
            isVisible={previousVisible}
          />
          <Box mr={1} />

          <Button
            icon={iconRight}
            onClick={slideNext}
            justify="flex-end"
            isVisible={nextVisible}
          />
        </FlexRow>
      </Flex>
      <Flex w="100%" justifyContent="flex-start" p={-4}>
        {/*<Carousel*/}
        {/*  itemPadding={[0, 0]}*/}
        {/*  outerSpacing={0}*/}
        {/*  ref={reference}*/}
        {/*  onChange={onChange}*/}
        {/*  showArrows={false}*/}
        {/*  enableMouseSwipe={true}*/}
        {/*  pagination={false}*/}
        {/*  isRTL={false}*/}
        {/*  itemsToShow={getItemsToShow()}*/}
        {/*  itemPosition="START"*/}
        {/*>*/}
        {/*  {children}*/}
        {/*</Carousel>*/}
      </Flex>
    </FlexCol>
  );
};
