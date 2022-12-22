import { Button } from 'components/Button';

import styles from './LoadMore.module.scss';

export const LoadMore = ({ callBack, text }) => {
  return (
    <div className={styles.loadMore}>
      <Button
        variant={'secondary'}
        icon={'plus'}
        callBack={callBack}>
        {text}
      </Button>
    </div>
  );
};

export default LoadMore;