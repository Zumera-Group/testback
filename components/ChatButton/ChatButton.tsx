import { Icon } from 'components/Icon';

import { useIntercom } from 'react-use-intercom';

import styles from './ChatButton.module.scss';

export const ChatButton = (): JSX.Element => {
  const { show } = useIntercom();

  return (
    <button
      className={styles.chatButton}
      onClick={show}
    >
      <Icon
        iconName={'user'}
        viewBox={'0 0 16 16'}
        width={16}
        height={16}
      />
    </button>
  );
};

export default ChatButton;