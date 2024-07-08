import React from 'react';
import styles from './QuestionTitle.module.scss';


interface Props {
  title?: string;
  description?: string;
  toolTipPromptText?: string;
}

export const QuestionTitle: React.FC<Props> = ({
  title,
  description,
}) => {
  return (
    <div className={styles.questionTitleWrapper}>
      <h3 className={styles.title}>{title}</h3>
      <p>
        {description}
      </p>
    </div>
  );
};

