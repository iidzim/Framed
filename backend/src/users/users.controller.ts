import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Request, Express } from "express";
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { FollowersService } from '../followers/followers.service';
import { PostService } from '../post/post.service';
import * as fs  from "fs";
import { EditProfileDto } from './dto-users/edit-profile.dto';
import { Profile } from './user.entity';

@Controller()
//td: add AuthGuard to protect this endpoint
export class UsersController {
	constructor(
	   private readonly usersService: UsersService,
	   private readonly followerService: FollowersService,
	   private readonly postService: PostService,
	) {}

	@Get('profile')
	async getMyProfile(@Req() req: Request): Promise<any> {
		// console.log(req);
		const user_token = await this.usersService.verifyToken(req.cookies.connect_sid);
		const user = await this.usersService.getUser(user_token.id);
		console.log('user_token: ' + user.fullname);
		const following = await this.followerService.getFollowing(user);
		const followers = await this.followerService.getFollowers(user.id);
		const posts = await this.postService.getUserPosts(user);
		const profile = {
			"user": user,
			"following": following,
			"followers": followers,
			"posts": posts,
		}
		return profile;
	}

	@Get('profile/:id')
	async getUserProfile(
		@Req() req: Request,
		@Param('id', ParseIntPipe) id: number,
	): Promise<any> {
		const user = await this.usersService.getUser(id);
		const following = await this.followerService.getFollowing(user);
		const followers = await this.followerService.getFollowers(user.id);
		const posts = await this.postService.getUserPosts(user);
		const profile = {
			"user": user,
			"following": following,
			"followers": followers,
			"posts": posts,
		}
		return profile;
	}

	@HttpCode(200)
	@Post('edit')
	@UseInterceptors(FileInterceptor('avatar'))
	async editUsername(
		@Req() req: Request,
		@Body() editDto : EditProfileDto,
		@UploadedFile() avatar: Express.Multer.File,
	): Promise<Profile> {
		const user_token = await this.usersService.verifyToken(req.cookies.connect_sid);
		const user = await this.usersService.getUser(user_token.id);
		const { fullname, username, old_password, new_password, fileName } = editDto;
		if (username != null || user.username !== username) {
			await this.usersService.updateUsername(user, username);
		}
		if (fullname != null || user.fullname !== fullname) {
		    await this.usersService.updateFullName(user.id, fullname);
		}
		if (old_password != null && new_password != null) {
		    await this.usersService.updatePassword(user.username, old_password, new_password);
		}
		if (fileName != null) {
			const avatarPath = process.cwd() + '/public/avatar/' + fileName;
			fs.writeFileSync(avatarPath, avatar.buffer);
		    await this.usersService.updateAvatar(user.id, fileName);
		}
		return user;
	}

	@HttpCode(200)
    @Post('isValid')
    async isValid(
		@Body() editDto: EditProfileDto,
    ): Promise<any> {
        return this.usersService.isValid(editDto);
    }

}
