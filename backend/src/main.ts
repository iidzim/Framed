import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

//? new branch created successfully

//td: script for git push
//td: git branching and merging
	//? https://www.youtube.com/watch?v=Q1kHG842HoI&list=LL&index=14&t=2259s&ab_channel=SuperSimpleDev
		//= second commit to branch

//+ add middleware & AuthGuard to protect this endpoint
//+ create jwt for logged in user
//+ maybe add google authentication later
//+ enable/disable two factor authentication