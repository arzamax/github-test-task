import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {
  createStore,
  applyMiddleware,
  compose,
  Middleware,
  combineReducers,
} from 'redux';
import { all, fork } from 'redux-saga/effects';

import { forksReducer, forksSaga, TRepositoryForksState } from './features';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }
}

export type TRootState = {
  repositoryForks: TRepositoryForksState;
};

const rootReducer = combineReducers({
  repositoryForks: forksReducer,
});

function* rootSaga() {
  yield all([fork(forksSaga)]);
}

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeEnhancers(applyMiddleware(...middleware, logger));
  }
  return applyMiddleware(...middleware);
};

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));

sagaMiddleware.run(rootSaga);
