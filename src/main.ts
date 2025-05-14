import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import appConfig, { AppConfig } from './config/app/app.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('NestApplication');
  const { port } = app.get<AppConfig>(appConfig.KEY);

  await app.listen(port, () => {
    logger.log(`Nest is listening on port: ${port}`);
  });
}

bootstrap().catch(console.error);
