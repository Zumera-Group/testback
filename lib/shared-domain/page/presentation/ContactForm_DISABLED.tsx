import { useBreakpointValue, Grid, GridItem, Checkbox } from '@chakra-ui/react';
import { Btn } from 'components/Buttons/Button';
import Link from 'next/link';
import { icons } from 'components/Icons';
import { Input, Textarea } from 'components/Inputs';
import { Box, FlexRow } from 'components/Layout/Flex/Flex';
import { H } from 'components/Typography/H';
import { P } from 'components/Typography/P';
import { useContactFormSubmit } from 'lib/shared-domain/salesforce/application/useContactFormSubmit';
import React from 'react';
import { colors } from 'styles/foundations/colors';
import { fontSizes } from 'styles/foundations/fontStyles';
import { sectionImages } from './contentModules/sectionImages';
import { fontWeights } from '../../../../styles/foundations/fontStyles';
import { useSharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { SanityBlockContent } from 'components/SanityBlockContent';
import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';

const INPUT_PROPS = {
  border: 'none',
  _placeholder: { color: colors.primary.darkGreen },
  height: '53px',
  fontSize: fontSizes.small,
};

export const ContactForm: React.FC<{
  contactForm: {
    title: string;
    description: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phoneNumberPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    buttonText: string;
    successMessage: string;
    errorMessage: string;
  };
}> = ({ contactForm }) => {
  const [checkboxIsChecked, setCheckboxIsChecked] = React.useState(false);
  const sharedContent = useSharedContentContext();
  const variant = useBreakpointValue({
    base: 'mobileContactFormH',
    lg: 'contactFormH',
  });
  const form = useContactFormSubmit();
  const linkWithCurrentLocale = useLinkWithCurrentLocale();

  return (
    <Box
      backgroundImage={`url(${sectionImages.contactUsSectionBgImage.src})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      p={4}
    >
      <Box width={{ base: '100%', lg: '50%' }}>
        <H
          fontWeight="regular"
          variant={variant}
          mb={2}
          mt={1}
          color={colors.white}
        >
          {contactForm?.title}
        </H>
        {contactForm?.description && (
          <Box>
            <P color={colors.white}>
              {Array.isArray(contactForm?.description) ? (
                <SanityBlockContent text={contactForm?.description} />
              ) : (
                contactForm?.description
              )}
            </P>
          </Box>
        )}
      </Box>

      <Grid
        mt={4}
        templateColumns={{
          base: 'repeat(auto-fit, minmax(200px, 1fr))',
          xl: 'repeat(2, minmax(200px, 1fr))',
        }}
        gap={2.5}
      >
        <GridItem>
          <Input
            {...INPUT_PROPS}
            {...form.name}
            placeholder={contactForm?.namePlaceholder}
          />
        </GridItem>
        <GridItem>
          <Input
            {...INPUT_PROPS}
            {...form.email}
            placeholder={contactForm?.emailPlaceholder}
          />
        </GridItem>
        <GridItem>
          <Input
            {...INPUT_PROPS}
            {...form.phone}
            placeholder={contactForm?.phoneNumberPlaceholder}
          />
        </GridItem>
        <GridItem>
          <Input
            {...INPUT_PROPS}
            {...form.subject}
            placeholder={contactForm?.subjectPlaceholder}
          />
        </GridItem>
      </Grid>
      <Textarea
        {...INPUT_PROPS}
        mt={2.5}
        {...form.message}
        placeholder={contactForm?.messagePlaceholder}
      />
      <Box>
        <Checkbox
          onChange={(e) => setCheckboxIsChecked(e.target.checked)}
          isChecked={checkboxIsChecked}
          mt={3}
          mb={3}
          colorScheme="white"
          borderColor="white"
          iconColor="white"
          alignItems="flex-start"
        >
          <P
            fontSize={fontSizes.small}
            color={colors.white}
            textAlign="left"
            mt={-0.5}
          >
            {sharedContent?.checkboxPrivacyText1}
            <Link
              passHref
              href={linkWithCurrentLocale(
                sharedContent?.checkboxPrivacyPage?.slug?.current,
              )}
            >
              <a style={{ borderBottom: '1px solid white' }}>
                {' ' + sharedContent?.checkboxPrivacyText2}
              </a>
            </Link>
            {' ' + sharedContent?.checkboxPrivacyText3}
          </P>
        </Checkbox>
      </Box>

      <Btn
        aria-label="Contact form submit button"
        disabled={!checkboxIsChecked}
        onClick={form.submit}
        px={3}
        mt={4}
        variant="outlineWhite"
      >
        <FlexRow alignItems="center" justifyContent="center">
          {contactForm?.buttonText}
          <Box ml={2}>
            <icons.LinkArrow color={colors.white} />
          </Box>
        </FlexRow>
      </Btn>
      <Box mt={2}>
        {form.isSuccess && (
          <P fontWeight={fontWeights.bold} color={colors.white}>
            {contactForm?.successMessage}
          </P>
        )}
        {form.isError && (
          <P fontWeight={fontWeights.bold} color={colors.white}>
            {contactForm?.errorMessage}
          </P>
        )}
      </Box>
    </Box>
  );
};
