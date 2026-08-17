import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve campos no definidos en el DTO
      forbidNonWhitelisted: true, // lanza 400 si envian propiedades extras
      transform: true // convierte payload a isntancias del DTO
    })
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
