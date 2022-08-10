import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CreateProfileDto } from '../users/dto-users/create-profile.dto';
import { EditProfileDto } from '../users/dto-users/edit-profile.dto';
import { ValidLoginDto } from '../users/dto-users/login-profile.dto';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
// import { localAuthenticationGuard } from './localAuthentication.guard';

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

    @UseGuards(JwtStrategy)
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

}