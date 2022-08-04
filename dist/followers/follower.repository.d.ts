import { Repository } from "typeorm";
import { Profile } from "../users/user.entity";
import { Follower } from "./follower.entity";
export declare class FollowerRepository extends Repository<Follower> {
    getFollowers(user: Profile): Promise<Follower[]>;
    getFollowing(user: Profile): Promise<Follower[]>;
    follow(user: Profile, following: Profile): Promise<Follower>;
}
