import Link from 'next/link';
import { Icon } from 'components/Icon';
import styles from './Button.module.scss';
import { generateButtonVariant } from './utils';
import axios from 'axios';

interface Props {
  title?: string;
  variant: 'primary' | 'secondary' | 'tertiary' | 'link';
  onDark?: boolean;
  icon?: string;
  hideIcon?: boolean;
  id?: string;
  classes?: string;
  link?: any;
  externalUrl?: string | null;
  internalAnchor?: string | null;
  disabled?: boolean;
  callBack?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: any;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<Props> = ({
  title,
  variant,
  onDark,
  icon,
  hideIcon,
  id,
  classes,
  link,
  externalUrl,
  internalAnchor,
  disabled,
  callBack,
  children,
  type,
  ...rest
}) => {
  const isLink = externalUrl || link?.slug?.current;
  const internalLink =
    link?.slug?.current && !internalAnchor
      ? link?.slug?.current
      : `${link?.slug?.current}#${internalAnchor}`;

  const btnVariant = generateButtonVariant({ variant, onDark });
  // @ts-ignore
  const downloadImage = rest?.image?.asset?.url;
  // @ts-ignore
  const downloadFileName = rest?.image?.asset?.originalFilename;
  const ButtonIcon = () => {
    if (hideIcon) return null;
    if (variant === 'primary' || variant === 'secondary') {
      return <Icon iconName={icon || 'arrow'} width={10} height={10} />;
    } else if (variant === 'tertiary') {
      return <Icon iconName={icon || 'arrow-circle'} width={32} height={32} />;
    }
    return null;
  };
  const downloadFile = () => {
    axios({
      url: downloadImage,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', downloadFileName);
      document.body.appendChild(link);
      link.click();
    });
  };

  return isLink && !downloadImage ? (
    <Link
      href={externalUrl || internalLink || '#'}
      passHref
      id={id}
      title={title}
      className={[styles.button, btnVariant, classes ?? ''].join(' ')}
      target={externalUrl ? '_blank' : undefined}
      rel={externalUrl ? 'noopener noreferrer' : undefined}
      scroll={false}
      {...rest}
    >
      <span>{children}</span>
      <ButtonIcon />
    </Link>
  ) : (
    <button
      id={id}
      title={title}
      className={[styles.button, btnVariant, classes ?? ''].join(' ')}
      onClick={downloadImage ? downloadFile : callBack}
      role="button"
      disabled={disabled}
      type={type}
      name={typeof children === 'string' ? children : undefined}
      {...rest}
    >
      <span>{children}</span>
      <ButtonIcon />
    </button>
  );
};

export default Button;
