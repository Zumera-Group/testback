import { H } from 'components/Typography/H';
import { Box } from 'components/Layout/Flex/Flex';
import { SanityBlockContent } from 'components/SanityBlockContent';
import { P } from 'components/Typography/P';
import React from 'react';
import { colors } from 'styles/foundations/colors';
import { fontSizes } from '../../../../../styles/foundations/fontStyles';

export const TitleWithSubtitleAndDescription: React.FC<{
  title?: string;
  subtitle?: string;
  description?: any[] | string;
  color?: {
    subtitle?: string;
    title?: string;
    description?: string;
  };
  fontSizeDescription?: string;
  headingType?: 'h1' | 'h2' | 'h3';
}> = ({
  title,
  subtitle,
  description,
  color,
  fontSizeDescription,
  headingType,
}) => {
  return (
    <Box>
      <Box>
        {subtitle && (
          <P
            fontSize={fontSizes.h1_2}
            color={color?.subtitle || colors.text.light}
            mb={1.5}
          >
            {subtitle}
          </P>
        )}
        {title && (
          <>
            <H
              className="titleWithSubtitleAndDescriptionHeading"
              color={color?.title}
              as={headingType || 'h2'}
              mb={4}
            >
              {title}
            </H>
          </>
        )}
      </Box>
      {description && (
        <Box>
          <P
            whiteSpace="pre-wrap"
            color={color?.description || colors.text.light}
            fontSize={fontSizeDescription || fontSizes.h3}
            style={{ hyphens: 'manual', maxWidth: '100%' }}
          >
            {Array.isArray(description) ? (
              <SanityBlockContent text={description} />
            ) : (
              description
            )}
          </P>
        </Box>
      )}
    </Box>
  );
};
