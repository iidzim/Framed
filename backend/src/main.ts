import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

//? new branch created successfully

//+ add middleware & AuthGuard to protect this endpoint
//+ create jwt for logged in user
//+ maybe add google authentication later
//+ enable/disable two factor authentication