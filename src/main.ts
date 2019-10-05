import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import 'dotenv/config';
import { Logger } from '@nestjs/common';

const PORT = process.env.PORT || 8081;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/v1/api');
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Ideas App')
    .setDescription('Ideas App with Users Authentication')
    .setVersion('1.0')
    .addTag('Ideas')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('v1/docs', app, document);

  await app.listen(PORT);
  Logger.log(`Server running on http://localhost:${PORT}`, 'Bootstrap');
}
bootstrap();
