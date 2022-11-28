import React from 'react';
import { SectionContainer } from '../../../../../components/Layout/SectionContainer';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';
import { Box } from '../../../../../components/Layout/Flex/Flex';
import { SanityBlockContent } from '../../../../../components/SanityBlockContent';
import { DisclaimerSectionModule } from '../../domain/contentModule';
import { P } from '../../../../../components/Typography/P';
import { fontWeights } from 'styles/foundations/fontStyles';
import { fontSizes } from '../../../../../styles/foundations/fontStyles';

export const DisclaimerSection: React.FC<{
  specificContentModule: DisclaimerSectionModule;
}> = ({ specificContentModule }) => {
  return (
    <SectionContainer pt="xs" pb="md">
      <Box w={{ base: '100%', md: '80%', lg: '50%' }}>
        <TitleWithSubtitleAndDescription title={specificContentModule.title} />
      </Box>
      {specificContentModule.textBlocks?.map((textBlock) => {
        return textBlock.description?.map((t) => {
          return (
            <Box mb={5} key={t._key} fontSize={fontSizes.h3} lineHeight="27px">
              <P
                fontWeight={fontWeights.semiBold}
                fontSize={fontSizes.h3}
                mb={4}
              >
                {textBlock.title}
              </P>
              <SanityBlockContent text={t} />
            </Box>
          );
        });
      })}
    </SectionContainer>
  );
};

export default DisclaimerSection;