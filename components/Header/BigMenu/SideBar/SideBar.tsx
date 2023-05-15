import Link from 'next/link';

import { motion } from 'framer-motion';

import { LanguageSwitcher } from 'components/Header';
import { Close } from '../Close';
import { Icon } from 'components/Icon';

import { animationProps } from './animationProps';
import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';

import styles from './SideBar.module.scss';
import { getLinksByPageType } from 'lib/utils/getLinksByPageType';
import { useRouter } from 'next/router';

export const SideBar = ({
  logo,
  menu,
  showMode,
  setShowMode,
  close,
  otherLangSlug,
}) => {
  const router = useRouter();
  const linkWithCurrentLocale = useLinkWithCurrentLocale();

  return (
    <motion.div {...animationProps} className={styles.sideBar}>
      <div className={styles.logo}>
        {logo}
        <Close mobile={true} callBack={close} />
      </div>
      <ul className={styles.navigation}>
        {menu
          ?.filter((item) => item.page)
          ?.map(({ _key, name, page, type }, index: number) => (
            <li key={`sideBar-item-${_key}-${index}`} className={styles.item}>
              {type === 'normal' ? (
                <Link
                  passHref
                  className={styles.link}
                  href={linkWithCurrentLocale(
                    getLinksByPageType(
                      router.locale,
                      page?._type,
                      page.slug?.current,
                    ),
                  )}
                >
                  {name}
                </Link>
              ) : (
                <button
                  className={[
                    styles.link,
                    type === showMode && styles.link__active,
                  ].join(' ')}
                  onClick={() => {
                    setShowMode(type);
                  }}
                >
                  {name}
                  <Icon
                    iconName="arrow"
                    viewBox="0 0 120 120"
                    width={10}
                    height={10}
                  />
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
  );
};

export default SideBar;
