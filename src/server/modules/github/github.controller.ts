import { Controller, Get, Param } from '@nestjs/common';

import { Pagination, PaginationModel } from 'server/decorators';

import { GithubService } from './github.service';
import { GetRepositoryDto } from './dto';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('/repos/:owner/:repository')
  getRepository(
    @Param() getRepositoryDto: GetRepositoryDto,
  ) {
    return this.githubService.getRepository(getRepositoryDto);
  }

  @Get('/repos/:owner/:repository/forks')
  getRepositoryForks(
    @Param() getRepositoryDto: GetRepositoryDto,
    @Pagination() pagination: PaginationModel
  ) {
    return this.githubService.getRepositoryForks(
      getRepositoryDto,
      pagination
    );
  }
}
