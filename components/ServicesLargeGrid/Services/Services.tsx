import { Service } from './Service';

import { Service as ServiceProps } from 'lib/shared-domain/page/domain/index';

import styles from './Services.module.scss';


interface Props {
  services?: Array<ServiceProps>;
  linkText: string;
}

export const Services: React.FC<Props> = ({ services, linkText }) => {
  if (!services) return null;
  return (
    <ul className={styles.services}>
      {services?.map((service, index) => (
        <Service
          key={`service-${service?._id || index}`}
          as={'li'}
          service={service}
          linkText={linkText}
        />
      ))}
    </ul>
  );
};

export default Services;