import { Injectable, Res } from "@nestjs/common";
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from "../users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

	constructor(
		private readonly userService: UsersService,
	) {
		super({ usernameField: 'username' });
	}

	async validate(@Res() res, username: string, password: string): Promise<any> {
		return await this.userService.login(res, username, password);
	}
}