import { useState } from 'react';

import { FooterLink } from 'components/Footer';
import { Icon } from 'components/Icon';

import { AnimatePresence, motion } from 'framer-motion';

import { menuAnimationProps, toggleIconVariants } from './animationProps';

import { SCREEN_SIZE_SM } from 'lib/constants';
import { useMediaQuery } from 'lib/hooks/useMediaQuery'
import { links } from 'lib/links';
import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';
import { Service, Sector } from 'lib/shared-domain/page/domain/index';
import { Questionnaire } from 'lib/shared-domain/questionnaire/domain/index';

import styles from './FooterMenu.module.scss';

interface Props {
  type: string;
  title: string;
  items: {
    type: 'normal' | 'sectors' | 'services' | 'tools';
    title: string;
    menuItems?: {
      _key: string;
      name: string;
      page: {
        slug: {
          current: string;
        };
      };
    }[];
    toolsMenuItems?: {
      _key: string;
      name: string;
      page: Questionnaire;
    }[];
    serviceMenuItems?: Service[];
    sectorMenuItems?: Sector[];
    map: any;
  };
  index: number;
}

export const FooterMenu: React.FC<Props> = ({
  type,
  title,
  items,
  index
}) => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const linkWithCurrentLocale = useLinkWithCurrentLocale();
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_SM})`);

  const getHref = (item) => {
    if (type === 'normal') return linkWithCurrentLocale(item?.page?.slug?.current);
    if (type === 'services') return links().services(item);
    if (type === 'sectors') return links().sectors(item);
    if (type === 'tools') return links().questionnaires(item.page);
    return linkWithCurrentLocale(item?.page?.slug?.current || item?.slug.current || '#');
  }

  const MenuTitle = () => {
    return <h4 className={styles.title}>{title}</h4>;
  };

  const MenuToggle = () => {
    return (
      <button
        className={styles.mobileMenuToggle}
        onClick={() => isMobile && setMobileMenuOpen(!mobileMenuOpen)}
      >
        <MenuTitle />
        <motion.span
          variants={toggleIconVariants}
          animate={mobileMenuOpen ? 'open' : 'closed'}
        >
          <Icon
            iconName={'chevron-down'}
            viewBox="0 0 52 32"
            width={11}
            height={18}
          />
        </motion.span>
      </button>
    )
  }

  return (
    <>
      {isMobile ? (
        <MenuToggle />
      ) : (
        <MenuTitle />
      )}
      <AnimatePresence>
        {(mobileMenuOpen || !isMobile) && (
        <motion.div {...menuAnimationProps}>
          <ul className={styles.menu}>
            {items.map((item: any, itemIndex: number) => (
              <li
                key={`menuItem-${index}-${itemIndex}`}
                className={styles.item}>
                <FooterLink
                  title={item?.name}
                  href={getHref(item)}
                />
              </li>
            ))}
          </ul>
        </motion.div>
        )}
      </AnimatePresence>
    </>

  );
};

export default FooterMenu;