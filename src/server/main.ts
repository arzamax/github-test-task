import express from 'express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import compression from 'compression';
import helmet from 'helmet';
import path from 'path';

import { AppModule } from './modules';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const config = app.get<ConfigService>(ConfigService);
  const environment = config.get('NODE_ENV', 'development');
  const port = config.get('PORT', 5000);

  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(helmet());
  app.use(compression());

  if (environment === 'production') {
    app.use('/', express.static(path.resolve('build')));
  }

  await app.listen(Number(port));
}

bootstrap();
