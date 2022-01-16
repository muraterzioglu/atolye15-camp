import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  /*
   * TODO: Remove underscore from queries and mutations
   *    -> Search & Filter?
   *    -> Fix Naming of Entities and DTO
   */
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
