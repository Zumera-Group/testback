import styles from './RadioButtonItem.module.scss';
import { SCREEN_SIZE_MD } from 'lib/constants';
import { useMediaQuery } from 'lib/hooks/useMediaQuery';

interface Props {
  icon: JSX.Element;
  label: any;
  onClick: () => void;
  selected: boolean;
}

const RadioButton: React.FC<Props> = ({ icon, label, onClick, selected }) => {
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);
  return (
    <>
      {/* {!isMobile ? ( */}
      <div
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
        ></span>
      </div>
      {/* // ) : ( */}
      {/* <div
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
        ></span>
      </div> */}
      {/* // )} */}
    </>
  );
};

export default RadioButton;
