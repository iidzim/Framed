import { Injectable, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserStatus } from '../users/UserStatus.enum';
import { JwtPayload } from './jwtPayload.interface';
const logout = require('express-passport-logout');
import * as dotenv from "dotenv";
dotenv.config({ path: `.env` });

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
    ) {}

    async register(@Res({passthrough: true}) res, fullname: string, username: string, email: string, password: string): Promise<any> {
        return await this.userService.register(res, fullname, username, email, password);
    }

    async login(@Res({passthrough: true}) res, username: string, password: string): Promise<any> {
        return await this.userService.login(res, username, password);
    }

    async logout(@Req() req, @Res({passthrough: true}) res): Promise<any> {

        await this.userService.updateStatus(req.user.id, UserStatus.OFFLINE);
        await logout();
		await res.clearCookie('connect_sid', {domain: process.env.FRONTEND_HOST, path: '/'});
        //td: redirection in frontend to signin page
    }

}
