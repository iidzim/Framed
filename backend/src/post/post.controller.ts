import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs  from "fs";

import { post } from './post.entity';
import { PostService } from './post.service';
import { UsersService } from '../users';
import { PostCategory, ContentType } from './enum';
import { CreatePostDto, EditPostDto } from './dto';
import { CustomAuthguard } from '../auth/guards';

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
	
	@UseGuards(CustomAuthguard)
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

	@UseGuards(CustomAuthguard)
	@Get('posts')
	async getUserPosts(
		@Req() req,
	): Promise<post[]> {
		return await this.postService.getUserPosts(req.user);
	}

	@UseGuards(CustomAuthguard)
	@HttpCode(200)
	@Post('posts/create')
	@UseInterceptors(FileInterceptor('image'))
	async createPost(
		@Req() req,
		@UploadedFile() image: Express.Multer.File,
		@Body() postDto: CreatePostDto
	): Promise<post> {
		const { content, type } = postDto;
		if (type == ContentType.IMAGE) {
			const postPath = process.cwd() + '/public/uploads/' + content;
			fs.writeFileSync(postPath, image.buffer);
		}
		return await this.postService.createPost(req.user, postDto);
	}

//& only post owner can see post options (edit / delete)
//& check if the logged in user is the post owner before allowing edit / delete

	@UseGuards(CustomAuthguard)
	@Patch('update/:id')
	async editPost(
		@Req() req,
		@Body() editDto: EditPostDto,
	): Promise<post> {
		const user_token = await this.usersService.verifyAccessToken(req.cookies.connect_sid);
		const user = await this.usersService.getUser(user_token.id);
		return await this.postService.editPost(user, editDto);
	}

	@UseGuards(CustomAuthguard)
	@Delete('remove/:id')
	async deletePost(
		@Req() req,
		@Param('id', ParseIntPipe) post_id: number
	): Promise<any> {
		const user_token = await this.usersService.verifyAccessToken(req.cookies.connect_sid);
		const user = await this.usersService.getUser(user_token.id);
		return await this.postService.deletePost(user, post_id)
	}
}
