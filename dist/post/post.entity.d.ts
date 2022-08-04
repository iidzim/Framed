import { BaseEntity } from "typeorm";
import { Profile } from "../users/user.entity";
export declare class Post extends BaseEntity {
    id: number;
    content: string;
    description: string;
    createdBy: Profile;
    createdAt: Date;
    catagory: string;
    likes: number;
}
