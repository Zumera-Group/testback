import Link from 'next/link';

import { Icon } from 'components/Icon';

import styles from './Button.module.scss';

import { generateButtonVariant } from './utils';

interface Props {
  title?: string;
  type: 'primary' | 'secondary' | 'tertiary' | 'link';
  onDark?: boolean;
  id?: string;
  classes?: string;
  link?: any;
  externalUrl?: string | null;
  callBack?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: any;
}

export const Button: React.FC<Props> = ({
  title,
  type,
  onDark,
  id,
  classes,
  link,
  externalUrl,
  callBack,
  children,
  ...rest
}) => {

  const isLink = externalUrl || link?.slug?.current;
  const variant = generateButtonVariant({ type, onDark });

  const ButtonIcon = () => {
    if (type === 'primary' || type === 'secondary') {
      return <Icon iconName='arrow' width={10} height={10} />
    } else if (type === 'tertiary') {
      return <Icon iconName='arrow-circle' width={32} height={32} />
    } else {
      return null;
    }
  }

  return isLink ? (
    <Link href={ externalUrl || link?.slug?.current || '#'} passHref>
      <a
        id={id}
        title={title}
        className={[styles.button, variant, classes ?? ''].join(' ')}
        target={externalUrl ? '_blank' : undefined}
        rel={externalUrl ? 'noopener noreferrer' : undefined}
        {...rest}
      >
        <span>{children}</span>
        <ButtonIcon />
      </a>
    </Link>
  ) : (
    <button
      id={id}
      title={title}
      className={[styles.button, variant, classes ?? ''].join(' ')}
      onClick={callBack}
      role="button"
      name={typeof children === 'string' ? children : undefined}
      {...rest}
    >
      <span>{children}</span>
      <ButtonIcon />
    </button>
  );
};

export default Button;