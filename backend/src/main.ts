import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('NestJS API')
		.setDescription('The NestJS API description')
		.setVersion('1.0')
		.addTag('api')
		.build();
	
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	app.use(cookieParser());
	app.enableCors({origin: "http://localhost:", credentials: true});
	await app.listen(3001);
}
bootstrap();


//td: script for git push √
//td: git branching and merging √
	//? https://www.youtube.com/watch?v=Q1kHG842HoI&list=LL&index=14&t=2259s&ab_channel=SuperSimpleDev

//+ add swagger √
//+ add middleware & AuthGuard to protect this endpoint
//+ create jwt for logged in user
//+ maybe add google authentication later
//+ enable/disable two factor authentication

//& check for file extension in uploads (avatar - post)
