import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../users/user.entity';
import { PostCategory } from './category.enum';
import { post } from './post.entity';
import { PostRepository } from './post.repository';
import { PostType } from './post_type.enum';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(PostRepository)
        private readonly postRepository: PostRepository,
    ) {}

    async getPosts(): Promise<post[]> {
        return await this.postRepository.find();
    }

    async getPostByCategory(category: PostCategory): Promise<post[]> {
        return await this.postRepository.find({ where : {category: category} });
    }

    async getUserPosts(user: Profile): Promise<post[]> {
        return await this.postRepository.find({ where: {createdBy: user} });
    }

    async getPostById(post_id: number): Promise<post> {
        return await this.postRepository.findOne({ where: {id: post_id} });
    }

    async createPost(@Req() req, content: string, type: PostType, description: string, category: PostCategory): Promise<post> {
        return await this.postRepository.createPost(req.user, content, type, description, category);
    }

    async editPost(@Req() req, post_id: number, description: string): Promise<post> {
        return await this.postRepository.editPost(req.user, post_id, description);
    }

    async deletePost(@Req() req, post_id: number){
        const owner = req.user;
        await this.postRepository.delete({ id: post_id, createdBy: owner });
    }
}
