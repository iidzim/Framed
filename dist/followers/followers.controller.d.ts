import { UsersService } from '../users/users.service';
import { FollowersService } from './followers.service';
export declare class FollowersController {
    private readonly followersService;
    private readonly usersService;
    constructor(followersService: FollowersService, usersService: UsersService);
    getMyFollowers(req: any): Promise<any>;
    getFollowers(req: any, id: number): Promise<any>;
    getFollowing(req: any): Promise<any>;
    getUserFollowing(req: any, id: number): Promise<any>;
    follow(req: any, id: number): Promise<any>;
    unfollow(req: any, id: number): Promise<any>;
}
