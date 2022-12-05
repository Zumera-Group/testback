import { H } from 'components/Typography/H';

import React from 'react';
import { colors } from 'styles/foundations/colors';
import { Box } from '../../../../../components/Layout/Flex/Flex';
import { CenteredTitleWithSubtitleSectionModule } from '../../domain/contentModule';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';

export const CenteredTitleWithSubtitleSection: React.FC<{
  specificContentModule: CenteredTitleWithSubtitleSectionModule;
}> = ({ specificContentModule }) => {
  return (
    <Box pt={{ base: 6, md: 12 }} px={{ base: 3, md: 6 }}>
      <Box textAlign="center" maxWidth="700px" mx="auto">
        <Box mb={4}>
          <Box display="contents">
            {specificContentModule.title.map((t, index) => (
              <Box display="contents" key={index}>
                <H
                  display="contents"
                  className="titleWithSubtitleAndDescriptionHeading"
                  color={t.color}
                  as="h2"
                >
                  {t.text}
                </H>
              </Box>
            ))}
          </Box>
        </Box>
        <TitleWithSubtitleAndDescription
          color={{ title: colors.primary.darkestGreen }}
          {...specificContentModule}
          title={null}
        />
      </Box>
    </Box>
  );
};

export default CenteredTitleWithSubtitleSection;
