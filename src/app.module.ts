import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { PostModule } from './post/post.module';
import { FollowersController } from './followers/followers.controller';
import { FollowersModule } from './followers/followers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    // ConfigModule.forRoot({ envFilePath: '.env' }),
    AuthModule,
    UsersModule,
    PostModule,
    FollowersModule,
  ],
  controllers: [FollowersController],
  providers: [],
})
export class AppModule {}
