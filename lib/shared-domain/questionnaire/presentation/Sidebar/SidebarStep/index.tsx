import { Category, Question } from 'lib/shared-domain/questionnaire/domain';
import { useValuationStore } from 'lib/shared-domain/questionnaire/store';
import React, { useEffect, useState } from 'react';

import styles from './SidebarStep.module.scss';

interface Props {
  category: Category;
  categoryIndex: number;
  prevCategory: Category;
  currentQuestion: Question;
}

export const SidebarStep = ({
  category,
  categoryIndex,
  prevCategory,
  currentQuestion,
}: Props): JSX.Element => {
  const { mainStep, subStep } = useValuationStore();

  const isActive = mainStep === categoryIndex;
  const [isOpen, setIsOpen] = useState(isActive);

  useEffect(() => {
    if (isActive && !isOpen) setIsOpen(true);

    if (!isActive && isOpen) setIsOpen(false);
  }, [isActive, isOpen, mainStep]);

  const isCurrentOrPrevCategory = categoryIndex <= mainStep;
  const isLastQuestionFromPrevCategory = !prevCategory?.questions[subStep + 1];
  const isNextCategory = categoryIndex === mainStep + 1;

  const isClickable =
    isCurrentOrPrevCategory ||
    (isLastQuestionFromPrevCategory && isNextCategory);

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
            <span className={activeItem}>{`${categoryIndex + 1}.`}</span>
          )}
        </p>

        <p className={[styles.stepItemName, activeItem].join(' ')}>
          {category.categoryName}
        </p>
      </div>
    </div>
  );
};
