import { SanityBlockContent } from 'components/SanityBlockContent';
import React from 'react';

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
}> = ({ title, subtitle, description, color }) => {
  return (
    <div>
      <div>
        {subtitle && <p color={color?.subtitle || 'white'}>{subtitle}</p>}
        {title && (
          <>
            <h2
              className="titleWithSubtitleAndDescriptionHeading"
              color={color?.title}
            >
              {title}
            </h2>
          </>
        )}
      </div>
      {description && (
        <div>
          <p
            color={color?.description || 'white'}
            style={{ hyphens: 'manual', maxWidth: '100%' }}
          >
            {Array.isArray(description) ? (
              <SanityBlockContent text={description} />
            ) : (
              description
            )}
          </p>
        </div>
      )}
    </div>
  );
};
