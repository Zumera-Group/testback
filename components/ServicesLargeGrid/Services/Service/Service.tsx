import Link from 'next/link';

import { links } from 'lib/links';

import { Icon } from 'components/Icon';

import { Service as ServiceProps } from 'lib/shared-domain/page/domain/index';

import styles from './Service.module.scss';

interface Props {
  as?: '' | 'div' | 'li';
  service?: ServiceProps;
  linkText: string;
}

export const Service: React.FC<Props> = ({
  as,
  service,
  linkText
}) => {

  const Component = as || 'div';
  const { name, shortDescription } = service;
  const href = links().services(service);

  return (
    <Component className={styles.service}>
      <Link
        passHref
        href={href}>
          <a className={styles.link} title={linkText ? linkText : ''}>
            {name && <h5 className={styles.name}>{name}</h5>}
            {shortDescription && <p className={styles.description}>{shortDescription}</p>}
            <Icon
              iconName={'arrow-circle'}
              viewBox={'0 0 32 32'}
              width={24}
              height={24}
            />
          </a>
      </Link>
    </Component>
  );
};

export default Service;