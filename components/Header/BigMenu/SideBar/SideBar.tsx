import Link from 'next/link';

import { motion } from 'framer-motion';

import { LanguageSwitcher } from 'components/Header';
import { Close } from '../Close';
import { Icon } from 'components/Icon';

import { animationProps } from './animationProps';
import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';

import styles from './SideBar.module.scss';

export const SideBar = ({
  logo,
  menu,
  showMode,
  setShowMode,
  close,
  otherLangSlug
}) => {

  const linkWithCurrentLocale = useLinkWithCurrentLocale();

  return (
    <motion.div
      {...animationProps}
      className={styles.sideBar}>
      <div className={styles.logo}>
        {logo}
        <Close
          mobile={true}
          callBack={close}
        />
      </div>
      <ul className={styles.navigation}>
        {menu?.map(({ _key, name, page, type }, index: number) => (
          <li key={`sideBar-item-${_key}-${index}`} className={styles.item}>
            {type === 'normal' ? (
              <Link
                passHref
                href={linkWithCurrentLocale(page?.slug?.current)}
              >
                <a className={styles.link}>{name}</a>
              </Link>
            ) : (
              <button
                className={[
                  styles.link,
                  type === showMode && styles.link__active
                ].join(' ')}
                onClick={() => {setShowMode(type)}}
              >
                {name}
                <Icon
                  iconName="arrow"
                  viewBox="0 0 120 120"
                  width={10}
                  height={10} />
              </button>
            )}
          </li>
        ))}
        <li className={[styles.item, styles.item__divider].join(' ')}>
          <LanguageSwitcher
            otherLangSlug={otherLangSlug}
            classes={[styles.link, styles.link__languageSelector].join(' ')}
          />
        </li>
      </ul>
    </motion.div>
  )
};

export default SideBar;