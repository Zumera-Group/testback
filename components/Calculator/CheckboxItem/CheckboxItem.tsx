import styles from './CheckboxItem.module.scss';
interface Props {
  icon: JSX.Element;
  label: any;
  onClick: () => void;
  selected: boolean;
}

const Checkbox: React.FC<Props> = ({ icon, label, onClick, selected }) => {
  return (
    <>
      <div
        aria-label={'Checkbox'}
        className={[styles.checkboxWrapper, selected ? styles.active : ''].join(
          ' ',
        )}
        onClick={onClick}
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        <span className={styles.label}> {label}</span>
        <span
          className={[styles.button, selected ? styles.active : ''].join(' ')}
        ></span>
      </div>
    </>
  );
};

export default Checkbox;
