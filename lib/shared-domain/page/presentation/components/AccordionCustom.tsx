import { useState } from 'react';
// import {
//   Accordion,
//   AccordionButton,
//   AccordionItem,
//   AccordionPanel,
//   Box,
//   Grid,
//   GridItem,
// } from '@chakra-ui/react';
import { colors } from 'styles/foundations/colors';
import { H } from '../../../../../components/Typography/H';
// import { FlexRow } from '../../../../../components/Layout/Flex/Flex';
// import { icons } from '../../../../../components/Icons/index';
import { P } from '../../../../../components/Typography/P';
import React from 'react';
//TODO: To delete
export const AccordionButtonCustom: React.FC<{
  isOpen?: boolean;
  onClick?(): void;
  pVariant?: string;
  iconSize?: string;
}> = ({
  children,
  isOpen,
  onClick,
  pVariant = 'globalNetworkOfficeItemContent',
  iconSize = '25px',
}) => {
  return null;
  // return (
  //   <H>
  //     <AccordionButton
  //       onClick={onClick}
  //       _expanded={{ bg: colors.white }}
  //       px={0}
  //       mx={0}
  //       cursor={!onClick && 'default'}
  //     >
  //       <FlexRow w={'100%'} alignItems="center" justifyContent="space-between">
  //         <P
  //           textAlign="left"
  //           variant={pVariant}
  //           color={isOpen ? colors.primary.lightGreen : colors.black}
  //         >
  //           {children}
  //         </P>
  //         {onClick && (
  //           <Box
  //             ml={2}
  //             transform={isOpen ? 'rotate(0deg)' : 'rotate(45deg)'}
  //             w="25px"
  //             transition=".2s all ease"
  //           >
  //             <icons.TransactionX
  //               size={iconSize}
  //               color={isOpen ? colors.primary.lightGreen : colors.black}
  //               strokeW="10px"
  //             />
  //           </Box>
  //         )}
  //       </FlexRow>
  //     </AccordionButton>
  //   </H>
  // );
};

export const AccordionItemCustom: React.FC<{
  buttonText?: string;
  pVariant?: string;
  iconSize?: string;
}> = ({ buttonText, pVariant, iconSize, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return null;
  // return (
  //   <AccordionItem>
  //     <GridItem
  //       py={0}
  //       borderTopStyle="solid"
  //       borderTopColor={colors.black}
  //       borderTopWidth="2px"
  //     >
  //       <AccordionButtonCustom
  //         isOpen={isOpen}
  //         onClick={
  //           React.Children.count(children) > 0
  //             ? () => setIsOpen((prevOpen) => !prevOpen)
  //             : null
  //         }
  //         pVariant={pVariant}
  //         iconSize={iconSize}
  //       >
  //         {buttonText}
  //       </AccordionButtonCustom>
  //       {React.Children.count(children) > 0 && (
  //         <AccordionPanel px={0}>{children}</AccordionPanel>
  //       )}
  //     </GridItem>
  //   </AccordionItem>
  // );
};

export const AccordionCustom: React.FC = ({ children }) => {
  return null;
  // return (
  //   <Accordion allowToggle allowMultiple>
  //     <Grid templateColumns="100%" gap={0}>
  //       {children}
  //     </Grid>
  //   </Accordion>
  // );
};
