import styles from './TransactionsTable.module.scss';

export const TransactionsTable = ({ titles, transactions, transactionsTable }) => {
  const {
    tableTitle,
    numberTitle,
    mostPopularTitle,
    mAndANumber,
    significantTransactionsTitle
  } = titles || {};

  const {
    mostPopularTransaction,
    mAndATransactionsNumber,
    significantTransactions,
  } = transactionsTable;

  if (!transactionsTable) return null;

  return (
    <>
      {tableTitle && <h4 className={styles.title}>{tableTitle}</h4>}
      <dl className={styles.transactionsTable}>
        <dt>{numberTitle}</dt>
        <dd>{transactions}</dd>

        <dt>{mostPopularTitle}</dt>
        <dd>{mostPopularTransaction?.companyName1} x {mostPopularTransaction?.companyName2}</dd>

        <dt>{mAndANumber}</dt>
        <dd>{mAndATransactionsNumber}</dd>

        <dt>{significantTransactionsTitle}</dt>
        <dd>
          <ul>
            {significantTransactions?.map(({company1, company2, year}, index) => (
              <li key={`significantTransactions-${index}`}>
                {company1.trim()} x {company2.trim()}{' '}{year && <time>({year})</time>}
              </li>
            ))}
          </ul>
        </dd>
      </dl>
    </>
  );
};

export default TransactionsTable;