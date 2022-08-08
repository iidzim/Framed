import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
// import * as dotenv from "dotenv";
// dotenv.config({ path: `.env` }) 

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
	console.log('main >> ' + process.env.FRONTEND_HOST + ' ' + process.env.HOST + ' ' + process.env.DB_USER + ' ' + process.env.DB_PASSWORD + ' ' + process.env.DB_NAME + ' ' + process.env.DB_JWT_SECRET);
	app.enableCors({origin: process.env.FRONTEND_HOST, credentials: true});
	await app.listen(3001);
}
bootstrap();


//td: script for git push √
//td: git branching and merging √
	//? https://www.youtube.com/watch?v=Q1kHG842HoI&list=LL&index=14&t=2259s&ab_channel=SuperSimpleDev

//+ add swagger √
//+ create jwt for logged in user √
//+ add AuthGuard to protect endpoint
//+ maybe add instagram/unsplash authentication later

//& check for file extension in uploads (avatar - post)

//* authguard for checking if user has access to this endpoint(eg: admin)