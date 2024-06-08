import {BlogArticle} from '../../../lib/shared-domain/blogArticle/domain';
import {useBlogJsonLd} from './hooks/useBlogJsonLd';

export const BlogJsonLd = ({blogArticle, locale}: {blogArticle: BlogArticle, locale: string}) => {
  const {jsonLd} = useBlogJsonLd({blogArticle, locale});

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};