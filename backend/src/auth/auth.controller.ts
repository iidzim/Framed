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
        // @Body('fullname') fullname: string,
        // @Body('username') username: string,
        // @Body('email') email: string,
        // @Body('password') password: string,
    ): Promise<any> {
        // return this.authService.register(res, fullname, username, email, password);
        return await this.authService.register(res, profileDto);
    }

    @HttpCode(200)
    @Post('login')
    async login(
        @Res({passthrough: true}) res,
        @Body() loginDto: ValidLoginDto,
        // @Body('username') username: string,
        // @Body('password') password: string,
    ) {
        // return this.authService.login(res, username, password);
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
        // @Body('type') type: string,
        // @Body('value') value: string,
    ): Promise<any> {
        // return this.authService.isValid(type, value);
        return await this.authService.isValid(editDto);
    }

}