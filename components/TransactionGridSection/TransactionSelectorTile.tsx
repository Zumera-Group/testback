import { ISectorsDropdown } from 'lib/shared-domain/page/domain/contentModule';
import styles from './TransactionGridSection.module.scss';
import Image from "next/image";
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

  const name = sector.name
    .split(' ')
    .map((word) => {
      if (word.length > 15) {
        const wordAsArray = word.split('');
        wordAsArray.splice(Math.round(word.length / 2), 0, '-');
        return wordAsArray.join('');
      }
      return word;
    })
    .join(' ');

  return (
    <div
      className={`${styles.selectorTile} ${
        activeSector === sector._id ? styles.active : ''
      }`}
      onClick={() => clickHandler(sector._id)}
    >
      {hasIcon ? (
        <div className={styles.tileImage}>
          <Image
            unoptimized
            loading="lazy"
            src={sectorDetail.graphLight.iconImage?.asset?.url}
            alt={sector.name}
            layout={'fill'}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </div>
      ) : null}
      <div
        className={[
          styles.tileTitle,
          !hasIcon ? styles.tileTitle__noIcon : '',
        ].join(' ')}
      >
        {name}
      </div>
    </div>
  );
};
