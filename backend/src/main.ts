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
	// 	process.env.JWT_ACCESS_TOKEN_SECRET +
	// 	" " +
	// 	process.env.JWT_ACCESS_TOKEN_EXPIRES_IN	+
	// 	" " +
	// 	process.env.JWT_REFRESH_TOKEN_SECRET +
	// 	" " +
	// 	process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
	// );
	// app.enableCors({origin: 'http://localhost:3000', credentials: true});
	// await app.listen(3001);
	app.enableCors({ origin: process.env.FRONTEND_HOST, credentials: true });
	await app.listen(process.env.PORT || 3030);
}
bootstrap();


//& check for file extension in uploads (avatar - post)
// maybe add instagram/unsplash authentication later
//* git branching and merging √
	//? https://www.youtube.com/watch?v=Q1kHG842HoI&list=LL&index=14&t=2259s&ab_channel=SuperSimpleDev

//+ currentlly working on:

//! add AuthGuard to protect endpoint ... added √ but need more testing
//td: class-transformer -> post.entity ??????? still confused if i need one or not
//= add customizer decorator to get user from token ......... getUser() return token but didnt check if token is valid !!
// * email verification
//? implement refresh token
	//- expiresIn -> When the browsing session ends ?? even if i set it to 1 minute it still valid after 1 minute

// use database index -> Indexes help in filtering data faster as the data is stored in a predefined order based on some key columns.

// add unit tests
// learn more about graphql - redis
// https://virtualgallery.w3spaces.com/ 

//! bash-color https://gist.github.com/iamnewton/8754917