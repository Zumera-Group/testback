import { Icon } from 'components/Icon';

import styles from './Close.module.scss';

interface Props {
  mobile?: boolean;
  callBack: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Close: React.FC<Props> = ({ mobile, callBack }) => {
  return (
    <button
      className={[styles.close, mobile ? styles.close__mobile : styles.close__desktop].join(' ')}
      onClick={callBack}
      title={'Close Navigation'}
      aria-label={'Close Navigation'}
    >
      <Icon
        iconName="cross"
        viewBox="0 0 24 21"
        width={24}
        height={21}
      />
    </button>
  );
};

export default Close;