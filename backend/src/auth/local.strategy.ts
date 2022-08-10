// import { Injectable, Res, UnauthorizedException } from "@nestjs/common";
// import { Strategy } from 'passport-local';
// import { PassportStrategy } from '@nestjs/passport';
// import { UsersService } from "../users/users.service";

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {

// 	constructor(
// 		private readonly userService: UsersService,
// 	) {
// 		super({ 
// 			usernameField: 'username' ,
// 			passwordField: 'password' ,
// 		});
// 	}

// 	async validate(username: string, password: string): Promise<any> {
// 		let valid_user;
// 		try{
// 			valid_user = await this.userService.validateUser(username, password);
// 		} catch (error) {
// 			throw new UnauthorizedException();
// 		}
// 		// generate token for logged in user
// 		const token = await this.userService.GetToken(valid_user.id);
// 		return token;
// 	}
// }