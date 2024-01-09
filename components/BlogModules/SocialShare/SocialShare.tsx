import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './SocialShare.module.scss';
import { Twitter } from 'components/Icons/Twitter';
import { Facebook } from 'components/Icons/Facebook';
import { Linkedin } from 'components/Icons/Linkedin';
import { Clipboard } from 'components/Icons/Clipboard';

export const SocialShare: React.FC<{
  content: any;
  partialSlug: string;
  domain: string;
}> = ({ content, partialSlug, domain }) => {
  const { locale } = useRouter();
  const [copied, setCopied] = useState(false);
  const protoDomain = domain;
  const iframe = 'width=500,height=400';

  const handleTwitterClick = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      content?.articleTitle,
    )}&url=${encodeURIComponent(
      `${protoDomain}/${locale}/${partialSlug}/${content?.slug?.current}`,
    )}`;
    window.open(shareUrl, '_blank', iframe);
  };

  const handleFacebookClick = () => {
    const shareUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
      `${protoDomain}/${locale}/${partialSlug}/${content?.slug?.current}`,
    )}`;
    window.open(shareUrl, '_blank', iframe);
  };

  const handleLinkedinClick = () => {
    const shareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
      `${protoDomain}/${locale}/${partialSlug}/${content?.slug?.current}`,
    )}&title=${encodeURIComponent(content?.articleTitle)}`;
    window.open(shareUrl, '_blank', iframe);
  };

  const handleClipboardClick = () => {
    navigator.clipboard
      .writeText(
        `${protoDomain}/${locale}/${partialSlug}/${content?.slug?.current}`,
      )
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      });
  };
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

export default SocialShare;
