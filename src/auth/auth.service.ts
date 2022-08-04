import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserStatus } from '../users/UserStatus.enum';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
    ) {}

    async register(fullname: string, username: string, email: string, password: string): Promise<any> {
        return await this.userService.register(fullname, username, email, password);
    }

    async login(username: string, password: string): Promise<any> {
        return await this.userService.login(username, password);
    }

    async logout(req): Promise<any> {

        await this.userService.updateStatus(req.user.id, UserStatus.OFFLINE);
        //td: remove token from session
    }
}
