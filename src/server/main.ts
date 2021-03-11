import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './modules';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix('/api');

  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('SERVER_PORT', 5000);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(helmet());
  app.use(compression());

  await app.listen(Number(port));
}

bootstrap();
