import Image from 'next/image';
import styles from './SecretKeyLockScreen.module.scss';
import { useEffect, useState } from 'react';
export const SecretKeyLockScreen = ({ siteSettings }) => {
  const [clicksCount, setClicksCount] = useState(0);
  useEffect(() => {
    if (clicksCount >= 12) {
      localStorage.setItem('secretKeyOpen', '1');
      window.location.reload();
    }
  }, [clicksCount]);
  return (
    <div className={styles.screen}>
      <div className={styles.logoWrapper}>
        <Image
          unoptimized
          priority
          loading="eager"
          width={200}
          height={1200}
          alt={`logo`}
          src={siteSettings?.logo?.asset?.url}
          onClick={() => setClicksCount(clicksCount + 1)}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className={styles.comingSoon}>Coming soon</div>
    </div>
  );
};
