export type TGetForksPayload = {
  owner: string;
  repository: string;
  take?: number;
  page?: number;
};

export type TRepositoryOwner = {
  login: string;
  avatar_url: string;
};

export type TRepositoryFork = {
  id: number;
  full_name: string;
  owner: TRepositoryOwner;
  html_url: string;
  stargazers_count: number;
};

export type TGetRepositoryForksSuccess = {
  data: TRepositoryFork[];
  totalCount: number;
};

export type TRepositoryForksState = {
  data: TRepositoryFork[];
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
};
