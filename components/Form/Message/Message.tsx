import styles from './Message.module.scss';

interface Props {
  isSuccess?: boolean;
  isError?: boolean;
  children: any;
}

export const Message: React.FC<Props> = ({
  isSuccess,
  isError,
  children
}) => {
  return (
    <div className={[
        styles.message,
        (isSuccess && !isError) ? styles.message__success : '',
        (!isSuccess && isError) ? styles.message__error : '',
      ].join(' ')}
    >
      <span>{children}</span>
    </div>
  );
};

export default Message;