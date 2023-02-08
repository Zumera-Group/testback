import Button from 'components/Button/Button';
import { getTranslateByScope } from 'translation/i18n';
import styles from './BackButton.module.scss';

const t = getTranslateByScope('question');

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
          {t('backBtn')}
        </Button>
      )}
    </>
  );
};

export default BackButton;
