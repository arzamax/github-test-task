import { HttpService, Injectable } from '@nestjs/common';

import { PaginationModel } from 'server/decorators/pagination.decorator';

import { GetRepositoryDto } from './dto';

@Injectable()
export class GithubService {
  constructor(private httpService: HttpService) {}

  async getRepository(
    getRepositoryDto: GetRepositoryDto,
  ) {
    const { owner, repository } = getRepositoryDto;

    const { data } = await this.httpService
      .get(`/repos/${owner}/${repository}`)
      .toPromise();

    return data;
  }

  async getRepositoryForks(
    getRepositoryDto: GetRepositoryDto,
    pagination: PaginationModel
  ) {
    const { owner, repository } = getRepositoryDto;
    const { take, page } = pagination;

    const { data } = await this.httpService
      .get(`/repos/${owner}/${repository}/forks`, {
        params: {
          per_page: take,
          page,
        },
      })
      .toPromise();

    return data;
  }
}
