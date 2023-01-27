import Button from 'components/Button/Button';
import { useValuationStore } from 'lib/shared-domain/questionnaire/store';
import { useState } from 'react';
import styles from './BackButton.module.scss';

interface Props {
  onPrevQuestion: () => void;
  currentPos: number;
}

const BackButton: React.FC<Props> = ({ onPrevQuestion, currentPos }) => {
  return (
    <>
      {currentPos > 1 && (
        <Button
          callBack={onPrevQuestion}
          variant="tertiary"
          hideIcon
          classes={styles.backButton}
          onDark
        >
          Back
        </Button>
      )}
    </>
  );
};

export default BackButton;
