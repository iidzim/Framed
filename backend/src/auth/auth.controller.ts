import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
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
        @Body('fullname') fullname: string,
        @Body('username') username: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ): Promise<any> {
        return this.authService.register(res, fullname, username, email, password);
    }

    @HttpCode(200)
    @Post('login')
    async login(
        @Res({passthrough: true}) res,
        @Body('username') username: string,
        @Body('password') password: string,
    ) {
        return this.authService.login(res, username, password);
    }

    @UseGuards(JwtStrategy)
    @Get('logout')
    async logout(@Req() req, @Res({passthrough: true}) res) {
        return this.authService.logout(req, res);
    }

    @HttpCode(200)
    @Post('check')
    async isValid(
        @Body('type') type: string,
        @Body('value') value: string,
    ): Promise<any> {
        return this.authService.isValid(type, value);
    }

}