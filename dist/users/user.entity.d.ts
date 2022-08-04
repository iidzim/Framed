import { BaseEntity } from "typeorm";
import { UserStatus } from "./UserStatus.enum";
import { Follower } from "../followers/follower.entity";
import { post } from "../post/post.entity";
export declare class Profile extends BaseEntity {
    id: number;
    fullname: string;
    username: string;
    email: string;
    avatar: string;
    status: UserStatus;
    salt: string;
    password: string;
    two_fa: boolean;
    two_fa_secret: string;
    senders: Follower[];
    posts: post[];
    validatePassword(password: string): Promise<boolean>;
}
