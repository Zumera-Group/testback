import React from 'react';
import styles from './OpenJobsList.module.scss';
import { Icon } from 'components/Icon';
export const JobItem: React.FC<any> = ({ job }) => {
  const { title, office, employmentType, link } = job;
  const personioTrackingID = localStorage.getItem('personioTrackingID');
  const personioLink = personioTrackingID ? `?_pc=${personioTrackingID}` : '';
  return (
    <a
      href={`${link}${personioLink}`}
      className={styles.job}
      target={'_blank'}
      rel="noreferrer"
    >
      <span>{title}</span>
      <span>{office.city}</span>
      <span>{employmentType}</span>
      <span>
        <Icon iconName={'arrow-external'} width={15} height={15} />
      </span>
    </a>
  );
};
