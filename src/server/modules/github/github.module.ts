import { HttpModule, Module } from '@nestjs/common';

import { GithubController } from './github.controller';
import { GithubService } from './github.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://api.github.com/',
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    }),
  ],
  controllers: [GithubController],
  providers: [GithubService],
  exports: [GithubService],
})
export class GithubModule {}
