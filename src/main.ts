import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import bodyParser from 'body-parser';
import express from 'express';
import { join } from 'node:path';
import { AppModule } from './app.module';
import appConfig, { AppConfig } from './config/app/app.config';
import { SwaggerSetupModule } from './swagger/swagger.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json());
  app.use(express.static(join(process.cwd(), 'public')));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  if (process.env.NODE_ENV !== 'production') {
    SwaggerSetupModule.setup(app);
  }

  const logger = new Logger('NestApplication');
  const { port } = app.get<AppConfig>(appConfig.KEY);

  await app.listen(port, () => {
    logger.log(`Nest is listening on port: ${port}`);
  });
}

bootstrap().catch(console.error);
