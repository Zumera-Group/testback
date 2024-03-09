import { useMediaQuery } from 'lib/hooks/useMediaQuery';
import { SCREEN_SIZE_MD } from 'lib/constants';
import { ProgressBar } from 'components/Calculator/ProgressBar';
import styles from 'lib/shared-domain/questionnaire/presentation/Sidebar/SideBar.module.scss';
import { TaxCalculatorQuestionnaire } from 'lib/shared-domain/tax-calculator/types';
import { TaxCalculatorSideBarStep } from 'lib/shared-domain/tax-calculator/components/TaxCalculatorSideBarStep';

const TaxCalculatorSideBar = ({ questionsByCategory, isOnResultsScreen, progress }: {
  questionsByCategory: TaxCalculatorQuestionnaire['questionsByCategory'],
  isOnResultsScreen: boolean,
  progress: number,
}): JSX.Element => {
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);

  if (isOnResultsScreen) {
    return null;
  }

  return (
    <>
      <ProgressBar progress={progress} isPercent color="white" />
      {!isMobile && (
        <div className={styles.categoriesWrapper}>
          {questionsByCategory.map((category, index, array) => {
            return <TaxCalculatorSideBarStep
              key={index}
              category={category}
              currentCategoryIndex={index}
              prevCategory={array[index - 1]}
            />;
          })}
        </div>
      )}
    </>
  );
};

export default TaxCalculatorSideBar;
