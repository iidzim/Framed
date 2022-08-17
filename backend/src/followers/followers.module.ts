import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository, UsersService } from '../users';
import { FollowerRepository } from './follower.repository';
import { FollowersController } from './followers.controller';
import { FollowersService } from './followers.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserRepository,
            FollowerRepository,
        ]),
    ],
    controllers: [FollowersController],
    providers: [
        FollowersService,
        UsersService,
        JwtService,
    ],
    exports: [FollowersService],
})
export class FollowersModule {}
