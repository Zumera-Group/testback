import { Icon } from 'components/Icon';
import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Articles.module.scss';

export default function Pagination({
  pageCount,
  handlePagination,
  itemsPerPage,
}) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={
        pageCount === 0 ? null : (
          <Icon
            iconName={'chevron-right-circle'}
            viewBox={'0 0 32 32'}
            width={40}
            height={40}
          />
        )
      }
      previousLabel={
        <Icon
          iconName={'chevron-left-circle'}
          viewBox={'0 0 32 32'}
          width={40}
          height={40}
        />
      }
      onPageChange={(values) => handlePagination(values.selected)}
      pageRangeDisplayed={2}
      marginPagesDisplayed={3}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      activeClassName={styles.active}
      className={styles.pagination}
      pageLinkClassName={'h5'}
      disabledClassName={styles.hide}
    />
  );
}
