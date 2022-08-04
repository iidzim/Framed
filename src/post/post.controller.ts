import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PostCategory } from './category.enum';
import { post } from './post.entity';
import { PostService } from './post.service';
import { PostType } from './post_type.enum';
// import

@Controller()
//td: add AuthGuard to protect this endpoint
export class PostController {

	constructor(
		private readonly postService: PostService,
		private readonly usersService: UsersService,
	) {}

	@Get('posts') //& to be removed after testing
	async getPosts(@Req() req): Promise<post[]> {
		return await this.postService.getPosts();
	}

	@Get('posts/:id')
	async getPostById(
		@Req() req,
		@Param('id', ParseIntPipe) post_id: number,
	): Promise<post> {
		return await this.postService.getPostById(post_id);
	}

	@Get('explore/:category')
	async getPostByCategory(
		@Req() req,
		@Param('category') category: PostCategory,
	): Promise<post[]> {
		return await this.postService.getPostByCategory(category);
	}

	@Get('posts')
	async getUserPosts(
		@Req() req,
	): Promise<post[]> {
		return await this.postService.getUserPosts(req.user);
	}

	@Post('create')
	async createPost(
		@Req() req,
		@Body('content') content: string,
		@Body('type') type: PostType,
		@Body('description') description: string,
		@Body('category') category: PostCategory
	): Promise<post> {
		return await this.postService.createPost(req.user, content, type, description, category);
	}

	@Patch('update/:id')
	async editPost(
		@Req() req,
		@Body('post_id', ParseIntPipe) post_id: number,
		description: string,
	): Promise<post> {
		//td: check if the logged in user is the post owner before edit
		return await this.postService.editPost(req.user, post_id ,description);
	}

	@Delete('remove/:id')
	async deletePost(
		@Req() req,
		@Param('id', ParseIntPipe) post_id: number
	){
		//td: check if the logged in user is the post owner before deletion
		return await this.postService.deletePost(req.user, post_id)
	}
}
