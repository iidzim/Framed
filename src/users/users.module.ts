import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowerRepository } from '../followers/follower.repository';
import { FollowersModule } from '../followers/followers.module';
import { PostModule } from '../post/post.module';
import { PostRepository } from '../post/post.repository';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserRepository,
            FollowerRepository,
            PostRepository,
        ]),
        FollowersModule,
        PostModule,
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
