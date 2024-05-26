import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import OpenAI from 'openai';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);



  //Todos los dominios van a poder hacer peticions cors aca puedo hacer todas las configuracioens necesarias
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true
    })
  );


  await app.listen(3000);



}
bootstrap();
