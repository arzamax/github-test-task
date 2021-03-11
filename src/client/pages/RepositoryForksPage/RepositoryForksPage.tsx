import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { withQueryParams } from 'client/components';
import { getRepositoryForksRequest } from 'client/store/features/forks';

type TRepositoryForksPageParams = {
  owner: string;
  repository: string;
};

type TRepositoryForksPageQueryParams = {
  page?: number;
  take?: number;
};

export const RepositoryForksPage = withQueryParams<TRepositoryForksPageQueryParams>(
  {
    defaultParams: {
      page: 1,
      take: 10,
    },
    paramsMapper: {
      page: Number,
      take: Number,
    },
  }
)(({ page, take }) => {
  const dispatch = useDispatch();
  const { owner, repository } = useParams<TRepositoryForksPageParams>();

  useEffect(() => {
    dispatch(
      getRepositoryForksRequest({
        owner,
        repository,
        page,
        take,
      })
    );
  }, [dispatch, owner, page, repository, take]);

  return <div>Table</div>;
});
