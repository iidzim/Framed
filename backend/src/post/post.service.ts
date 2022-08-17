import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../users/user.entity';
import { PostRepository } from './post.repository';
import { post } from './post.entity';
import { PostCategory } from './enum';
import { CreatePostDto, EditPostDto } from './dto';

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

    async createPost(@Req() req, postDto: CreatePostDto): Promise<post> {
        return await this.postRepository.createPost(req.user, postDto);
    }

    async editPost(@Req() req, editDto: EditPostDto): Promise<post> {
        return await this.postRepository.editPost(req.user, editDto);
    }

    async deletePost(@Req() req, post_id: number): Promise<any> {
        const owner = req.user;
        const post = await this.postRepository.findOne({ where: { id: post_id} });
		if (post.createdBy.id !== owner.id) {
			throw new UnauthorizedException("You are not allowed to edit this post");
		}
        await this.postRepository.delete({ id: post_id, createdBy: owner });
    }
}
