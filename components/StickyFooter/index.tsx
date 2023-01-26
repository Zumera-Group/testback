import { StickyFooterModule } from 'lib/shared-domain/page/domain/contentModule';
import styles from './StickyFooter.module.scss';
import { Container, Grid } from 'components/Layout';
import { Button } from 'components/Button';
import { useEffect, useState } from 'react';
export const StickyFooter: React.FC<{
  specificContentModule: StickyFooterModule;
}> = ({ specificContentModule }) => {
  const { button } = specificContentModule;
  const [isScrolled, setIsScrolled] = useState(false);
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
    const qLink = `/questionnaires/${button?.questionnaire?.questionnaireSlug?.current}`;
    return button?.questionnaire?.questionnaireSlug ? (
      <Button {...button} onDark={true} link={{ slug: { current: qLink } }}>
        {button?.title}
      </Button>
    ) : (
      <Button {...button} onDark={true}>
        {button.title}
      </Button>
    );
  };

  return (
    <div className={[styles.wrapper, isScrolled ? styles.show : ''].join(' ')}>
      <Container>
        <Grid
          fullWidth={true}
          justifyContent={'flex-end'}
          alignItems={'center'}
        >
          <ButtonComp />
        </Grid>
      </Container>
    </div>
  );
};
