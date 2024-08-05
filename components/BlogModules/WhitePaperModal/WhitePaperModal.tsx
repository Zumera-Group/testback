import styles from './WhitePaper.module.scss';

import { Button } from 'components/Button';
import { useState } from 'react';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { WhitePaperInlineFormModule } from '../../../lib/shared-domain/blogArticle/domain/blogModule';
import ModalWithForm from './ModalWithForm';

const WhitePaperModal: React.FC<{
  siteSettings: SiteSettings;
  whitePaperInline: WhitePaperInlineFormModule;
}> = ({ siteSettings, whitePaperInline }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className={[styles.modalWrapper].join(' ')} id="modalWrapper">
      <Button
        variant={'download'}
        link={'#'}
        onDark={false}
        classes={styles.downloadBtn}
        callBack={openModal}
      >
        {whitePaperInline.whitePaperFormFields?.buttonText}
      </Button>
      <ModalWithForm
        isOpen={isOpen}
        onClose={closeModal}
        whitePaperInline={whitePaperInline}
        siteSettings={siteSettings}
        ariaAppSelector={'#modalWrapper'}
      />
    </div>
  );
};

export default WhitePaperModal;
