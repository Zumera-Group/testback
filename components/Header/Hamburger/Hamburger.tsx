import { Icon } from 'components/Icon';

import styles from './Hamburger.module.scss';

interface Props {
  callBack: (event: React.MouseEvent<HTMLButtonElement>) => void;
  bigMenuOpen: boolean;
}

export const Hamburger: React.FC<Props> = ({ callBack, bigMenuOpen }) => {
  return (
    <button
      className={styles.hamburger}
      onClick={callBack}
      title={'Toggle Navigation'}
      aria-label={'Toggle Navigation'}>
      <Icon
        iconName="hamburger"
        viewBox="0 0 26 20"
        width={26}
        height={20}
      />
    </button>
  );
};

export default Hamburger;