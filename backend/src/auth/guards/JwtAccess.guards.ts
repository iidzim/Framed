import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtStrategy } from "../jwt/jwt.strategy";

@Injectable()
export class CustomAuthguard extends AuthGuard('jwt') {

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = await context.switchToHttp().getRequest();
		// for (const [i, j] of Object.entries(request)) {
		//     console.log(i, j);
		// }
		console.log(request);
		if (request.cookies.connect_sid != null) {
			if (JwtStrategy.prototype.validate(request.cookies.connect_sid.toString())) {
				return true;
			}
		}
		return false;
	}
}
