import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CustomAuthguard, JwtRefreshGuard } from './guards';
import { CreateProfileDto, EditProfileDto, ValidLoginDto } from '../users/dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
	) {}

	@HttpCode(200)
	@Post('register')
	async register(
		@Res({passthrough: true}) res,
		@Body() profileDto :CreateProfileDto,
	): Promise<any> {
		return await this.authService.register(res, profileDto);
	}

	@HttpCode(200)
	@Post('login')
	async login(
		@Res({passthrough: true}) res,
		@Body() loginDto: ValidLoginDto,
	) {
		return await this.authService.login(res, loginDto);
	}

	@HttpCode(200)
	@UseGuards(CustomAuthguard)
	@Get('logout')
	async logout(@Req() req, @Res({passthrough: true}) res) {
		return await this.authService.logout(req, res);
	}

	@HttpCode(200)
	@Post('check')
	async isValid(
		@Body() editDto: EditProfileDto,
	): Promise<any> {
		return await this.authService.isValid(editDto);
	}

	@UseGuards(JwtRefreshGuard)
	@Get('refresh')
	async refresh(
		@Req() req,
		@Res({passthrough: true}) res,
	) {
		const access_token = await this.authService.getJwtAccessToken(req.cookies.connect_fre, req.user.id);
		res.cookie('connect_sid', [access_token], { httpOnly: true });
		return req.user;
	}
}
