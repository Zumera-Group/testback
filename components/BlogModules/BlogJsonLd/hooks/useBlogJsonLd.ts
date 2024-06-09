import {BlogArticle} from '../../../../lib/shared-domain/blogArticle/domain';
import {NewsArticle, Person, WithContext} from 'schema-dts';
import {parse, formatISO, parseISO} from 'date-fns';
import {sanityImageUrlFor} from '../../../../lib/sanity';
import {getBuiltLink} from '../../../../lib/links';
import {useMemo} from 'react';

export const useBlogJsonLd = ({blogArticle, locale}: {blogArticle: BlogArticle, locale: string}) => {
  return useMemo(() => {
    const newsArticle: WithContext<NewsArticle> = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: blogArticle.articleTitle,
    };

    const datePublished = dateParseAndFormat('yyyy-MM-dd', blogArticle.date);
    const dateModified = dateParseAndFormat('ISO', blogArticle._updatedAt);

    if (datePublished) {
      newsArticle.datePublished = datePublished;
    }

    if (dateModified) {
      newsArticle.dateModified = dateModified;
    }

    let images = [];
    if (blogArticle?.heroImage?.asset?.url) {
      images.push(sanityImageUrlFor(blogArticle?.heroImage?.asset?.url).url());
    }

    images = images.concat(
      blogArticle.blogModules?.filter(({_type, image}) => _type === 'imageBlock' && image?.asset?.url)
        .map(({image}) => sanityImageUrlFor(image.asset.url).url()) ?? []
    )

    if (images.length) {
      newsArticle.image = images;
    }

    const authors = blogArticle?.authors?.filter(
        ({firstName, lastName, slug}) => (firstName || lastName) && slug?.current
      )
        .map(({firstName, lastName, slug}): Person => {
          const name = [firstName || '', lastName || ''];

          return {
            '@type': 'Person',
            name: name.join(' '),
            url: getBuiltLink({
              locale,
              path: 'employees',
              uri: slug?.current
            })
          };
        }) ?? []
    ;

    if (authors.length) {
      newsArticle.author = authors;
    }

    return {
      jsonLd: [newsArticle]
    };
  }, [blogArticle, locale]);
};

const dateParseAndFormat = (originalFormat: string, date?: string|null): null|string => {
  if (date) {
    try {
      if (originalFormat === 'ISO') {
        return formatISO(parseISO(date));
      } else {
        return formatISO(parse(date, originalFormat, new Date()));
      }
    } catch (e) {
      console.error(`err for ${originalFormat}:`, e);
    }
  }

  return null;
};