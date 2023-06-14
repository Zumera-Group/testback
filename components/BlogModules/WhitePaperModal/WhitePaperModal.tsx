import styles from './WhitePaper.module.scss';
import { WhitePaperForm } from 'components/WhitePaperDownload/WhitePaperForm';
import { Container, Grid, GridColumn, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import Image from 'next/image';
import { sanityImageUrlFor } from 'lib/sanity';
import Modal from 'react-modal';

import { Button } from 'components/Button';
import { useState } from 'react';
import { Icon } from 'components/Icon';
import { BlogArticle } from 'lib/shared-domain/blogArticle/domain';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import localFont from '@next/font/local';
('./..');

Modal.setAppElement('#modalWrapper');

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

const WhitePaperModal: React.FC<{
  blogArticle: BlogArticle;
  siteSettings: SiteSettings;
  blogArticleDetail: any;
}> = ({ blogArticle, blogArticleDetail, siteSettings }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    whitePaperDownload,
    whitePaperDownload: { whitePaperForm },
  } = blogArticleDetail;

  // const {
  //   whitePaperDownload: { pdfThumbnail },
  // } = blogArticle;

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const Close = () => (
    <button
      onClick={closeModal}
      title={'Close'}
      aria-label={'Close'}
      className={styles.closeBtn}
    >
      <Icon iconName="cross" viewBox="0 0 24 21" width={24} height={21} />
    </button>
  );

  return (
    <div className={[styles.modalWrapper].join(' ')} id="modalWrapper">
      <Button
        variant={'download'}
        link={'#'}
        onDark={false}
        classes={styles.downloadBtn}
        callBack={openModal}
      >
        {whitePaperDownload?.downloadCTA}
      </Button>
      <Modal
        isOpen={isOpen}
        className={[styles.modal, myFont.className].join(' ')}
        overlayClassName={styles.overlay}
        onRequestClose={closeModal}
      >
        <Close />

        <Grid justifyContent={'center'} alignItems={'center'} fullWidth={true}>
          <GridColumn sm={12} md={12} lg={12}>
            <Grid
              justifyContent={'space-between'}
              alignItems={'stretch'}
              fullWidth={true}
            >
              <GridColumn sm={12} md={6} lg={6}>
                <SectionHeading
                  title={whitePaperDownload?.title}
                  description={whitePaperDownload?.description}
                  headingType={'h3'}
                  align={'left'}
                />

                <div className={styles.image}>
                  <Image
                    unoptimized={true}
                    src={sanityImageUrlFor(
                      blogArticle?.whitePaperDownload?.pdfThumbnail?.asset?.url,
                    )?.url()}
                    alt={
                      blogArticle?.whitePaperDownload?.pdfThumbnail?.asset?.alt
                    }
                    width={545}
                    height={280}
                    className={styles.thumbnail}
                  />
                </div>
              </GridColumn>
              <GridColumn sm={12} md={6} lg={6} className={styles.formWrapper}>
                <WhitePaperForm
                  buttonText={whitePaperForm?.submitLabel}
                  namePlaceholder={whitePaperForm?.nameLabel}
                  emailPlaceholder={whitePaperForm?.emailLabel}
                  termsAndConditionsLabel={
                    siteSettings?.contactSectionContent?.contactForm
                  }
                  successMessage={whitePaperForm?.successMessage}
                  errorMessage={whitePaperForm?.errorMessage}
                  downloadAgain={whitePaperDownload?.downloadAgain}
                  file={blogArticle?.whitePaperDownload?.pdfURL}
                  phoneNumber={whitePaperForm?.numberLabel}
                  variant={'blog'}
                  sectorName={''}
                />
              </GridColumn>
            </Grid>
          </GridColumn>
        </Grid>
      </Modal>
    </div>
  );
};

export default WhitePaperModal;
