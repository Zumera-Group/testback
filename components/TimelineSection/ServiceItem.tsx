import { IService } from 'components/TimelineSection/TimelineSection';
import styles from './TimelineSection.module.scss';
import { Icon } from 'components/Icon';
import Link from 'next/link';
import { links } from 'lib/links';
import { Service } from 'lib/shared-domain/page/domain';
interface IProps {
  service: IService;
  index: number;
}
export const ServiceItem: React.FC<IProps> = ({ service, index }) => {
  return (
    <div className={styles.serviceItem}>
      <Link
        passHref
        href={links().services(service as Service)}
        className={styles.serviceLink}
      >
        <h2 className={styles.serviceIndex}>{index}</h2>
        <div className={styles.serviceItemContent}>
          <h4 className={styles.serviceName}>{service.name}</h4>
          <p>{service.shortDescription}</p>
          <Icon
            iconName={'arrow-circle'}
            viewBox={'0 0 32 32'}
            width={24}
            height={24}
          />
        </div>
      </Link>
    </div>
  );
};
