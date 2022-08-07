import { Injectable, Req, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { JwtPayload } from "./jwtPayload.interface";
import * as dotenv from "dotenv";
dotenv.config({ path: `.env` }) 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: any) => {
                    let data = req.cookies["connect_sid"];
                    if (!data) {
                        return null;
                    }
                    return data.token;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: JwtPayload): Promise<any> {
        const { id } = payload;
        const user = await this.userService.getUser(id);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}