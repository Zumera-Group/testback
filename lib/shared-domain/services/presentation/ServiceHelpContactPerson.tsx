import { Box, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import { FlexCol } from 'components/Layout/Flex/Flex';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { P } from 'components/Typography/P';
import { getEmployeeFullName } from 'lib/shared-domain/employees/domain/getEmployeeFullName';
import { ServiceHelpContactSection } from 'lib/shared-domain/page/domain';
import { LinkWithArrow } from 'lib/shared-domain/page/presentation/components/LinkWithArrow';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import { TextBoxGroup } from 'lib/shared-domain/questionnaire/presentation/TextBoxGroup';
import { colors } from 'styles/foundations/colors';
import { fonts, fontSizes, fontWeights } from 'styles/foundations/fontStyles';
import backgroundImage2 from '../../../../public/serviceDetail/hero-bg-2.png';

export const ServiceHelpContactPersonSection: React.FC<{
  helpContactPerson: ServiceHelpContactSection | any;
}> = ({ helpContactPerson }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <FlexCol
      width="100%"
      justifyContent="center"
      backgroundImage={`url(${backgroundImage2.src})`}
      backgroundPosition="center top"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundAttachment={!isMobile && 'fixed'}
    >
      <SectionContainer py="md">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box>
            <TitleWithSubtitleAndDescription
              color={{
                title: colors.white,
                subtitle: colors.white,
                description: colors.duckEgg,
              }}
              description={helpContactPerson.description}
              title={helpContactPerson.title}
              subtitle={helpContactPerson.subtitle}
            />
            {helpContactPerson.checkmarkTexts &&
              helpContactPerson.checkmarkTexts.length > 0 && (
                <Box mt={6}>
                  {helpContactPerson.checkmarkTexts.map((c, index) => (
                    <Box key={index} mt={3.5}>
                      <TextBoxGroup
                        text={c}
                        size={8}
                        color={{
                          circleBgColor: colors.primary.darkGreen,
                          tickColor: colors.white,
                          textColor: colors.duckEgg,
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              )}
          </Box>
          <FlexCol justifyContent="center">
            {helpContactPerson.employee && (
              <Box
                justifyContent="space-between"
                backgroundColor={colors.white}
                px={6}
                py={5}
              >
                <P
                  textTransform="uppercase"
                  fontWeight={fontWeights.bold}
                  fontSize={fontSizes.small}
                  color={colors.primary.darkGreen}
                >
                  {helpContactPerson.cardTitle}
                </P>
                <P
                  fontFamily={fonts.condor}
                  fontWeight={fontWeights.bold}
                  fontSize={fontSizes.websiteServicesEmployeeH}
                  color={colors.primary.darkGreen}
                >
                  {getEmployeeFullName(helpContactPerson.employee)}
                </P>
                <P mb={4} color={colors.primary.darkGreen}>
                  {helpContactPerson.employee.jobTitle}
                </P>
                {helpContactPerson.appointmentLinkUrl &&
                  helpContactPerson.linkText && (
                    <LinkWithArrow
                      color={colors.primary.darkGreen}
                      title={helpContactPerson.linkText}
                      href={helpContactPerson.appointmentLinkUrl}
                    />
                  )}
              </Box>
            )}
          </FlexCol>
        </SimpleGrid>
      </SectionContainer>
    </FlexCol>
  );
};
