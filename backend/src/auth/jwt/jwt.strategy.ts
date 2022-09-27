import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService, UserRepository } from "../../users";
import { JwtPayload } from "./jwtPayload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-access-token') {
	constructor(
		// private readonly userService: UsersService,
		private readonly userRepository: UserRepository,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: any) => {
					console.log('******** '+req.user);
					let data = req.cookies["connect_sid"];
					if (!data) {
						return null;
					}
					return data.token;
				},
			]),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
			expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
		});
	}

	async validate(payload: JwtPayload): Promise<any> {
		console.log('++++++ '+payload);
		const { id } = payload;
		console.log('id = ' + id);
		// let user;
		try {
			// user = await this.userService.getUser(id);
			const user = await this.userRepository.findOne({id});
			return user;
		} catch (error) {
			console.log('---> '+error);
			return null;
		}
	}
}

/*
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(PlayerRepository)
        private playerRepository: PlayerRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'pingpong',
        });
    }

    async validate(payload: JwtPayload): Promise<Player> {
        const { username } = payload;
        const user = await this.playerRepository.findOne({username});
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
Footer

*/