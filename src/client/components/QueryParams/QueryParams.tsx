import {
  ComponentType,
  Context,
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { parse, stringify } from 'query-string';

type TQueryParams<
  T extends Record<string, unknown> = Record<string, unknown>
> = {
  defaultParams?: Partial<T>;
  paramsMapper?: {
    [K in keyof Partial<T>]: (
      v: string,
      context?: () => { [K in keyof T]: string }
    ) => void;
  };
  children: (params: T) => ReactNode;
};

type TQueryParamsContext<
  T extends Record<string, unknown> = Record<string, unknown>
> = [T, { set: (params: T) => void; update: (params: Partial<T>) => void }];

const QueryParamsContext = createContext<TQueryParamsContext>([
  {},
  { set: () => {}, update: () => {} },
]);

export const useQueryParamsContext = <
  T extends Record<string, unknown> = Record<string, unknown>
>() =>
  useContext<TQueryParamsContext<T>>(
    (QueryParamsContext as unknown) as Context<TQueryParamsContext<T>>
  );

export const QueryParams = <
  T extends Record<string, unknown> = Record<string, unknown>
>({
  defaultParams,
  paramsMapper,
  children,
}: TQueryParams<T>) => {
  const location = useLocation();
  const history = useHistory();

  const params = useMemo(() => {
    const prevParams = defaultParams || {};
    const result = { ...prevParams, ...parse(location.search) };

    if (paramsMapper) {
      return Object.fromEntries(
        Object.entries(result).map(([key, value]) => {
          const mapper = (paramsMapper as any)[key];
          return [key, mapper ? mapper(value, result) : value];
        })
      );
    }

    return result as T;
  }, [defaultParams, location.search, paramsMapper]);

  const set = useCallback(
    params => {
      history.push({ ...location, search: stringify(params) });
    },
    [history, location]
  );

  const update = useCallback(
    updatedParams => {
      history.push({
        ...location,
        search: stringify({ ...params, ...updatedParams }),
      });
    },
    [history, location, params]
  );

  const context = useMemo<TQueryParamsContext>(
    () => [params, { set, update }],
    [params, set, update]
  );

  return (
    <QueryParamsContext.Provider value={context}>
      {children(params as T)}
    </QueryParamsContext.Provider>
  );
};

export const withQueryParams = <
  T extends Record<string, unknown> = Record<string, unknown>,
  P extends Record<string, unknown> = Record<string, unknown>
>(
  options: Omit<TQueryParams<T>, 'children'>
) => (WrappedComponent: ComponentType<P & T>) => {
  const WrappedWithQueryParams = (props: P) => (
    <QueryParams<T> {...options}>
      {params => <WrappedComponent {...params} {...props} />}
    </QueryParams>
  );

  WrappedWithQueryParams.displayName = 'WrappedWithQueryParams';
  return WrappedWithQueryParams;
};
