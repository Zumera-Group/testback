import { Flex, Grid } from '@chakra-ui/react';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { SanityBlockContent } from 'components/SanityBlockContent';
import { P } from 'components/Typography/P';
import Image from 'next/image';

import React from 'react';
import { colors } from 'styles/foundations/colors';
import { fontSizes } from 'styles/foundations/fontStyles';
import {
  Box,
  FlexCol,
  FlexRow,
} from '../../../../../components/Layout/Flex/Flex';
import { TabSectionModule } from '../../domain/contentModule';
import { AnimatePresence, motion } from 'framer-motion';

export const TabSection: React.FC<{
  specificContentModule: TabSectionModule;
}> = ({ specificContentModule }) => {
  const [selectedTab, setSelectedTab] = React.useState(
    specificContentModule.tabs[0],
  );
  React.useEffect(() => {
    setSelectedTab(specificContentModule.tabs[0]);
  }, [JSON.stringify(specificContentModule.tabs)]);

  return (
    <SectionContainer py="lg">
      <FlexRow mb={{ base: 2, md: 6 }} justifyContent="center" flexWrap="wrap">
        {specificContentModule.tabs?.map((t, index) => (
          <FlexCol
            mb={2}
            alignItems="center"
            width={{ base: '140px', md: '150px' }}
            key={index}
          >
            <Box width="fit-content">
              <P
                fontSize={fontSizes.h2}
                cursor="pointer"
                onClick={() => {
                  setSelectedTab(null);
                  setTimeout(() => {
                    setSelectedTab(t);
                  }, 200);
                }}
                _hover={{ opacity: 1 }}
                opacity={selectedTab === t ? 1 : 0.5}
                borderBottom={'2px solid'}
                borderBottomColor={
                  selectedTab === t
                    ? colors.primary.darkestGreen
                    : 'transparent'
                }
                color={colors.primary.darkestGreen}
                fontWeight="600"
              >
                {t.title}
              </P>
            </Box>
          </FlexCol>
        ))}
      </FlexRow>
      <AnimatePresence>
        {selectedTab && (
          <motion.div
            initial={{ opacity: 0, x: '-50px' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '50px' }}
          >
            <Flex flexDirection={{ base: 'column', md: 'row' }}>
              <FlexCol mb={2} mr={5} flex={1} width="100%">
                {selectedTab?.image?.asset?.url && (
                  <Box width="100%" height="400px" position="relative">
                    <Image
                      unoptimized
                      loading="lazy"
                      objectFit="cover"
                      src={selectedTab?.image?.asset?.url}
                      alt={``}
                      layout="fill"
                    />
                  </Box>
                )}
              </FlexCol>
              <FlexCol flex={1} width="100%">
                <P
                  color={colors.primary.darkestGreen}
                  mb={3}
                  fontSize={fontSizes.h1}
                  fontWeight="600"
                >
                  {selectedTab.subtitle}
                </P>
                <P color={colors.text.light}>
                  {Array.isArray(selectedTab.description) ? (
                    <SanityBlockContent text={selectedTab.description} />
                  ) : (
                    selectedTab.description
                  )}
                </P>
              </FlexCol>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionContainer>
  );
};

export default TabSection;
