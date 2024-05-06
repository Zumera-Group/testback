import styles from 'components/BlogModules/DownloadPaperStickyFooter/DownloadPaperStickyFooter.module.scss';
import { Container, Grid, GridColumn } from 'components/Layout';
import { Button } from 'components/Button';
import { useEffect, useState } from 'react';
import { DownloadPaperStickyFooterModule } from 'lib/shared-domain/blogArticle/domain/blogModule';
import { SectionHeading } from 'components/SectionHeading';
import Image from 'next/image';
import { sanityImageUrlFor } from 'lib/sanity';
import { WhitePaperForm } from 'components/WhitePaperDownload/WhitePaperForm';
import Modal from 'react-modal';
import { Icon } from 'components/Icon';
import { BlogArticle } from 'lib/shared-domain/blogArticle/domain';
import { SiteSettings } from 'lib/shared-domain/page/domain';

export const DownloadPaperStickyFooter: React.FC<{
  specificContentModule: DownloadPaperStickyFooterModule;
  blogArticleDetail: any,
  blogArticle: BlogArticle,
  siteSettings: SiteSettings
}> = ({ specificContentModule, blogArticleDetail, blogArticle, siteSettings }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { button } = specificContentModule;
  const {
    whitePaperDownload,
    whitePaperDownload: { whitePaperForm },
  } = blogArticleDetail;


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

  if (!button?.title) {
    return null;
  }


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

        <Modal
          className={styles.modal}

          isOpen={isOpen}
          overlayClassName={styles.overlay}
          onRequestClose={closeModal}
        >
          <Close />

          <Grid justifyContent={'center'} alignItems={'center'} fullWidth={true} style={{ height: '85%' }}>
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
                    successMessage={whitePaperForm?.successMessage}
                    errorMessage={whitePaperForm?.errorMessage}
                    downloadAgain={whitePaperDownload?.downloadAgain}
                    file={blogArticle?.whitePaperDownload?.pdfURL}
                    termsAndConditionsLabel={
                      siteSettings?.contactSectionContent?.contactForm
                    }
                    variant={'blog'}
                    sectorName={''}
                  />
                </GridColumn>
              </Grid>
            </GridColumn>
          </Grid>
        </Modal>
      </Container>


    </div>
  );
};
