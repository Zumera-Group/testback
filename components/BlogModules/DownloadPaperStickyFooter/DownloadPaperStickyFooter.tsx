import styles from 'components/BlogModules/DownloadPaperStickyFooter/DownloadPaperStickyFooter.module.scss';
import { Container } from 'components/Layout';
import { Button } from 'components/Button';
import { useEffect, useState } from 'react';
import {
  DownloadPaperStickyFooterModule,
  WhitePaperInlineFormModule
} from 'lib/shared-domain/blogArticle/domain/blogModule';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import ModalWithForm from '../WhitePaperModal/ModalWithForm';

export const DownloadPaperStickyFooter: React.FC<{
  specificContentModule: DownloadPaperStickyFooterModule;
  siteSettings?: SiteSettings;
  whitePaperInline?: WhitePaperInlineFormModule;
}> = ({ specificContentModule, siteSettings , whitePaperInline}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { button } = specificContentModule;

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

  if (!button?.title || !whitePaperInline) {
    return null;
  }

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

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
          <Button callBack={openModal} onDark={true} variant={button.variant}>
            {button?.title}
          </Button>
        </div>
        <ModalWithForm
          isOpen={isOpen}
          onClose={closeModal}
          whitePaperInline={whitePaperInline}
          siteSettings={siteSettings}
          ariaAppSelector={'#sticky-footer'}
        />
      </Container>
    </div>
  );
};
