import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../users/user.repository';
import { UsersService } from '../users/users.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserRepository,
            PostRepository,
        ]),
    ],
    controllers: [PostController],
    providers: [
        PostService,
        UsersService,
    ],
    exports: [PostService],
})
export class PostModule {}
