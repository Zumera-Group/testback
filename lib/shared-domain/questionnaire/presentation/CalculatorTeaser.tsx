import result_teaserReact from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useBreakpointValue, VStack, Flex, Hide, Show } from '@chakra-ui/react';
import { Btn } from 'components/Buttons/Button';
import { Box, FlexRow } from 'components/Layout/Flex/Flex';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { P } from 'components/Typography/P';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import { colors } from 'styles/foundations/colors';
import { TextBoxGroup } from './TextBoxGroup';

import resultTeaser from '../../../../public/contentModules/calculatorTeaserSection/result_teaser.svg';
import { FlexCol } from '../../../../components/Layout/Flex/Flex';
import { useRouter } from 'next/router';
import { Beam } from 'components/Beam';
import styles from './CalculatorTeaser.module.scss';
import { HalfBeam } from 'components/HalfBeam';
import { Button } from 'components/Button';

const LineSpacerMobile = () => {
  return (
    <Box
      position="relative"
      h={1}
      w={6}
      borderBottom={`1px solid ${colors.text.light}`}
    ></Box>
  );
};

// const TeaserBoxDesktop: React.FC<{}> = ({ children }) => {
//   const BOX_SPACE_HEIGHT = '25%';
//   return (
//     <FlexRow h={BOX_SPACE_HEIGHT}>
//       <Flex align="center" justify="center">
//         {children}
//       </Flex>
//     </FlexRow>
//   );
// };

export const ResultTeaser: React.FC<{
  calculatorSteps: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
  isSectorSpecificEntry?: boolean;
}> = ({ calculatorSteps, isSectorSpecificEntry }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const isMobileOrisSectorSpecificEntry = isMobile || isSectorSpecificEntry;

  return (
    <div className={styles.calculatorTeaserWrapper}>
      <HalfBeam />
      <div>
        <p className={styles.calculatorSteps}>
          <span className={styles.dash}>&mdash;</span>
          {calculatorSteps?.step4}
        </p>

        <p className={styles.calculatorSteps}>
          <span className={styles.dash}>&mdash;</span>
          {calculatorSteps?.step3}
        </p>

        <p className={styles.calculatorSteps}>
          <span className={styles.dash}>&mdash;</span>
          {calculatorSteps?.step2}
        </p>

        <p className={styles.calculatorSteps}>
          <span className={styles.dash}>&mdash;</span>
          {calculatorSteps?.step1}
        </p>
      </div>
    </div>
  );
};

export const CalculatorTeaser: React.FC<{
  title: string;
  description: any[] | string;
  buttonText: string;
  checkmarkTexts: string[];
  calculatorSteps: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
  questionnaireSlug?: string;
}> = ({
  title,
  description,
  checkmarkTexts,
  questionnaireSlug,
  buttonText,
  calculatorSteps,
}) => {
  const CIRCLE_BORDER = `1px solid ${colors.primary.darkGreen}`;
  const MARGIN_TOP = 6.5;
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const router = useRouter();
  const page = router.locale === 'en' ? 'questionnaires' : 'fragenkatalog';
  if (!questionnaireSlug) return null;

  return (
    <div>
      <TitleWithSubtitleAndDescription
        color={{ description: colors.text.light }}
        title={title}
        description={description}
      />
      <div>
        <div>
          {checkmarkTexts?.map((c, index) => (
            <TextBoxGroup key={index} text={c} />
          ))}
        </div>
        <div>
          <Button
            variant={'primary'}
            link={`/${page}/${questionnaireSlug}`}
            aria-label="Go to questionnaire button"
          >
            {buttonText}
          </Button>
        </div>

        <div>
          <ResultTeaser calculatorSteps={calculatorSteps} />
        </div>
      </div>
      <div>
        <ResultTeaser calculatorSteps={calculatorSteps} />
      </div>
    </div>
  );
};
