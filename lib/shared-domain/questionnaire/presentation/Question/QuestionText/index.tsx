import QuestionTitle from 'components/Calculator/QuestionTitle/QuestionTitle';
import React from 'react';

interface Props {
  title: string;
  description?: string;
  toolTipPromptText?: string;
  hideCategory?: boolean
}

export const QuestionText: React.FC<Props> = ({
  title,
  description,
  toolTipPromptText,
  children,
  hideCategory = false
}): JSX.Element => {
  return (
    <>
      <QuestionTitle
        title={title}
        description={description}
        toolTipPromptText={toolTipPromptText}
        hideCategory={hideCategory}
      />
      {children}
    </>
  );
};
