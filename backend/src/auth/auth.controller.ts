import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('register')
    async register(
        @Body('fullname') fullname: string,
        @Body('username') username: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ): Promise<any> {
        return this.authService.register(fullname, username, email, password);
    }

    @Post('login')
    async login(
        @Body('username') username: string,
        @Body('password') password: string,
    ) {
        return this.authService.login(username, password);
    }

    @Get('logout')
    async logout(@Req() req) {
        return this.authService.logout(req);
    }

}