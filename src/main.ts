import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const GLOBAL_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  const NODE_ENV = configService.get('NODE_ENV');

  const options = new DocumentBuilder()
    .setTitle('Tappd Backend')
    .setDescription('API for Tappd Backend')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.listen(PORT, () => {
    Logger.log(
      `Server listening on http://localhost:${PORT}/${GLOBAL_PREFIX} in ${NODE_ENV} mode`,
    );
  });
}

bootstrap();
