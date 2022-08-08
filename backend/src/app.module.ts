import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { FollowersModule } from './followers/followers.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
