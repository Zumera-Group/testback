import { useState } from 'react';

import { Button } from 'components/Button';

import { AnimatePresence, motion } from 'framer-motion';
import { animationProps } from './animationProps';

import styles from './Offices.module.scss';

export const Offices = ({ offices, appointmentLinkText }) => {
  const [selectedOffice, setSelectedOffice] = useState(offices[0]);
  const [selectedOfficeIndex, setSelectedOfficeIndex] = useState(0);

  if (!offices?.length) return null;

  console.log(offices);

  return (
    <div className={styles.offices}>
      <ul className={styles.officeToggles}>
        {offices?.map((office, index: number) => (
          <li key={`officeItem-${index}`}>
            <Button
              variant={'link'}
              onDark={true}
              callBack={() => {
                setSelectedOffice(office);
                setSelectedOfficeIndex(index);
              }}
              aria-selected={selectedOffice === office ? 'true' : 'false'}
            >
              <span
                className={[
                  styles.officeToggleText,
                  selectedOffice === office
                    ? styles.officeToggleText__active
                    : '',
                ].join(' ')}
              >
                {office?.city}
              </span>
            </Button>
          </li>
        ))}
      </ul>
      <AnimatePresence initial={false} exitBeforeEnter>
        {selectedOffice && (
          <motion.div
            key={selectedOfficeIndex}
            {...animationProps}
            className={styles.officeDetails}
          >
            <address className={styles.address}>
              <span>
                {selectedOffice.street} {selectedOffice.houseNumber}
              </span>
              <span>
                {selectedOffice.zipCode} {selectedOffice.city}
              </span>
            </address>
            {selectedOffice.phoneNumber && (
              <div className={styles.phoneNumber}>
                {selectedOffice.phoneNumber}
              </div>
            )}
            {selectedOffice.calendlyLink && (
              <div className={styles.btnWrapper}>
                <Button
                  variant={'tertiary'}
                  onDark={true}
                  externalUrl={selectedOffice.calendlyLink}
                >
                  {appointmentLinkText}
                </Button>
              </div>
            )}
            {selectedOffice?.image?.asset?.url ? (
              <img
                src={selectedOffice?.image?.asset?.url}
                alt={'Zumera Office'}
                className={styles.building}
              />
            ) : (
              <img
                src={'/contentModules/contactUsSection/footer_cta-building.svg'}
                alt={'Zumera Office'}
                className={styles.building}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Offices;
