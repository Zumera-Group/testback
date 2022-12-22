import Link from 'next/link';

import styles from './FooterLink.module.scss';

interface Props {
  title: string;
  href: string;
};

export const FooterLink: React.FC<Props> = ({ title, href }) => {
  return (
    <Link
      passHref
      href={href}>
        <a className={styles.link}>
          {title}
        </a>
    </Link>
  );
};

export default FooterLink;