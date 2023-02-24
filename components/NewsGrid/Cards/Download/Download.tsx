import { useState } from 'react';
import * as EmailValidator from 'email-validator';

import Link from 'next/link';

import { Button } from 'components/Button';

import { MarketingParamsService } from 'lib/shared-domain/salesforce/application/marketingParamsService';
import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';
import { useSharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';

import styles from './Download.module.scss';

export const Download = ({ article }) => {
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);
  const [pressed] = useState(false);
  const [email, setEmail] = useState('');
  const emailIsValid = email.trim() && EmailValidator.validate(email);
  const sharedContent = useSharedContentContext();
  const linkWithCurrentLocale = useLinkWithCurrentLocale();

  const { title, description, file, emailLabel, hideIconBtn, buttonCaption } =
    article;

  return (
    <article className={styles.download}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {description && <p className={styles.excerpt}>{description}</p>}
      <form action={process.env.NEXT_PUBLIC_DOWNLOAD_REPORT_URL} method="POST">
        {MarketingParamsService.renderHiddenInputElements()}
        <input type="hidden" name="file_url" value={file?.asset?.url} />
        <div>
          <input
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={emailLabel}
            required={true}
            aria-required={true}
            // isInvalid={!emailIsValid && pressed}
          />
        </div>
        <div>
          <label htmlFor={'download-checkbox'}>
            {sharedContent?.checkboxPrivacyText1}
            <Link
              passHref
              href={linkWithCurrentLocale(
                sharedContent?.checkboxPrivacyPage?.slug?.current,
              )}
            >
              <a>{' ' + sharedContent?.checkboxPrivacyText2}</a>
            </Link>
            {' ' + sharedContent?.checkboxPrivacyText3}
          </label>
          <input
            type="checkbox"
            name={'download-checkbox'}
            onChange={(e) => setCheckboxIsChecked(e.target.checked)}
            checked={checkboxIsChecked}
            required={true}
            aria-required={true}
            // isInvalid={pressed && !checkboxIsChecked}
          />
        </div>
        <div>
          <Button
            variant={'secondary'}
            hideIcon={hideIconBtn}
            disabled={!checkboxIsChecked || !emailIsValid}
          >
            {buttonCaption}
          </Button>
        </div>
      </form>
    </article>
  );
};

export default Download;
