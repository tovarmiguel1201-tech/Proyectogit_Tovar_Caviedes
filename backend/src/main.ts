
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Permitir la conexión desde la página web
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
