import Link from 'next/link';

import styles from './FooterLink.module.scss';

interface Props {
  title: string;
  href: string;
};

export const FooterLink: React.FC<Props> = ({ title, href }) => {
  return (
    (<Link passHref href={href} className={styles.link}>

      {title}

    </Link>)
  );
};

export default FooterLink;