import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UsersService } from "./users.service";

export const getUser = createParamDecorator(

    (userService: UsersService, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user_token = request.cookies.connect_sid.toString();
        // this.userService.verifyToken(user_token);
        console.log('user_token >>>> '+ user_token);
        const user = userService.verifyToken(user_token);
        console.log('user >>>> '+ user);
        return user;
    }
)