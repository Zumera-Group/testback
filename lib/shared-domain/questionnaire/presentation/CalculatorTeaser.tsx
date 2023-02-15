// import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
// import { colors } from 'styles/foundations/colors';
import { TextBoxGroup } from './TextBoxGroup';
import { useRouter } from 'next/router';
import styles from './CalculatorTeaser.module.scss';
import { HalfBeam } from 'components/HalfBeam';
import { Button } from 'components/Button';

export const ResultTeaser: React.FC<{
  calculatorSteps: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
  isSectorSpecificEntry?: boolean;
}> = ({ calculatorSteps, isSectorSpecificEntry }) => {
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
  const router = useRouter();
  const page = router.locale === 'en' ? 'questionnaires' : 'fragenkatalog';
  if (!questionnaireSlug) return null;

  return (
    <div>
      {/*<TitleWithSubtitleAndDescription*/}
      {/*  color={{ description: colors.text.light }}*/}
      {/*  title={title}*/}
      {/*  description={description}*/}
      {/*/>*/}
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
