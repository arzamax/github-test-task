import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TRepositoryForksState,
  TGetForksPayload,
  TGetRepositoryForksSuccess,
} from './types';

const initialState: TRepositoryForksState = {
  data: [],
  isLoading: false,
  isError: false,
  totalCount: 0,
};

const { actions, reducer } = createSlice({
  name: 'forks',
  initialState,
  reducers: {
    getRepositoryForksRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<TGetForksPayload>
    ) => {
      state.isLoading = true;
      state.isError = false;
    },
    getRepositoryForksSuccess: (
      state,
      action: PayloadAction<TGetRepositoryForksSuccess>
    ) => {
      state.data = action.payload.data;
      state.totalCount = action.payload.totalCount;
      state.isLoading = false;
    },
    getRepositoryForksFailure: () => ({
      ...initialState,
      isError: true,
    }),
  },
});

export { reducer as forksReducer };
export const {
  getRepositoryForksRequest,
  getRepositoryForksSuccess,
  getRepositoryForksFailure,
} = actions;
