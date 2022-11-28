import React from 'react';
import { LandingPageTrackRecordModule } from '../../../page/domain/contentModule';
import { TitleWithSubtitleAndDescription } from '../../../page/presentation/components/TitleWithSubtitleAndDescription';
import { TransactionCarousel } from '../../../transactions/presentation/components/TransactionCarousel';
import { FlexCol } from '../../../../../components/Layout/Flex/Flex';
import { Button } from '@chakra-ui/react';
import styles from '../../../partners/presentation/components/PartnersStrategic.module.css';
import { useRouter } from 'next/router';
import { SectionContainer } from 'components/Layout/SectionContainer';

export const LandingPageTrackRecord: React.FC<{
  specificContentModule: LandingPageTrackRecordModule;
}> = ({ specificContentModule }) => {
  const router = useRouter();
  const page = router.locale === 'en' ? 'questionnaires' : 'fragenkatalog';
  const url =
    '/' +
    router.locale +
    '/' +
    page +
    '/' +
    specificContentModule?.buttonTarget?.questionnaireSlug?.current;

  return (
    <SectionContainer pt="md">
      <FlexCol textAlign="center">
        <TitleWithSubtitleAndDescription
          description={specificContentModule.description}
          title={specificContentModule.title}
        />
      </FlexCol>
      <FlexCol>
        <TransactionCarousel
          linkText=""
          mt={3}
          transactions={specificContentModule.transactions}
        />
      </FlexCol>
      <FlexCol alignItems="center">
        <Button
          mt={3}
          variant="solid"
          className={styles.button}
          href={url}
          as="a"
        >
          {specificContentModule.buttonText}
        </Button>
      </FlexCol>
    </SectionContainer>
  );
};
