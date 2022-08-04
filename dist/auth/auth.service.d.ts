import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UsersService);
    register(fullname: string, username: string, email: string, password: string): Promise<any>;
    login(username: string, password: string): Promise<any>;
    logout(req: any): Promise<any>;
}
