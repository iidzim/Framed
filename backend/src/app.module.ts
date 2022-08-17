import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AuthModule } from './auth';
import { UsersModule } from './users';
import { PostModule } from './post';
import { FollowersModule } from './followers';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public'),
		}),
		TypeOrmModule.forRoot(typeOrmConfig),
		ConfigModule.forRoot({ envFilePath: '.env' }),
		UsersModule,
		AuthModule,
		FollowersModule,
		PostModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
