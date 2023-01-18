import React from 'react';

import { Box, FlexRow } from 'components/Layout/Flex/Flex';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { getTranslateByScope } from 'translation/i18n';
import { HEADER_HEIGHT } from '../../page/constants';

import { TitleWithSubtitleAndDescription } from '../../page/presentation/components/TitleWithSubtitleAndDescription';
import { colors } from 'styles/foundations/colors';
import { P } from 'components/Typography/P';
import { SimpleGrid } from '@chakra-ui/react';
import { Employee } from '../domain/index';
import { LinkWithArrow } from '../../page/presentation/components/LinkWithArrow';
import { icons } from 'components/Icons';
import { fontSizes, fontWeights } from 'styles/foundations/fontStyles';

const t = getTranslateByScope('website.employeeDetails.background');

export const EmployeeBackground: React.FC<{
  employee: Employee;
  content: any;
}> = ({ employee, content }) => {

  return (
    <SectionContainer py="md">
      <Box mt={HEADER_HEIGHT}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
          <Box>
            <TitleWithSubtitleAndDescription
              title={content?.title}
              subtitle={content?.subtitle}
              description={employee.description}
            />
          </Box>
          <Box mt={{ base: 0, md: 16 }}>
            {employee.facts?.map((f, index) => (
              <FlexRow mb={3} key={index}>
                <Box mt={0.2}>
                  <icons.TransactionX
                    size="14px"
                    strokeW="20px"
                    color={colors.black}
                  />
                </Box>
                <P ml={2}>{f}</P>
              </FlexRow>
            ))}
            {employee.linkedInUrl && (
              <Box mt={8}>
                <a target="_blank" href={employee.linkedInUrl} rel="noreferrer">
                  <FlexRow
                    cursor="pointer"
                    display="inline-flex"
                    alignItems="center"
                    borderBottomStyle="solid"
                    borderBottomColor={colors.black}
                    borderBottomWidth="1px"
                    pb={1}
                    transition=".2s ease-in all"
                    _hover={{
                      transform: 'translateY(-2px)',
                    }}
                  >
                    <P
                      noOfLines={1}
                      pr={1.5}
                      fontWeight={fontWeights.semiBold}
                      fontSize={fontSizes.small}
                      color={colors.black}
                      textTransform="capitalize"
                    >
                      {content?.viewLinkedText}
                    </P>
                    <icons.LinkArrow color={colors.black} />
                  </FlexRow>
                </a>
              </Box>
            )}
          </Box>
        </SimpleGrid>
      </Box>
    </SectionContainer>
  );
};
