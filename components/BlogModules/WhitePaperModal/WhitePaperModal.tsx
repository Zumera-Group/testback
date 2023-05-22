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

ReactModal.setAppElement('body');

const WhitePaperModal: React.FC<{}> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

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
            {/* <Container>
              <div className={styles.content}> */}
            <Grid
              justifyContent={'space-between'}
              alignItems={'stretch'}
              fullWidth={true}
            >
              <GridColumn sm={12} md={5} lg={5}>
                <SectionHeading
                  title={'Download this blog post'}
                  description={
                    'This is a placeholder lorem ipsum dolor sit amet'
                  }
                  headingType={'h3'}
                  align={'left'}
                />
                <div className={styles.image}>
                  <Image
                    unoptimized={true}
                    //   src={sanityImageUrlFor(image.asset.url).url()}
                    src="https://cdn.sanity.io/images/8r7hp46l/development/06d6f1e9299056c902b8ca7ae8d2c5a65f6aa7bb-569x302.png"
                    alt={''}
                    width={545}
                    height={280}
                    className={styles.thumbnail}
                  />
                </div>
              </GridColumn>
              <GridColumn sm={12} md={5} lg={6} className={styles.formWrapper}>
                <WhitePaperForm
                  buttonText={'Download'}
                  namePlaceholder={'name'}
                  emailPlaceholder={'email'}
                  termsAndConditionsLabel={'terms'}
                  successMessage={'success'}
                  downloadAgain={'download'}
                  file={
                    'https://cdn.sanity.io/files/8r7hp46l/development/5592b141c8ecedad006ecf087347b073a1758581.png'
                  }
                  phoneNumber={'number'}
                />
              </GridColumn>
            </Grid>
            {/* </div>
            </Container> */}
          </GridColumn>
        </Grid>
      </Modal>
    </div>
  );
};

export default WhitePaperModal;
