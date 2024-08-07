import Modal from 'react-modal';
import localFont from '@next/font/local';
import styles from './WhitePaper.module.scss';
import {SectionHeading} from '../../SectionHeading';
import {Icon} from '../../Icon';
import {WhitePaperForm} from '../../WhitePaperDownload/WhitePaperForm';
import {WhitePaperInlineFormModule} from "../../../lib/shared-domain/blogArticle/domain/blogModule";
import {SiteSettings} from '../../../lib/shared-domain/page/domain';
import {useEffect} from 'react';

const myFont = localFont({
  display: 'swap',
  src: [
    {
      path: '../../../public/fonts/Yellix-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Yellix-Medium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Yellix-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export default function ModalWithForm({isOpen, onClose, whitePaperInline, siteSettings, ariaAppSelector}: {
  isOpen: boolean;
  onClose: () => void;
  whitePaperInline: WhitePaperInlineFormModule;
  siteSettings?: SiteSettings;
  ariaAppSelector?: string;
}) {
  useEffect(() => {
    if (ariaAppSelector && isOpen) {
      Modal.setAppElement(ariaAppSelector);
    }
  }, [ariaAppSelector, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      className={[styles.modal, myFont.className].join(' ')}
      overlayClassName={styles.overlay}
      onRequestClose={onClose}
    >
      <div>
        <div className={styles.modalHeader}>
          <SectionHeading
            title={whitePaperInline.title}
            description={whitePaperInline.subtitle}
            headingType={'h3'}
            align={'left'}
          />
          <button
            onClick={onClose}
            title={'Close'}
            aria-label={'Close'}
            className={styles.closeBtn}
          >
            <Icon iconName="cross" viewBox="0 0 24 21" width={24} height={21} />
          </button>
        </div>
        <WhitePaperForm
          buttonText={whitePaperInline.whitePaperFormFields?.buttonText}
          namePlaceholder={whitePaperInline.whitePaperFormFields?.namePlaceholder}
          nameLabel={whitePaperInline.whitePaperFormFields?.nameLabel}
          emailPlaceholder={whitePaperInline.whitePaperFormFields?.emailPlaceholder}
          emailLabel={whitePaperInline.whitePaperFormFields?.emailLabel}
          termsAndConditionsLabel={
            siteSettings?.contactSectionContent?.contactForm || {}
          }
          successMessage={whitePaperInline.whitePaperFormFields?.successMessage}
          errorMessage={whitePaperInline.whitePaperFormFields?.errorMessage}
          downloadAgain={whitePaperInline.whitePaperFormFields?.downloadAgain}
          file={whitePaperInline.pdfUrl}
          variant={'blog'}
          sectorName={''}
          name={'modal'}
          newsLetterCheckboxText={whitePaperInline.whitePaperFormFields?.newsLetterCheckboxText}
          isNewsLetterCheckboxRequired={whitePaperInline.whitePaperFormFields?.isNewsLetterCheckboxRequired}
        />
      </div>
    </Modal>
  );
}