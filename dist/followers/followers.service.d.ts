import { Profile } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { FollowerRepository } from './follower.repository';
export declare class FollowersService {
    private readonly followerRepository;
    private readonly userService;
    constructor(followerRepository: FollowerRepository, userService: UsersService);
    getFollowers(user: Profile): Promise<any>;
    getFollowing(user: Profile): Promise<any>;
    follow(user: Profile, id: number): Promise<any>;
    unfollow(user: Profile, id: number): Promise<any>;
}
