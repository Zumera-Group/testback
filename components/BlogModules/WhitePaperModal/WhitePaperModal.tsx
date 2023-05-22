import styles from './WhitePaper.module.scss';
import { WhitePaperForm } from 'components/WhitePaperDownload/WhitePaperForm';
import { Container, Grid, GridColumn, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import Image from 'next/image';
import { sanityImageUrlFor } from 'lib/sanity';
import Modal from 'react-modal';
import ReactModal from 'react-modal';

import { Button } from 'components/Button';
import { useState } from 'react';
import { Icon } from 'components/Icon';
import { BlogArticle } from 'lib/shared-domain/blogArticle/domain';
import { SiteSettings } from 'lib/shared-domain/page/domain';

ReactModal.setAppElement('body');

const WhitePaperModal: React.FC<{
  blogArticle: BlogArticle;
  siteSettings: SiteSettings;
  blogArticleDetail: any;
}> = ({ blogArticle, blogArticleDetail, siteSettings }) => {
  const [isOpen, setIsOpen] = useState(false);

  //   console.log(blogArticle);

  console.log(siteSettings.contactSectionContent);

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
    <div className={styles.modalWrapper}>
      <Button
        variant={'secondary'}
        link={'#'}
        onDark={false}
        classes={styles.downloadBtn}
        callBack={openModal}
      >
        Download this article
      </Button>
      <Modal
        isOpen={isOpen}
        className={styles.modal}
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
              <GridColumn sm={12} md={5} lg={5}>
                <SectionHeading
                  title={blogArticleDetail.whitePaperDownload.title}
                  description={blogArticleDetail.whitePaperDownload.description}
                  headingType={'h3'}
                  align={'left'}
                />
                <div className={styles.image}>
                  <Image
                    unoptimized={true}
                    src={sanityImageUrlFor(
                      blogArticle?.whitePaperDownload?.pdfThumbnail.asset.url,
                    ).url()}
                    alt={
                      blogArticle?.whitePaperDownload?.pdfThumbnail.asset.alt
                    }
                    width={545}
                    height={280}
                    className={styles.thumbnail}
                  />
                </div>
              </GridColumn>
              <GridColumn sm={12} md={5} lg={6} className={styles.formWrapper}>
                <WhitePaperForm
                  buttonText={
                    blogArticleDetail.whitePaperDownload.whitePaperForm
                      .submitLabel
                  }
                  namePlaceholder={
                    blogArticleDetail.whitePaperDownload.whitePaperForm
                      .nameLabel
                  }
                  emailPlaceholder={
                    blogArticleDetail.whitePaperDownload.whitePaperForm
                      .emailLabel
                  }
                  termsAndConditionsLabel={
                    siteSettings.contactSectionContent.contactForm
                  }
                  successMessage={
                    blogArticleDetail.whitePaperDownload.whitePaperForm
                      .successMessage
                  }
                  //   errorMessage={
                  //     blogArticleDetail.whitePaperDownload.whitePaperForm
                  //       .successMessage
                  //   }
                  downloadAgain={
                    blogArticleDetail.whitePaperDownload.downloadAgain
                  }
                  file={blogArticle?.whitePaperDownload?.pdfURL}
                  phoneNumber={
                    blogArticleDetail.whitePaperDownload.whitePaperForm
                      .numberLabel
                  }
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
