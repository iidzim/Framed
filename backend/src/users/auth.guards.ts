import { BadRequestException, CanActivate, ExecutionContext, Req } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export class AuthenticationGuard implements CanActivate {
	constructor(
	    private readonly jwtService: JwtService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = await context.switchToHttp().getRequest();
		// for (const [i, j] of Object.entries(request)) {
		//     console.log(i, j);
		// }
		if (request.cookies.connect_sid != null) {
		    // const user_token = await this.userService.verifyToken(request.cookies.connect_sid.toString());
		    let user_token;
		    const token = request.cookies.connect_sid;
		    console.log('--------------- '+ token);
		    try{
		        user_token = await this.jwtService.verify(token.toString(), {secret: 'unsplash'});
		        console.log('sdsdfsdfsfsd');
		        if (typeof user_token === 'object' && 'id' in user_token) {
		            console.log('validdddd '+user_token.id);
			    	return user_token;
			    }
			    throw new BadRequestException('Invalid token');
		    } catch (error) {
		        console.log('error >>>> '+error);
		        throw new BadRequestException('Invalid token');
		    }
			return true;
		}
		else {
		    console.log('no cookies');
			return true;
		}
	}
}