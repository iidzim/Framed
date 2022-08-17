import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository, UsersService } from '../users';
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
        JwtService,
    ],
    exports: [PostService],
})
export class PostModule {}
