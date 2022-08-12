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
	app.enableCors({origin: 'http://localhost:3000', credentials: true});
	await app.listen(3001);
}
bootstrap();


//& check for file extension in uploads (avatar - post)
//td: git branching and merging √
	//? https://www.youtube.com/watch?v=Q1kHG842HoI&list=LL&index=14&t=2259s&ab_channel=SuperSimpleDev

//! add AuthGuard to protect endpoint
	//- authguard for checking if user has access to this endpoint
// maybe add instagram/unsplash authentication later

//td: class-transformer -> post.entity 
//= add customizer decorator to get user from token .........



// learn more about graphql
// add unit tests
