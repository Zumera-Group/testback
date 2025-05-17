import React, { useRef, useEffect, useState } from 'react';
import { useValuationStore } from 'lib/shared-domain/questionnaire/store';
import styles from './QuestionTitle.module.scss';
import { Tooltip } from 'components/Icons/Tooltip';
import { getTranslateByScope } from 'translation/i18n';

const t = getTranslateByScope('result');

interface Props {
  title?: string;
  description?: string;
  toolTipPromptText?: string;
  hideCategory?: boolean;
}

const QuestionTitle: React.FC<Props> = ({
  title,
  description,
  toolTipPromptText,
  hideCategory = false
}) => {
  const { questionnaire, mainStep } = useValuationStore();
  const currentCategory =
    questionnaire?.questionsByCategory?.[mainStep]?.categoryName ?? '';

  const isDesc = description?.length > 1 ? true : false;

  const infoPromptRef = useRef(null);
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    if (infoPromptRef.current) {
      const text = infoPromptRef.current.textContent;
      const count = text.length;
      setCharacterCount(count);
    }
  }, []);

  return (
    <div className={styles.questionTitleWrapper}>
      {!hideCategory &&
      <span className={styles.category}>{currentCategory}</span>}

      <h3 className={styles.title}>{title}</h3>
      {isDesc && (
        <div className={styles.tooltipWrapper}>
          <span className={styles.infoPrompt} ref={infoPromptRef}>
            {toolTipPromptText
              ? toolTipPromptText
              : t('evaluation.description2')}
          </span>
          <Tooltip color="#ffffff" className={styles.tooltipIcon} />
          <div
            className={[
              styles.tooltipText,
              characterCount > 88 ? styles.tooltipText__top : '',
            ].join(' ')}
          >
            {description}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionTitle;
