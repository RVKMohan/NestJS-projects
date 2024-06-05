import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(8100);

  const config = new DocumentBuilder()
    .setTitle('Users Data')
    .setDescription('The Users API description')
    .setVersion('1.0')
    .addTag('Users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.enableCors({
  //   origin: 'http://localhost:3000',
  // });
  // await app.listen(8100);

  app.enableCors();
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}/`);
}
bootstrap();
