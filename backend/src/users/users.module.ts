import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowerRepository } from '../followers/follower.repository';
import { FollowersModule } from '../followers/followers.module';
import { PostModule } from '../post/post.module';
import { PostRepository } from '../post/post.repository';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import * as dotenv from "dotenv";
dotenv.config({ path: `.env` }) 

@Module({
    imports: [
        PostModule,
        FollowersModule,
        TypeOrmModule.forFeature([
            UserRepository,
            FollowerRepository,
            PostRepository,
        ]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            // secret: 'unsplash',
            signOptions: {
              expiresIn: '1d',
            },
        }),
    ],
    controllers: [UsersController],
    providers: [UsersService, JwtService],
    exports: [UsersService, JwtService],
})
export class UsersModule {}
