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
	// console.log('\e[0;34m',
	// 	"main >> " +
	// 	process.env.FRONTEND_HOST +
	// 	" " +
	// 	process.env.HOST +
	// 	" " +
	// 	process.env.DB_USER +
	// 	" " +
	// 	process.env.DB_PASSWORD +
	// 	" " +
	// 	process.env.DB_NAME +
	// 	" " +
	// 	process.env.JWT_SECRET
	// );
	app.enableCors({origin: process.env.FRONTEND_HOST, credentials: true});
	await app.listen(process.env.PORT || 3001);
	// app.enableCors({ origin: process.env.FRONTEND_HOST, credentials: true });
	// await app.listen(process.env.PORT || 3030);
}
bootstrap();


//& check for file extension in uploads (avatar - post)
// maybe add instagram/unsplash authentication later


//+ currentlly working on:

//! add AuthGuard to protect endpoint ... added √ but need more testing
//td: class-transformer -> post.entity ??????? still confused if i need one or not
//= add customizer decorator to get user from token ......... getUser() return token but didnt check if token is valid !!
//? implement refresh token
	//- expiresIn -> When the browsing session ends ?? even if i set it to 1 minute it still valid after 1 minute
// * email verification
//& add pagination
//td: unit testing
//= build chatbot



// use database index -> Indexes help in filtering data faster as the data is stored in a predefined order based on some key columns.
// learn more about graphql - redis
// https://virtualgallery.w3spaces.com/ 
// bash-color https://gist.github.com/iamnewton/8754917
// express > https://dev.to/franciscomendes10866/testing-express-api-with-jest-and-supertest-3gf