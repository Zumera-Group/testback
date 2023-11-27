import QuestionTitle from 'components/Calculator/QuestionTitle/QuestionTitle';
import React from 'react';

interface Props {
  title: string;
  description?: string;
  toolTipPromptText?: string;
}

export const QuestionText: React.FC<Props> = ({
  title,
  description,
  toolTipPromptText,
  children,
}): JSX.Element => {
  return (
    <>
      <QuestionTitle
        title={title}
        description={description}
        toolTipPromptText={toolTipPromptText}
      />
      {children}
    </>
  );
};
