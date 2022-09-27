import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../../users/users.service";
import { JwtPayload } from "./jwtPayload.interface";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
	constructor(
		private readonly userService: UsersService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: any) => {
					let data = req.cookies["connect_ref"];
					if (!data) {
						return null;
					}
					return data.token;
				},
			]),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
			expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
		});
	}

	async validate(payload: JwtPayload): Promise<any> {
		const { id } = payload;
		let user;
		try {
			user = await this.userService.getUser(id);
		} catch (error) {
			console.log(error);
			return null;
		}
		return user;
	}
}
