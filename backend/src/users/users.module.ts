import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowerRepository, FollowersModule } from '../followers';
import { PostModule, PostRepository } from '../post';
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
            secret: process.env.JWT_ACCESS_TOKEN_SECRET,
            signOptions: {
              expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
            },
        }),
    ],
    controllers: [UsersController],
    providers: [UsersService, JwtService],
    exports: [UsersService, JwtService],
})
export class UsersModule {}
