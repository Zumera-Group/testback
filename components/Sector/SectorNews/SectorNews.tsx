import NewsGrid from "components/NewsGrid";

export const SectorNews = ({
  employees,
  newsArticles,
  transactions,
  sector,
  content,
}) => {
  const filterBySector = (e, sector) =>
    !!e?.sectors?.filter((s) => s?.id === sector?.id)?.length;
  const filteredEmployees = employees.filter((s) => filterBySector(s, sector));

  const t = (item) => content?.[item];

  return (
    <NewsGrid
      title={t('title')}
      subtitle={t('subtitle')}
      description={t('description')}
      employees={filteredEmployees}
      news={newsArticles}
      transactions={transactions}
    />
  );
};

export default SectorNews;