import Image from 'next/image';
import cx from 'classnames';
import { useRouter } from 'next/router';

import { sanityImageUrlFor } from 'lib/sanity';

import styles from './ArticleBox.module.scss';
import Link from 'next/link';
import useFormatDateLong from 'lib/shared-domain/useFormatDateLong';
import { getArticleBoxLink } from 'lib/links';

interface Props {
  titleEl: any;
  type: string;
  hasDivider?: boolean;
  item: {
    _type?: any;
    date?: any;
    summary?: string;
    articleTitle?: string;
    slug: {
      current: string;
    };
    heroImage?: {
      alt?: string;
      asset: {
        url: string;
      };
    };
  };
}

const getWidthAndHeight = (type: string) => {
  if (type === 'small-vertical') {
    return {
      width: 109,
      height: 109,
    };
  }
  if (type === 'vertical') {
    return {
      width: 268,
      height: 268,
    };
  }
  if (type === 'half-vertical') {
    return {
      width: 183,
      height: 183,
    };
  }
  return {
    width: 845,
    height: 475,
  };
};

const ArticleBox: React.FC<Props> = ({
  titleEl = 'h5',
  item,
  type = 'featured',
  hasDivider = false,
}) => {
  const TitleElement = titleEl;
  const dateFormatted = useFormatDateLong(item?.date);
  const { locale } = useRouter();

  const isLatest = type === 'latest';
  const isSmallVertical = type === 'small-vertical';
  const classNames = cx(styles.article, styles[type], {
    [styles.divider]: hasDivider,
  });
  const noImage = isLatest;
  const noSummary = isLatest || isSmallVertical;

  const href = getArticleBoxLink(locale, item?.slug?.current, item._type) || '/en/home';

  return (
    <div className={classNames}>
      {!noImage && (
        <div className={styles.thumbnail}>
          <Link href={href}>
            <Image
              unoptimized
              src={sanityImageUrlFor(item.heroImage?.asset?.url).url()}
              alt={item.heroImage?.alt}
              width={845}
              height={475}
              {...getWidthAndHeight(type)}
              style={{
                maxWidth: '100%',
                objectFit: 'cover',
              }}
            />
          </Link>
        </div>
      )}
      <div className={styles.content}>
        <span>{dateFormatted}</span>
        <Link href={href}>
          <TitleElement>{item?.articleTitle}</TitleElement>
        </Link>
        {!noSummary && <p className={styles.summary}>{item?.summary}</p>}
      </div>
    </div>
  );
};

export default ArticleBox;
