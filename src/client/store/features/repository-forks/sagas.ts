import axios, { AxiosResponse, CancelToken } from 'axios';
import {
  cancelled,
  call,
  put,
  takeLatest,
  all,
  fork,
} from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  getRepositoryForksRequest,
  getRepositoryForksSuccess,
  getRepositoryForksFailure,
} from './slice';
import { TGetForksPayload, TRepositoryFork } from './types';

const fetchRepository = (
  owner: string,
  repository: string,
  cancelToken: CancelToken
): Promise<AxiosResponse<{ forks: number }>> =>
  axios.get(`/api/github/repos/${owner}/${repository}`, {
    cancelToken,
  });

const fetchRepositoryForks = (
  owner: string,
  repository: string,
  cancelToken: CancelToken,
  page?: string,
  take?: string
): Promise<AxiosResponse<TRepositoryFork[]>> =>
  axios.get(`/api/github/repos/${owner}/${repository}/forks`, {
    params: {
      page,
      take,
    },
    cancelToken,
  });

export function* getForks(action: PayloadAction<TGetForksPayload>) {
  const source = axios.CancelToken.source();

  try {
    const { owner, repository, page, take } = action.payload;
    const [
      {
        data: { forks },
      },
      { data },
    ] = yield all([
      call(fetchRepository as any, owner, repository, source.token),
      call(
        fetchRepositoryForks as any,
        owner,
        repository,
        source.token,
        page,
        take
      ),
    ]);
    yield put(getRepositoryForksSuccess({ data, totalCount: forks }));
  } catch (e) {
    yield put(getRepositoryForksFailure());
  } finally {
    const canceled: boolean = yield cancelled();
    if (canceled) source.cancel();
  }
}

function* getForksWatch() {
  yield takeLatest(getRepositoryForksRequest.type, getForks);
}

export function* forksSaga() {
  yield all([fork(getForksWatch)]);
}
