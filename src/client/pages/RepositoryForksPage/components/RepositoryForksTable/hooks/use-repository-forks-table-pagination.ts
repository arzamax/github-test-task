import { ChangeEvent } from 'react';

import { useQueryParamsContext } from 'client/components';
import { TRepositoryForksPageQueryParams } from 'client/pages/RepositoryForksPage';

export const useRepositoryForksTablePagination = () => {
  const [
    ,
    { update },
  ] = useQueryParamsContext<TRepositoryForksPageQueryParams>();

  const onChangePage = (e: any, page: number) => {
    update({ page });
  };

  const onChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement>) => {
    update({ take: Number(e.target.value) });
  };

  return {
    onChangePage,
    onChangeRowsPerPage,
  };
};
