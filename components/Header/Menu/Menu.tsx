import { useRouter } from 'next/router';
import Link from 'next/link';

import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';

import styles from './Menu.module.scss';
import { getLinksByPageType } from 'lib/utils/getLinksByPageType';

export const Menu = ({ navigation }) => {
  const router = useRouter();
  const linkWithCurrentLocale = useLinkWithCurrentLocale();

  const isActive = (slug: string) => {
    return router.query.slug === slug;
  };
  return (
    <nav className={styles.menu}>
      <ul className={styles.items}>
        {navigation.map(({ _key, name, page }, index: number) => (
          <li key={`${_key}-${index}`} className={styles.item}>
            <Link
              passHref
              href={linkWithCurrentLocale(
                getLinksByPageType(
                  router.locale,
                  page._type,
                  page.slug?.current,
                ),
              )}
            >
              <a
                className={[
                  styles.link,
                  isActive(page.slug?.current) ? styles.link__active : '',
                ].join(' ')}
                data-title={name}
              >
                {name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
