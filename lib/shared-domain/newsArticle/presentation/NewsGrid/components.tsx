import React from 'react';
import { NewsGridCard } from '../newsCards';
import {
  TransactionCard,
  transactionCardVariants,
} from '../../../transactions/presentation/components/TransactionCard';
import { links } from 'lib/links';
import { getEmployeeFullName } from 'lib/shared-domain/employees/domain/getEmployeeFullName';
import { useFormatDate } from 'lib/shared-domain/useFormatDate';

export const OneForTwoNewsComponent = ({ newsArticle, linkText }) => {
  const format = useFormatDate();
  if (!newsArticle) return null;

  return (
    <NewsGridCard.SmallNewsCard
      key={newsArticle._id}
      title={newsArticle.title}
      subtitle={newsArticle.date && format(new Date(newsArticle.date))}
      image={newsArticle.picture?.asset?.url}
      linkText={linkText}
      href={links().newsArticles(newsArticle)}
      imageObjectFit={newsArticle.pictureImageFit}
      newsGridWithAdditionalPaddingForImage={
        newsArticle.newsGridWithAdditionalPaddingForImage
      }
    />
  );
};

export const NewsBigComponent = ({ newsArticle, light, linkText }) => {
  const format = useFormatDate();
  if (!newsArticle) return null;

  return (
    <NewsGridCard.BigNewsCard
      newsGridWithAdditionalPaddingForImage={
        newsArticle.newsGridWithAdditionalPaddingForImage
      }
      light={light}
      key={newsArticle._id}
      title={newsArticle.title}
      subtitle={newsArticle.date && format(new Date(newsArticle.date))}
      image={
        newsArticle.secondPicture?.asset?.url || newsArticle.picture?.asset?.url
      }
      linkText={linkText}
      hasCDIRelation={newsArticle.hasCDIRelation}
      href={links().newsArticles(newsArticle)}
      imageObjectFit={newsArticle.pictureImageFit}
    />
  );
};

export const TransactionBigComponent = ({ transaction, linkText }) => {
  return (
    <TransactionCard
      variant={transactionCardVariants.newsGrid}
      linkText={linkText}
      transaction={transaction}
    />
  );
};

export const EmployeeComponent = ({ employee, linkText }) => {
  return (
    <NewsGridCard.EmployeeCard
      linkText={linkText}
      title={getEmployeeFullName(employee)}
      subtitle={employee.jobTitle}
      image={employee.newsGridPicture?.picture?.asset?.url}
      href={links().employees(employee)}
    />
  );
};
