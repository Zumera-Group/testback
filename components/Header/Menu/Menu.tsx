import { useRouter } from 'next/router';
import Link from 'next/link';

import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';

import styles from './Menu.module.scss';
import { getLinksByPageType } from 'lib/utils/getLinksByPageType';
import { HeaderMenuItem } from 'lib/shared-domain/page/domain';
import { Fragment, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

const Dropdown = ({ items, name }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const linkWithCurrentLocale = useLinkWithCurrentLocale();
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const lastItemIndex = Array.isArray(items) ? items.length - 1 : 0;

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={`${styles.dropdownToggle} ${isOpen ? styles.dropdownToggleActive : ''}`}
        onClick={toggleDropdown}
      >
        {name}
        <span className={styles.dropdownIcon}>&#9660;</span>
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {items.map(({ name, page }, index) => (
            <Fragment key={`${index}-${name}`}>
              <li className={clsx(styles.dropdownItem, {
                [styles.dropdownItem_borderBottom]: lastItemIndex != index
              })}>
                <Link
                  passHref
                  href={linkWithCurrentLocale(
                    getLinksByPageType(router.locale, page._type, page.slug?.current),
                  )}
                  onClick={() => setIsOpen(false)}
                  className={styles.dropdownLink}
                >
                  {name}
                </Link>
              </li>
            </Fragment>
          ))}
        </ul>
      )}
    </div>
  );
};

export const Menu = ({ navigation }: { navigation: HeaderMenuItem[] }) => {
  const router = useRouter();
  const linkWithCurrentLocale = useLinkWithCurrentLocale();

  const isActive = (slug: string) => {
    return router.query.slug === slug;
  };
  return (
    <nav className={styles.menu}>
      <ul className={styles.items}>
        {navigation.map(({ name, page, type, dropdownItems }, index: number) => {
          return (
            <li key={`${index}-${name}`} className={styles.item}>
              {
                type !== 'dropdown' &&
                <Link
                  passHref
                  href={linkWithCurrentLocale(
                    getLinksByPageType(
                      router.locale,
                      page._type,
                      page.slug?.current,
                    ),
                  )}
                  className={[
                    styles.link,
                    isActive(page.slug?.current) ? styles.link__active : '',
                  ].join(' ')}
                  data-title={name}>{name}</Link>
              }

              {
                type === 'dropdown' && <Dropdown items={dropdownItems} name={name} />
              }

            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
