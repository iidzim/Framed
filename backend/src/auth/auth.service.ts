import { Injectable, Req, Res } from '@nestjs/common';
import { UsersService, UserStatus, CreateProfileDto, ValidLoginDto, EditProfileDto } from '../users';
const logout = require('express-passport-logout');
// import { logout } from 'express-passport-logout';

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

	// async logout(@Req() req, @Res({passthrough: true}) res): Promise<any> {
	async logout(@Req() req, @Res() res): Promise<any> {

		const user_token = await this.userService.verifyAccessToken(req.cookies.connect_sid);
		console.log('>> ' + user_token.username);
		await this.userService.updateStatus(user_token.id, UserStatus.OFFLINE);
		await this.userService.removeRefreshToken(user_token.id);
		await logout();
		await res.clearCookie('connect_sid');
		await res.clearCookie('connect_fre');
		console.log('logout');
		//? redirection in frontend to signin page
		res.redirect('http://localhost:3000');
	}

	async isValid(editDto: EditProfileDto): Promise<any> {
		return await this.userService.isValid(editDto);
	}

	async getJwtAccessToken(id: number): Promise<string> {
		const user = await this.userService.getUser(id);
		return await this.userService.GetAccessToken(user);
	}
}
