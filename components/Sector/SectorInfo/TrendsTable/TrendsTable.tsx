import styles from './TrendsTable.module.scss';

export const TrendsTable = ({ title, trendsTable }) => {
  const { trends } = trendsTable;
  if (!trends) return null;
  console.log(trends);
  return (
    <>
      {title && <h3 className={styles.title}>{title}</h3>}
      {Array.isArray(trends) && trends.length > 0 && (
        trends.map(({ title, subtitle, _key }) => (
          <div key={`trendsTable-${_key}`}>
            <h4 className={styles.subtitle}>{title}</h4>
            <p className={styles.content}>{subtitle}</p>
          </div>
        ))
      )}
    </>
  );
};

export default TrendsTable;