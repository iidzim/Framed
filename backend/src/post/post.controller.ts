import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { post } from './post.entity';
import { PostCategory } from './category.enum';
import { PostService } from './post.service';
import { PostType } from './post_type.enum';
import * as fs  from "fs";
import { UsersService } from '../users/users.service';

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
		if (category != null)
			return await this.postService.getPostByCategory(category);
		return await this.postService.getPosts();
	}

	@Get('posts')
	async getUserPosts(
		@Req() req,
	): Promise<post[]> {
		return await this.postService.getUserPosts(req.user);
	}

	@HttpCode(200)
	@Post('create')
	@UseInterceptors(FileInterceptor('image'))
	async createPost(
		@Req() req,
		@Body('content') content: string,
		@UploadedFile() image: Express.Multer.File,
		@Body('type') type: PostType,
		@Body('description') description: string,
		@Body('category') category: PostCategory
	): Promise<post> {
		if (type == PostType.IMAGE) {
			const postPath = process.cwd() + '/public/uploads/' + content;
			fs.writeFileSync(postPath, image.buffer);
		}
		return await this.postService.createPost(req.user, content, type, description, category);
	}

//& only post owner can see post options (edit / delete)

	@Patch('update/:id')
	async editPost(
		@Req() req,
		@Body('post_id', ParseIntPipe) post_id: number,
		description: string,
	): Promise<post> {
		//td: check if the logged in user is the post owner before edit //& to be removed after testing
		const user_token = await this.usersService.verifyToken(req.cookies.connect_sid); //
		const user = await this.usersService.getUser(user_token.id); //
		const post = await this.postService.getPostById(post_id); //
		if (user !== post.createdBy) { //
			throw new Error('You are not authorized to edit this post'); //
		} //
		return await this.postService.editPost(user, post_id ,description);
	}

	@Delete('remove/:id')
	async deletePost(
		@Req() req,
		@Param('id', ParseIntPipe) post_id: number
	){
		//td: check if the logged in user is the post owner before deletion //& to be removed after testing
		const user_token = await this.usersService.verifyToken(req.cookies.connect_sid); //
		const user = await this.usersService.getUser(user_token.id); //
		const post = await this.postService.getPostById(post_id); //
		if (user !== post.createdBy) { //
			throw new Error('You are not authorized to delete this post'); //
		} //
		return await this.postService.deletePost(req.user, post_id)
	}
}
