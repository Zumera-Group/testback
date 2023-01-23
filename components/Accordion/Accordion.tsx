import { AccordionItem } from './AccordionItem';

import styles from './Accordion.module.scss';
import React from 'react';

export const Accordion: React.FC<{
  questions: any[];
  answers: any[];
  answerComponent?: React.FC<any>;
}> = ({ questions, answers, answerComponent }) => {
  if (!Array.isArray(answers) && !answers) return null;
  return (
    <dl className={styles.accordion}>
      {questions.map((q, index) => (
        <AccordionItem
          key={`sectorInfoAccordion-${index}`}
          question={q}
          answer={answers[q] || answers[index]}
          answerComponent={answerComponent}
        />
      ))}
    </dl>
  );
};

export default Accordion;
