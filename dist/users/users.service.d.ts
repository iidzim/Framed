import { Profile } from './user.entity';
import { UserRepository } from './user.repository';
import { UserStatus } from './UserStatus.enum';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    register(fullname: string, username: string, email: string, password: string): Promise<any>;
    login(username: string, password: string): Promise<any>;
    getUser(id: number): Promise<Profile>;
    updateStatus(id: number, status: UserStatus): Promise<void>;
    updateFullName(id: number, fullname: string): Promise<void>;
    updateUsername(id: number, username: string): Promise<Profile>;
    updateAvatar(id: number, avatar: string): Promise<void>;
    updatePassword(username: string, old_password: string, new_password: string): Promise<void>;
}
