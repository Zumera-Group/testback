import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import { TextBoxGroup } from './TextBoxGroup';
import router, { useRouter } from 'next/router';
import styles from './CalculatorTeaser.module.scss';
import { HalfBeam } from 'components/HalfBeam';
import { Button } from 'components/Button';
import { allLinks } from 'lib/links';

export const ResultTeaser: React.FC<{
  calculatorSteps: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
  isSectorSpecificEntry?: boolean;
}> = ({ calculatorSteps, isSectorSpecificEntry }) => {
  const enSteps = {
    step1: 'General Information',
    step2: 'Company specifics',
    step3: 'Sector Specifics',
    step4: 'Zumera Evaluation',
  };

  const frSteps = {
    step1: 'Informations générales',
    step2: 'Spécificités de l\'entreprise',
    step3: 'Spécificités du secteur',
    step4: 'Évaluation Zumera',
  };

  const deSteps = {
    step1: 'Allgemeine Informationen',
    step2: 'Spezifische Angaben zum Unternehmen',
    step3: 'Besonderheiten des Sektors',
    step4: 'Zumera Bewertung',
  };

  const _steps = {
    de: deSteps,
    fr: frSteps,
    en: enSteps,
  }

  const steps = _steps[router.locale];

  return (
    <div className={styles.calculatorTeaserWrapper}>
      <HalfBeam />
      <div>
        <p className={styles.calculatorSteps}>
          <span className={styles.dash}>&mdash;</span>
          {steps?.step4}
        </p>

        <p className={styles.calculatorSteps}>
          <span className={styles.dash}>&mdash;</span>
          {steps?.step3}
        </p>

        <p className={styles.calculatorSteps}>
          <span className={styles.dash}>&mdash;</span>
          {steps?.step2}
        </p>

        <p className={styles.calculatorSteps}>
          <span className={styles.dash}>&mdash;</span>
          {steps?.step1}
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
  const page = allLinks.questionnaires[router.locale];

  if (!questionnaireSlug) return null;

  return (
    <div>
      <TitleWithSubtitleAndDescription
        color={{ description: 'white' }}
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
