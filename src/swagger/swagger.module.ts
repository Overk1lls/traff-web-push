import { INestApplication, Module } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Module({})
export class SwaggerSetupModule {
  static setup(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Traff Web Push API')
      .setDescription('API Documentation for the Traff Web Push service')
      .setVersion('1.0')
      .setContact(
        'Yurii',
        'https://github.com/Overk1lls',
        'ov3rfordream@gmail.com',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);
  }
}
