import { Injectable, Req, Res } from '@nestjs/common';
import { UsersService, UserStatus, CreateProfileDto, ValidLoginDto, EditProfileDto, Profile } from '../users';
import { Request, Response } from 'express';
const logout = require('express-passport-logout');

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
	) {}

	async register(
		@Res({passthrough: true}) res: Response,
		profileDto: CreateProfileDto,
	): Promise<Profile> {
		return await this.userService.register(res, profileDto);
	}

	async login(
		@Res({passthrough: true}) res,
		loginDto: ValidLoginDto,
	): Promise<Profile> {
		return await this.userService.login(res, loginDto);
	}

	// async logout(@Req() req, @Res({passthrough: true}) res): Promise<any> {
	async logout(
		@Req() req: Request,
		@Res() res: Response,
	): Promise<any> {

		const user_token = await this.userService.verifyAccessToken(req.cookies.connect_sid);
		console.log('>> ' + user_token.username);
		await this.userService.updateStatus(user_token.id, UserStatus.OFFLINE);
		await this.userService.removeRefreshToken(user_token.id);
		await logout();
		await res.clearCookie('connect_sid');
		await res.clearCookie('connect_ref');
		console.log('logout');
		//? redirection in frontend to signin page
		res.redirect('http://localhost:3000');
	}

	async isValid(editDto: EditProfileDto): Promise<any> {
		return await this.userService.isValid(editDto);
	}

	async getJwtAccessToken(
		refresh_token: string,
		id: number
	): Promise<string> {
		const user = await this.userService.verifyRefreshToken(refresh_token, id);
		return await this.userService.GetAccessToken(user);
	}
}
