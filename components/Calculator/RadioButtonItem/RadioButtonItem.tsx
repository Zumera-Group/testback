import styles from './RadioButtonItem.module.scss';
import { SanityBlockContent } from 'components/SanityBlockContent';

interface Props {
  icon: JSX.Element;
  label: any;
  onClick: () => void;
  selected: boolean;
  extraInfo?: unknown[];
}

const RadioButton: React.FC<Props> = ({ icon, label, onClick, selected, extraInfo }) => {
  return (
    <div
      className={[
        styles.radioButtonWrapper,
        styles.flexWrapper,
        selected ? styles.active : '',
      ].join(' ')}
      onClick={onClick}
    >
      <div className={styles.flexCol}>
        <div className={styles.icon}>{icon}</div>

        {!!label && Array.isArray(label) ? <SanityBlockContent text={label} /> :
          <span className={styles.label}> {label}</span>}

        <span
          className={[styles.button, selected ? styles.active : ''].join(' ')}
        />
      </div>
      {
        !!extraInfo &&
        <SanityBlockContent className={styles.extraInfo} text={extraInfo} />
      }
    </div>
  );
};

export default RadioButton;
