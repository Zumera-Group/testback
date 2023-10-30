import { StickyFooterModule } from 'lib/shared-domain/page/domain/contentModule';
import styles from './StickyFooter.module.scss';
import { Container } from 'components/Layout';
import { Button } from 'components/Button';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { getLinksByPageType } from 'lib/utils/getLinksByPageType';

export const StickyFooter: React.FC<{
  specificContentModule: StickyFooterModule;
}> = ({ specificContentModule }) => {
  const { button } = specificContentModule;
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const url = getLinksByPageType(
    router.locale,
    'valueCalculator',
    button?.questionnaire?.questionnaireSlug?.current ||
      button?.page?.slug?.current ||
      button?.link?.slug?.current,
  );

  useEffect(() => {
    const handleScroll = () => {
      const positionY = window.pageYOffset;
      const POSITION_Y_OFFSET = 64;
      if (positionY > POSITION_Y_OFFSET) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ButtonComp = () => {
    if (!button?.title) {
      return null;
    }

    return button?.questionnaire?.questionnaireSlug ? (
      <Button {...button} onDark={true} link={{ slug: { current: url } }}>
        {button?.title}
      </Button>
    ) : (
      <Button {...button} onDark={true}>
        {button.title}
      </Button>
    );
  };

  return (
    <div
        id={'sticky-footer'}
      className={[
        styles.stickyFooter,
        isScrolled ? styles.stickyFooter__show : '',
      ].join(' ')}
    >
      <Container>
        <div className={styles.btnWrapper}>
          <ButtonComp />
        </div>
      </Container>
    </div>
  );
};
