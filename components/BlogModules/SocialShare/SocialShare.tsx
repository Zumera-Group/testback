import React, { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import styles from './SocialShare.module.scss';
import { Twitter } from 'components/Icons/Twitter';
import { Facebook } from 'components/Icons/Facebook';
import { Linkedin } from 'components/Icons/Linkedin';
import { Clipboard } from 'components/Icons/Clipboard';
import {BlogArticle, TBlogArticleType} from '../../../lib/shared-domain/blogArticle/domain';
import { getBuiltLink } from '../../../lib/links';
import _trimEnd from 'lodash/trimEnd';

export const SocialShare: React.FC<{
  blogArticle: BlogArticle;
}> = ({ blogArticle}) => {
  const { locale } = useRouter();
  const [copied, setCopied] = useState(false);
  const iframe = 'width=500,height=400';

  const {shareUrl, twitterUrl, facebookUrl, linkedIn} = useMemo(() => {
    let pagePath = 'blog';
    if (blogArticle._type == TBlogArticleType.blogValToolArticle) {
      pagePath = 'valuation-tool';
    }

    const shareUrl = `${_trimEnd(process.env.NEXT_PUBLIC_BASE_URL, '/')}${getBuiltLink({
      locale,
      path: pagePath,
      uri: blogArticle.slug?.current
    })}`;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(blogArticle.articleTitle)}&url=${encodeURIComponent(shareUrl)}`
    const facebookUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    const linkedIn = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(blogArticle.articleTitle)}`

    return {
      shareUrl, twitterUrl, facebookUrl, linkedIn
    };
  }, [blogArticle, getBuiltLink]);

  const handleTwitterClick = useCallback(() => {
    window.open(twitterUrl, '_blank', iframe);
  }, [twitterUrl, iframe]);

  const handleFacebookClick = useCallback(() => {
    window.open(facebookUrl, '_blank', iframe);
  }, [facebookUrl, iframe]);

  const handleLinkedinClick = useCallback(() => {
    window.open(linkedIn, '_blank', iframe);
  }, [linkedIn, iframe]);

  const handleClipboardClick = useCallback(() => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      });
  }, [setCopied, shareUrl]);

  return (
    <div className={styles.socialIcons}>
      <button
        className={[styles.twitterShare, styles.shareIcon].join(' ')}
        onClick={handleTwitterClick}
      >
        <Twitter />
      </button>
      <button
        className={[styles.facebookShare, styles.shareIcon].join(' ')}
        onClick={handleFacebookClick}
      >
        <Facebook />
      </button>
      <button
        className={[styles.linkedinShare, styles.shareIcon].join(' ')}
        onClick={handleLinkedinClick}
      >
        <Linkedin />
      </button>
      <button
        className={[styles.clipboardShare, styles.shareIcon].join(' ')}
        onClick={handleClipboardClick}
      >
        <Clipboard />
        {copied && (
          <div className={styles.popup}>
            {locale === 'en' ? 'Copied!' : locale === 'fr' ? 'Copié!' : 'Kopiert!'}
          </div>
        )}
      </button>
    </div>
  );
};

