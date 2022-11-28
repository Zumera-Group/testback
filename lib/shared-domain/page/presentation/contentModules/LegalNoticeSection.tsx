import React from 'react';
import { SectionContainer } from '../../../../../components/Layout/SectionContainer';
import { LegalNoticeSectionModule } from '../../domain/contentModule';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';
import { Box } from '../../../../../components/Layout/Flex/Flex';
import { SanityBlockContent } from '../../../../../components/SanityBlockContent';

export const LegalNoticeSection: React.FC<{
  specificContentModule: LegalNoticeSectionModule;
}> = ({ specificContentModule }) => {
  return (
    <SectionContainer pt="md" pb="xs">
      <Box
        w="100%"
        pb={4}
        borderBottom={
          specificContentModule.hasBorderBottom && '1px solid #D2D2D2'
        }
      >
        <Box w={{ base: '100%', md: '80%', lg: '50%' }}>
          <TitleWithSubtitleAndDescription
            title={specificContentModule.title}
            subtitle={specificContentModule.subtitle}
          />
        </Box>
        {specificContentModule.textBlocks?.map((textBlock) => {
          return textBlock.description?.map((t) => {
            return (
              <Box mb={5} key={t._key}>
                <SanityBlockContent text={t} />
              </Box>
            );
          });
        })}
      </Box>
    </SectionContainer>
  );
};

export default LegalNoticeSection;