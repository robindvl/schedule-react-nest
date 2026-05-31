import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '../src/app.module';

async function generateOpenApi() {
  const app = await NestFactory.create(AppModule, { logger: false });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Schedule API')
    .setDescription('Trainings and tournaments schedule API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const outputPath = resolve(__dirname, '../openapi.json');

  writeFileSync(outputPath, JSON.stringify(document, null, 2));
  await app.close();

  console.log(`OpenAPI spec written to ${outputPath}`);
}

void generateOpenApi();
