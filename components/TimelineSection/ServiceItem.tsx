import { IService } from 'components/TimelineSection/TimelineSection';
import { H } from 'components/Typography/H';
import { P } from 'components/Typography/P';
import styles from './TimelineSection.module.scss';
import { Icon } from 'components/Icon';
import Link from 'next/link';

interface IProps {
  service: IService;
  index: number;
}
export const ServiceItem: React.FC<IProps> = ({ service, index }) => {
  return (
    <div className={styles.serviceItem}>
      <H variant={'h2'} className={styles.serviceIndex}>
        {index}
      </H>
      <div className={styles.serviceItemContent}>
        <H variant={'h4'} color={'inherit'} className={styles.serviceName}>
          {service.name}
        </H>
        <P fontSize={'1rem'} color={'inherit'}>
          {service.shortDescription}
        </P>
        <Link passHref href={service.slug?.current}>
          <a>
            <Icon
              iconName={'arrow-circle'}
              viewBox={'0 0 32 32'}
              width={24}
              height={24}
            />
          </a>
        </Link>
      </div>
    </div>
  );
};
