import { useRef, useState } from 'react';
// import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { motion, useAnimation } from 'framer-motion';
// import { Box, FlexRow } from '../../components/Layout/Flex/Flex';
import { H } from '../../components/Typography/H';
import { colors } from '../../styles/foundations/colors';

// Utils to get a random item, to fake that we are shuffling the list
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// Defines a height. Together with overflow='hidden' makes the effect possible
function useItemHeight() {
  // const isMobile = useBreakpointValue({ base: true, lg: false });
  return null;
  // return isMobile ? 65 : 70;
}

const animationConfiguration = (itemsLength, maxHeight) => ({
  y: [-itemsLength * maxHeight, -maxHeight + maxHeight],
  transition: {
    duration: 2.5,
    delay: 0.5,
    type: 'swing',
    ease: 'easeInOut',
    restSpeed: 2.0005,
    restDelta: 0.3,
  },
});

const N_ITEMS_FOR_LIST_EFFECT = 20;
// Here we can prepare the data to the items that are displayed
const useGetAllVisibleItems = (data: { name: string }[]) => {
  return {
    items: data.slice(0, N_ITEMS_FOR_LIST_EFFECT),
  };
};

const DELAY_BETWEEN_REPETITIONS_IN_MS = 2000;
const DELAY_TO_CHANGE_VISIBLE_INDEX = 1000;

const useAnimationControls = (itemMaxHeight, itemsLength, setIndex) => {
  const controls = useAnimation();
  const workaroundCount = useRef(0); // Somehow the animation is not started without this workaround. Tried useEffect and didn't work

  const onStartAnimationWithRepetitionEveryInterval = async () => {
    const controlStartPromise = controls.start(() =>
      animationConfiguration(itemsLength, itemMaxHeight),
    );

    controlStartPromise.then(() => {
      setTimeout(() => {
        onStartAnimationWithRepetitionEveryInterval(); // start again after some time
        setTimeout(() => {
          setIndex(getRandomInt(0, itemsLength - 1));
        }, DELAY_TO_CHANGE_VISIBLE_INDEX);
      }, DELAY_BETWEEN_REPETITIONS_IN_MS);
    });
  };

  if (workaroundCount.current < 3) {
    onStartAnimationWithRepetitionEveryInterval(); // first start
    workaroundCount.current = workaroundCount.current + 1;
  }

  return controls;
};

const getListOverflowToGiveAnimationEffect = () => {
  const overflow = 'hidden';

  if (overflow != 'hidden') throw Error('Overflow should be hidden');

  return overflow;
};

export const SlotMachineAnimation: React.FC<{
  data: { name: string }[];
}> = ({ data }) => {
  const [displayedItemIndex, setDisplayedItemIndex] = useState(0);
  const { items: listItems } = useGetAllVisibleItems(data);
  const itemMaxHeight = useItemHeight();

  const controls = useAnimationControls(
    itemMaxHeight,
    listItems.length,
    setDisplayedItemIndex,
  );

  const TextForIndex = (item, index) => {
    let randomNameForFirstIndexOrNameOtherwise = item.name;

    if (index === 0) {
      randomNameForFirstIndexOrNameOtherwise = data[displayedItemIndex]?.name;
    }

    return (
      <H
        as="h1"
        className="slotMachineHeading"
        color={colors.primary.lightGreen}
        whiteSpace="nowrap"
      >
        {randomNameForFirstIndexOrNameOtherwise}
      </H>
    );
  };
  return null;
  // return (
  //   <FlexRow
  //     className="slotMachineWrapper"
  //     h={itemMaxHeight}
  //     overflow={getListOverflowToGiveAnimationEffect()}
  //     position="relative"
  //     align="center"
  //   >
  //     <motion.div animate={controls} style={{ position: 'absolute', top: 0 }}>
  //       {listItems &&
  //         listItems.map((item, index) => (
  //           <Box
  //             key={index}
  //             maxH={itemMaxHeight}
  //             minH={itemMaxHeight}
  //             m={0}
  //             py={0}
  //             bgSize="contain"
  //             w="100%"
  //           >
  //             {TextForIndex(item, index)}
  //           </Box>
  //         ))}
  //     </motion.div>
  //   </FlexRow>
  // );
};
