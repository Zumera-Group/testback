import React, { ReactElement, useState } from 'react';

import { Icon } from 'components/Icon';

import { AnimatePresence, motion } from 'framer-motion';

import { animationProps } from './animationProps';

import styles from './AccordionItem.module.scss';
import { SanityBlockContent } from 'components/SanityBlockContent';

export const AccordionItem: React.FC<{
  question: any;
  answer: any;
  answerComponent?: React.FC<any>;
}> = ({ question, answer, answerComponent }) => {
  const [itemOpen, setItemOpen] = useState(false);
  const AnswerComponent = answerComponent;
  const getAnswer = (answer) =>
    Array.isArray(answer) ? <SanityBlockContent text={answer} /> : answer;
  return (
    <AnimatePresence>
      <dt
        className={[
          styles.question,
          itemOpen ? styles.question__open : '',
        ].join(' ')}
      >
        <button
          type="button"
          className={styles.toggleBtn}
          onClick={() => setItemOpen(!itemOpen)}
          aria-expanded={itemOpen ? 'true' : 'false'}
        >
          <span>{question}</span>
          <Icon
            iconName={!itemOpen ? 'plus-circle' : 'minus-circle'}
            viewBox={'0 0 32 32'}
            width={24}
            height={24}
          />
        </button>
      </dt>
      {itemOpen && (
        <motion.dd
          {...animationProps}
          key={answer}
          className={[styles.answer, itemOpen ? styles.answer__open : ''].join(
            ' ',
          )}
        >
          <span>
            {answerComponent ? (
              <AnswerComponent answer={answer} />
            ) : (
              getAnswer(answer)
            )}
          </span>
        </motion.dd>
      )}
    </AnimatePresence>
  );
};

export default AccordionItem;
