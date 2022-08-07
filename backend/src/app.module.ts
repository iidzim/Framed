import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { FollowersModule } from './followers/followers.module';

@Module({
	imports: [
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
