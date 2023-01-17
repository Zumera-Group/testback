import { Box, VStack } from '@chakra-ui/react';
import { Btn } from 'components/Buttons/Button';
import { FlexCol, FlexRow } from 'components/Layout/Flex/Flex';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { P } from 'components/Typography/P';
import { Tab } from 'lib/shared-domain/page/domain';
import React from 'react';
import { colors } from 'styles/foundations/colors';
import { fontSizes, fontWeights } from 'styles/foundations/fontStyles';

interface ServiceTabsProps {
  tabs: Tab[];
  onSelectTab(t: Tab): void;
  activeTabKey: string;
}

const displayTabs = ({ tabs, onSelectTab, activeTabKey }: ServiceTabsProps) =>
  tabs?.map((t) => {
    const isActiveTab = activeTabKey === t?._key;
    const tabStyle = isActiveTab
      ? {
          fontWeight: fontWeights.bold,
          textDecoration: 'underline',
          color: colors.primary.darkGreen,
        }
      : {
          fontWeight: fontWeights.regular,
          textDecoration: 'none',
          color: colors.text.light,
        };
    return (
      <Btn key={t?._key} variant="tab" onClick={() => onSelectTab(t)}>
        <P
          _hover={{
            fontWeight: fontWeights.semiBold,
            color: colors.primary.darkGreen,
            textDecoration: 'underline',
          }}
          // to avoid the tab items to move when fontWeight changes on hover
          _after={{
            content: `"${t?.title}"`,
            height: 0,
            visibility: 'hidden',
            fontWeight: fontWeights.semiBold,
          }}
          fontSize={fontSizes.h1_2}
          fontWeight={tabStyle.fontWeight}
          display="inline-flex"
          align="center"
          flexDirection="column"
          justifyContent="space-between"
          color={tabStyle.color}
          textDecoration={tabStyle.textDecoration}
        >
          {t?.title}
        </P>
      </Btn>
    );
  });

export const ServiceTabs_DISABLED: React.FC<ServiceTabsProps> = (props) => {
  return (
    <FlexCol bgColor={colors.tabsContainer}>
      <SectionContainer>
        <Box className="showDesktop">
          <FlexRow py={4.5} justifyContent="center">
            {displayTabs(props)}
          </FlexRow>
        </Box>
        <Box className="showMobile">
          <VStack spacing={4}>{displayTabs(props)}</VStack>
        </Box>
      </SectionContainer>
    </FlexCol>
  );
};
