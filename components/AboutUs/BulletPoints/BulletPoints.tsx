import styles from './BulletPoints.module.scss';

export const BulletPoints = ({ bulletPoints }) => {
  if (!bulletPoints?.length) return null;

  return (    
    bulletPoints?.map(({ title, texts, _key }, index: number) => (
      <div
        key={`${_key}-${index}`}
        className={styles.wrapper}
      >
        {title && <h3 className={styles.title}>{title}</h3>}
        {texts?.length > 0 && (
          <ul className={styles.items}>
            {texts?.map((item: string, itemIndex: number) => (
              <li key={`${_key}-${index}-${itemIndex}`}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    ))
  )
}

export default BulletPoints;