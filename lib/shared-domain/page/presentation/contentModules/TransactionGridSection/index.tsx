import React, { useCallback, useState } from 'react';

import { TransactionGridSectionModule } from '../../../domain/contentModule';
import {
  FormLabel,
  Show,
  VStack,
  Hide,
  GridItem,
  Grid,
  Spinner,
} from '@chakra-ui/react';
import { Popover, PopoverPosition } from 'react-tiny-popover';
import { AnimatePresence, motion } from 'framer-motion';

import { SectionContainer } from '../../../../../../components/Layout/SectionContainer';
import { icons } from '../../../../../../components/Icons/index';
import { colors } from 'styles/foundations/colors';
import {
  Box,
  FlexCol,
  FlexRow,
} from '../../../../../../components/Layout/Flex/Flex';
import { P } from '../../../../../../components/Typography/P';
import { Btn } from '../../../../../../components/Buttons/Button/index';
import { Transaction } from '../../../../transactions/domain/index';
import { useTransactionGrid } from './useTransactionGrid';
import { DropdownMenu } from './DropdownMenu';
import { links } from 'lib/links';
import {
  TransactionCard,
  transactionCardVariants,
  TRANSACTION_GRID_HEIGHT,
} from '../../../../transactions/presentation/components/TransactionCard';
import Link from 'next/link';
import { useWindowDimensions } from 'lib/hooks/useWindowDimensions';
import { useSelectSector } from './state';
import { useOnElementIntersecting } from 'lib/hooks/useOnElementIntersecting';
import { fetchTransactions } from 'lib/shared-domain/transactions/application/useGetTransactions';
import { useRouter } from 'next/router';
import _ from 'lodash';

const TransactionMobileStack: React.FC<{
  transactionsToDisplay: Transaction[];
}> = ({ transactionsToDisplay }) => {
  return (
    <VStack mt={6} spacing={2}>
      {transactionsToDisplay.map((t, index) => (
        <Link key={index} passHref href={links().transactions(t)}>
          <FlexCol
            as="a"
            cursor="pointer"
            boxShadow="0px 10px 30px rgba(12, 78, 64, 0.25)"
            w="100%"
            justify="center"
            align="center"
            py={3}
            px={2}
          >
            <Box>
              <P textAlign="center" variant="transactionGridP">
                {t.companyName1}
              </P>
            </Box>
            <Box py={3}>
              <icons.TransactionX
                size="20px"
                color={colors.primary.darkGreen}
                strokeW="6px"
              />
            </Box>
            <Box>
              <P textAlign="center" variant="transactionGridP">
                {t.companyName2}
              </P>
            </Box>
          </FlexCol>
        </Link>
      ))}
    </VStack>
  );
};

const TransactionPopover = ({ transaction }) => {
  const textCardBottomSpacing = 3;
  const motionInitial = { opacity: 0, y: 2 };
  const motionAnimate = { opacity: 1, y: 0 };
  const motionExit = { opacity: 0, y: 2 };

  const Card = (
    <motion.div
      initial={motionInitial}
      animate={motionAnimate}
      exit={motionExit}
    >
      <Box
        marginBottom={textCardBottomSpacing}
        boxShadow={colors.transactionsCardBoxShadow}
        style={{ boxShadow: colors.transactionsCardBoxShadow }}
      >
        <TransactionCard
          variant={transactionCardVariants.transactionGrid}
          transaction={transaction}
          linkText="Read more"
        />
      </Box>
    </motion.div>
  );

  return <AnimatePresence exitBeforeEnter>{Card}</AnimatePresence>;
};

const GRID_WITH = 22;

const TransactionItemWithPopover: React.FC<{
  handleHoverIn(): void;
  handleHoverOut(): void;
  currentHoverIndex: number;
  index: number;
  transaction: Transaction;
  iconSize: any;
  isTransactionSelected: boolean;
  setIsTransactionSelected: (any) => any;
  selectedTransactionIndex: number;
  shouldHoverSiblings: boolean;
}> = ({
  handleHoverIn,
  handleHoverOut,
  currentHoverIndex,
  index,
  transaction,
  iconSize,
  isTransactionSelected,
  setIsTransactionSelected,
  selectedTransactionIndex,
  shouldHoverSiblings,
}) => {
  const isHoverOrNeighborOfHovered = React.useCallback(() => {
    if (currentHoverIndex == null) return false;

    if (currentHoverIndex === index) return true;

    if (!shouldHoverSiblings) return false;

    if (currentHoverIndex - 1 === index) return true;
    if (currentHoverIndex + 1 === index) return true;

    if (currentHoverIndex - GRID_WITH === index) return true;

    if (currentHoverIndex + GRID_WITH === index) return true;

    return false;
  }, [currentHoverIndex, index, shouldHoverSiblings]);

  const [isOpen, setIsOpen] = React.useState(false);
  const [isAnotherTransactionSelected, setIsAnotherTransactionSelected] =
    React.useState(false);

  const [position, setPosition] = React.useState<PopoverPosition>('bottom');

  const posRef = React.useRef<HTMLDivElement>(null);
  const { windowHeight } = useWindowDimensions();

  React.useEffect(() => {
    const isAnotherSelected =
      selectedTransactionIndex != null && !(selectedTransactionIndex === index);

    setTimeout(() => {
      setIsAnotherTransactionSelected(isAnotherSelected);
    }, 500);
  }, [selectedTransactionIndex, index]);

  React.useEffect(() => {
    const newIsOpen =
      !isAnotherTransactionSelected &&
      (currentHoverIndex === index || isTransactionSelected);

    if (newIsOpen) {
      const top = posRef.current.getBoundingClientRect().top;

      const isVisibleTop =
        top >= 0 && top + TRANSACTION_GRID_HEIGHT <= windowHeight;

      setPosition(isVisibleTop ? 'bottom' : 'top');
    }
    setIsOpen(newIsOpen);
  }, [
    isAnotherTransactionSelected,
    currentHoverIndex,
    index,
    isTransactionSelected,
  ]);

  const [transformStyle, setTransformStyle] = React.useState('rotate(0)');

  React.useEffect(() => {
    if (isTransactionSelected) {
      setTransformStyle(
        `rotate(90deg) scale(${shouldHoverSiblings ? '1.6' : '1.4'})`,
      );
      return;
    }
    if (isHoverOrNeighborOfHovered() && !isAnotherTransactionSelected) {
      setTransformStyle(
        `rotate(45deg) scale(${shouldHoverSiblings ? '1.4' : '1.2'})`,
      );
      return;
    }
    if (isAnotherTransactionSelected) {
      setTransformStyle('rotate(-90deg) scale(1.7)');
      setTimeout(() => {
        setTransformStyle('rotate(-90deg) scale(1)');
      }, 1000);
      return;
    }
    setTransformStyle('rotate(0)');
  }, [
    isAnotherTransactionSelected,
    isHoverOrNeighborOfHovered,
    isTransactionSelected,
    shouldHoverSiblings,
  ]);

  const getTransitionStyle = () => {
    if (isAnotherTransactionSelected) return `transform 0.4s ease-in-out`;
    return 'transform 0.5s ease-in-out';
  };

  const getTransitionDelay = () => {
    if (isAnotherTransactionSelected) return `${(index % 22) / 20}s`;
    return '';
  };

  const getColor = () => {
    return isTransactionSelected
      ? colors.primary.lightGreen
      : colors.primary.darkGreen;
  };

  const getStroke = () =>
    isTransactionSelected ||
    (isHoverOrNeighborOfHovered() && !isAnotherTransactionSelected)
      ? '12px'
      : '6px';

  const iconStyle = {
    transform: transformStyle,
    willChange: 'all',
    transition: getTransitionStyle(),
    transitionDelay: getTransitionDelay(),
    opacity: isAnotherTransactionSelected ? 0.5 : 1,
  };

  const Icon = (
    <icons.TransactionX
      style={iconStyle}
      size={iconSize}
      color={getColor()}
      strokeW={getStroke()}
    />
  );

  return (
    <Box ref={posRef}>
      <Popover
        isOpen={isOpen}
        positions={[position]}
        onClickOutside={() => setIsTransactionSelected(null)}
        content={() => <TransactionPopover transaction={transaction} />}
      >
        <Box
          p={2}
          as="button"
          transition=".2s all ease"
          onMouseEnter={handleHoverIn}
          onMouseLeave={handleHoverOut}
          pointerEvents={isAnotherTransactionSelected ? 'none' : undefined}
          onClick={() => {
            setIsTransactionSelected(index);
          }}
        >
          {Icon}
        </Box>
      </Popover>
    </Box>
  );
};

export const TransactionGridSection: React.FC<{
  specificContentModule: TransactionGridSectionModule;
}> = ({ specificContentModule }) => {
  const [containerRef, isVisible] = useOnElementIntersecting({
    threshold: 0,
    rootMargin: '0px 0px -20px 0px',
  });
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(true);
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && isVisible) {
      fetchTransactions(router.locale as any).then((t) => {
        setTransactions(t);
        setIsLoading(false);
      });
    }
  }, [isVisible]);

  const [selectedTransactionIndex, setSelectedTransactionIndex] =
    useState(null);
  const { sortedSectors, sortedServices, buttonText } = specificContentModule;
  const {
    onSelectSector,
    onSelectService,
    onShowMore,
    transactionsSelected,
    maxTransactionsToDisplay,
    moreTransactionsToShow,
  } = useTransactionGrid(transactions);

  const [currentHoverIndex, setIsCurrentHoverIndex] = useState<number>(null);
  useState<boolean>(false);
  const { selectSector } = useSelectSector();

  const onUpdateHoveredItem = (index: number) => {
    setIsCurrentHoverIndex(index);
  };

  const debouncedChangeHandler = React.useCallback(
    _.debounce(onUpdateHoveredItem, 300),
    [],
  );

  const Mobile = (
    <Show below="lg">
      <DropdownMenu
        services={sortedServices}
        sectors={sortedSectors}
        handleSector={(name, sector) => {
          selectSector(sector);
          onSelectSector(name);
        }}
        handleService={onSelectService}
      />
      <TransactionMobileStack
        transactionsToDisplay={transactionsSelected.slice(
          0,
          maxTransactionsToDisplay,
        )}
      />

      {moreTransactionsToShow && (
        <FlexRow justify="center" my={6}>
          <Btn
            transition=".2s ease-in all"
            _hover={{
              transform: 'translateY(-2px)',
            }}
            px={0}
            mr={1}
            onClick={onShowMore}
            variant="transactionGrid"
          >
            <FlexRow
              align="center"
              justify="center"
              borderBottom={`1px solid ${colors.black}`}
              pb={1}
            >
              <P fontSize="small">{buttonText.trim()}</P>
              <Box ml={1}>
                <icons.LinkArrow color={colors.text.regular} />
              </Box>
            </FlexRow>
          </Btn>
        </FlexRow>
      )}
    </Show>
  );

  const Desktop = (
    <Hide below="lg">
      <FlexRow mx={1.5} justify="center" align="center">
        <FormLabel mr={0} mb={0}>
          <P variant="transactionDropdownP" color={colors.primary.darkGreen}>
            {specificContentModule.dropdownsTitle}
          </P>
        </FormLabel>
        <Box mx={8}>
          <icons.EqualSign />
        </Box>
        <DropdownMenu
          services={sortedServices}
          sectors={sortedSectors}
          handleSector={(name, sector) => {
            onSelectSector(name);
            selectSector(sector);
          }}
          handleService={onSelectService}
        />
      </FlexRow>

      <FlexCol alignItems="center" mt={6} flex={1}>
        <Grid
          maxWidth="100%"
          templateColumns={`repeat(${
            transactionsSelected.length < GRID_WITH ? '12' : GRID_WITH
          }, 1fr)`}
        >
          {transactionsSelected.map((transaction, index) => (
            <GridItem key={index}>
              <TransactionItemWithPopover
                handleHoverIn={() => {
                  debouncedChangeHandler(index);
                }}
                handleHoverOut={() => {
                  debouncedChangeHandler(null);
                }}
                currentHoverIndex={currentHoverIndex}
                index={index}
                transaction={transaction}
                iconSize={
                  transactionsSelected.length < GRID_WITH ? '64px' : '20px'
                }
                shouldHoverSiblings={transactionsSelected.length >= GRID_WITH}
                setIsTransactionSelected={(i) => {
                  setSelectedTransactionIndex(i);
                }}
                isTransactionSelected={selectedTransactionIndex === index}
                selectedTransactionIndex={selectedTransactionIndex}
              />
            </GridItem>
          ))}
        </Grid>
      </FlexCol>
    </Hide>
  );

  return (
    <Box ref={containerRef}>
      {isVisible && (
        <SectionContainer py="lg">
          {isLoading ? (
            <FlexCol alignItems="center">
              <Spinner size="xl" />
            </FlexCol>
          ) : (
            <>
              {Desktop}
              {Mobile}
            </>
          )}
        </SectionContainer>
      )}
    </Box>
  );
};

export default TransactionGridSection;
