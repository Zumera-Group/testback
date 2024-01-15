import styles from './RadioButtonItem.module.scss';

interface Props {
  icon: JSX.Element;
  label: any;
  onClick: () => void;
  selected: boolean;
}

const RadioButton: React.FC<Props> = ({ icon, label, onClick, selected }) => {
  return (
    <>
      <div
        aria-label={"Radio Button"}
        id={"radioButton"}
        className={[
          styles.radioButtonWrapper,
          selected ? styles.active : '',
        ].join(' ')}
        onClick={onClick}
      >
        <div className={styles.icon}>{icon}</div>
        <span className={styles.label}> {label}</span>
        <span
          className={[styles.button, selected ? styles.active : ''].join(' ')}
        />
      </div>
    </>
  );
};

export default RadioButton;
