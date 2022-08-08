import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../users/user.repository';
import { UsersService } from '../users/users.service';
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
