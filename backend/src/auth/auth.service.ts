import { Injectable, Req, Res } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserStatus } from '../users/UserStatus.enum';
import { CreateProfileDto } from '../users/dto-users/create-profile.dto';
import { ValidLoginDto } from '../users/dto-users/login-profile.dto';
import { EditProfileDto } from '../users/dto-users/edit-profile.dto';
// const logout = require('express-passport-logout');
import { logout } from 'express-passport-logout';
// import * as dotenv from "dotenv";
// dotenv.config({ path: `.env` });

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
	) {}

	async register(
		@Res({passthrough: true}) res,
		profileDto: CreateProfileDto
	): Promise<any> {
		return await this.userService.register(res, profileDto);
	}

	async login(
		@Res({passthrough: true}) res,
		loginDto: ValidLoginDto
	): Promise<any> {
		return await this.userService.login(res, loginDto);
	}

	async logout(@Req() req, @Res({passthrough: true}) res): Promise<any> {

		const user_token = await this.userService.verifyToken(req.cookies.connect_sid);
		await this.userService.updateStatus(user_token.id, UserStatus.OFFLINE);
		await logout();
		// await res.clearCookie('connect_sid', {domain: process.env.FRONTEND_HOST, path: '/'});
		await res.clearCookie('connect_sid', {domain: 'http://localhost:3000/', path: '/'});
		console.log('logout');
		//? redirection in frontend to signin page
	}

	async isValid(editDto: EditProfileDto): Promise<any> {
		return await this.userService.isValid(editDto);
	}

}
