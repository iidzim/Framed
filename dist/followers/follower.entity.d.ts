import { BaseEntity } from "typeorm";
import { Profile } from "../users/user.entity";
export declare class Follower extends BaseEntity {
    id: number;
    receiver: number;
    sender: Profile;
}
