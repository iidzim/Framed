import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Express } from "express";
import * as fs  from "fs";
import { FollowersService } from '../followers';
import { CustomAuthguard } from '../auth/guards';
import { PostService } from '../post';
import { EditProfileDto } from './dto';
import { getUser } from './decorator';
import { Profile } from './user.entity';
import { UsersService } from './users.service';

@Controller()
// @UseGuards(CustomAuthguard)
// add AuthGuard to protect this endpoint
export class UsersController {
	constructor(
	   private readonly usersService: UsersService,
	   private readonly followerService: FollowersService,
	   private readonly postService: PostService,
	) {}

	@Get('profile')
	async getMyProfile(
		@Req() req,
		// @getUser() token,
	): Promise<any> {
		// console.log(req);
		const user_token = await this.usersService.verifyAccessToken(req.cookies.connect_sid);
		// const user_token = await this.usersService.verifyAccessToken(token);
		const user = await this.usersService.getUser(user_token.id);
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
		@Req() req,
		@Body() editDto : EditProfileDto,
		@UploadedFile() avatar: Express.Multer.File,
	): Promise<Profile> {
		const user_token = await this.usersService.verifyAccessToken(req.cookies.connect_sid);
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
		} //! remove
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
