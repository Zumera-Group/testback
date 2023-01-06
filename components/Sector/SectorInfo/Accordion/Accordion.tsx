import { AccordionItem } from './AccordionItem';

import styles from './Accordion.module.scss';

export const Accordion = ({ questions, answers }) => {
  if (!Array.isArray(answers) && !answers) return null;
  return (
    <dl className={styles.accordion}>
      {answers.map((answer, index) => (
        <AccordionItem
          key={`sectorInfoAccordion-${index}`}
          question={questions[index]}
          answer={answer}
        />
      ))}
    </dl>
  );
};

export default Accordion;