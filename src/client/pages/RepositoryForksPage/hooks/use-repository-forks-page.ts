import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getRepositoryForksRequest } from 'client/store/features';

import { TRepositoryForksPageParams } from '../RepositoryForksPage';

export const useRepositoryForksPage = (page?: number, take?: number) => {
  const dispatch = useDispatch();
  const { owner, repository } = useParams<TRepositoryForksPageParams>();

  useEffect(() => {
    dispatch(
      getRepositoryForksRequest({
        owner,
        repository,
        page: page ? page + 1 : undefined,
        take,
      })
    );
  }, [dispatch, owner, page, repository, take]);

  return { owner, repository };
};
