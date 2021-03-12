import { shallowEqual, useSelector } from 'react-redux';

import { TRootState } from 'client/store';

import { TRepositoryForksState } from './types';

export const useRepositoryForksSelector = () =>
  useSelector<TRootState, TRepositoryForksState>(
    state => state.repositoryForks,
    shallowEqual
  );
