import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(fullname: string, username: string, email: string, password: string): Promise<any>;
    login(username: string, password: string): Promise<any>;
    logout(req: any): Promise<any>;
}
