import React, { useEffect, useState } from 'react';
import styles from 'lib/shared-domain/questionnaire/presentation/Sidebar/SidebarStep/SidebarStep.module.scss';
import { Category } from 'lib/shared-domain/questionnaire/domain';
import { useSearchParams } from 'next/navigation';

interface Props {
  category: Category;
  prevCategory: Category;
  currentCategoryIndex: number;
}

export const TaxCalculatorSideBarStep = ({
  category,
  prevCategory,
  currentCategoryIndex,
}: Props): JSX.Element => {
  const searchParams = useSearchParams();
  const programCategoryIndex = Number(searchParams.get('category') ?? 1) - 1;
  const programStepIndex = Number(searchParams.get('step') ?? 1) - 1;

  const isActive = programCategoryIndex === currentCategoryIndex;
  const [isOpen, setIsOpen] = useState(isActive);

  useEffect(() => {
    if (isActive && !isOpen) setIsOpen(true);

    if (!isActive && isOpen) setIsOpen(false);
  }, [isActive, isOpen, programCategoryIndex]);

  const isCurrentOrPrevCategory = programCategoryIndex <= programCategoryIndex;
  const isLastQuestionFromPrevCategory = !prevCategory?.questions[programStepIndex + 1];
  const isNextCategory = currentCategoryIndex >= programCategoryIndex + 1;

  const isClickable = isCurrentOrPrevCategory || (isLastQuestionFromPrevCategory && isNextCategory);
  const activeItem = isActive ? styles.active : styles.inactive;

  const Tick = () => {
    return (
      <svg
        viewBox="0 0 10 8"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 1L3.5 6.5L1 4"
          stroke="#F0005C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    );
  };

  return (
    <div className={styles.sideBarWrapper}>
      <div className={[styles.stepItem].join(' ')}>
        <p className={styles.stepItemIndex}>
          {isClickable && !isActive && !isNextCategory ? (
            <span className={styles.tick}>
              <Tick />
            </span>
          ) : (
            <span className={activeItem}>{`${currentCategoryIndex + 1}.`}</span>
          )}
        </p>

        <p className={[styles.stepItemName, activeItem].join(' ')}>
          {category.categoryName}
        </p>
      </div>
    </div>
  );
};
