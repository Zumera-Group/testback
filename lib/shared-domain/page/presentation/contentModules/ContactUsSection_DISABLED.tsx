import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';

import { ContactUsSectionModule } from '../../domain/contentModule';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';

import { Box, FlexRow } from '../../../../../components/Layout/Flex/Flex';
import { P } from 'components/Typography/P';
import { colors } from 'styles/foundations/colors';
import { LinkWithArrow } from '../components/LinkWithArrow';

import {
  paddingForSpaceY,
  SectionContainerWithoutPyAndPb,
} from 'components/Layout/SectionContainer';
import { ContactForm } from '../ContactForm';
import { fontSizes } from 'styles/foundations/fontStyles';

export const ContactUsSection: React.FC<{
  specificContentModule: ContactUsSectionModule;
  content?: any;
}> = ({ specificContentModule, content }) => {
  const isEmployeeDetail = !specificContentModule;
  const contentModule = specificContentModule ? specificContentModule : content;
  const [selectedOffice, setSelectedOffice] = React.useState(
    contentModule?.offices?.[0],
  );
  if (!specificContentModule && !content) return null;
  return (
    <SectionContainerWithoutPyAndPb py={isEmployeeDetail ? 'md' : 'md'}>
      <span id="link-to-contact-section" />
      <Grid
        templateColumns={{
          base: 'repeat(auto-fit, minmax(330px, 1fr))',
          lg: '1fr 1.5fr',
        }}
        gap={6}
      >
        <GridItem>
          <TitleWithSubtitleAndDescription {...contentModule} />

          <FlexRow mt={4} flexWrap="wrap">
            {contentModule?.offices?.map((o, index) => (
              <Box
                onClick={() => {
                  setSelectedOffice(o);
                }}
                pb={0.5}
                mb={1}
                borderBottomWidth="1px"
                borderBottomStyle="solid"
                borderBottomColor={
                  selectedOffice === o
                    ? colors.primary.lightGreen
                    : 'transparent'
                }
                mr={3}
                as="button"
                key={index}
                _hover={{ borderBottomColor: colors.primary.lightGreen }}
              >
                <P
                  noOfLines={1}
                  textAlign="left"
                  fontSize={fontSizes.h3}
                  color={
                    selectedOffice === o
                      ? colors.primary.lightGreen
                      : colors.text.light
                  }
                >
                  {o.city}
                </P>
              </Box>
            ))}
          </FlexRow>

          {selectedOffice && (
            <Box mt={4}>
              <P color={colors.text.light} pb={1}>
                {selectedOffice.street + ' ' + selectedOffice.houseNumber}
              </P>
              <P color={colors.text.light} pb={1}>
                {selectedOffice.zipCode + ' ' + selectedOffice.city}
              </P>
              <P color={colors.text.light} pb={5}>
                {selectedOffice.phoneNumber}
              </P>

              {selectedOffice.calendlyLink && (
                <LinkWithArrow
                  href={selectedOffice.calendlyLink}
                  title={contentModule.appointmentLinkText}
                />
              )}
            </Box>
          )}
        </GridItem>
        <GridItem maxWidth="102vw" mx={{ base: -paddingForSpaceY.xs, lg: 0 }}>
          <ContactForm contactForm={contentModule?.contactForm} />
        </GridItem>
      </Grid>
    </SectionContainerWithoutPyAndPb>
  );
};

export default ContactUsSection;
