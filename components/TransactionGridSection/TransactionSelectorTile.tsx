import { ISectorsDropdown } from 'lib/shared-domain/page/domain/contentModule';
import styles from './TransactionGridSection.module.scss';
import Image from 'next/image';
import { useGetSectorDetail } from 'lib/shared-domain/sectors/application/useGetSectorDetail';
import { Locale } from 'lib/locale';

interface IProps {
  sector: ISectorsDropdown;
  activeSector: string;
  clickHandler: (string) => void;
  locale: Locale;
}
export const TransactionSelectorTile: React.FC<IProps> = ({
  sector,
  activeSector,
  clickHandler,
  locale,
}) => {
  const sectorDetail = useGetSectorDetail(locale, sector.slug.current);
  const hasIcon =
    sector._id !== '0' ? sectorDetail.graphLight?.iconImage?.asset?.url : false;
  return (
    <div
      className={`${styles.selectorTile} ${
        activeSector === sector._id ? styles.active : ''
      }`}
      onClick={() => clickHandler(sector._id)}
    >
      <div className={styles.tileImage}>
        {hasIcon ? (
          <Image
            unoptimized
            loading="lazy"
            src={sectorDetail.graphLight.iconImage?.asset?.url}
            alt={sector.name}
            height="24px"
            width="24px"
          />
        ) : null}
      </div>
      <div className={styles.tileTitle}>{sector.name}</div>
    </div>
  );
};
