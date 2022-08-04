import { BaseEntity } from "typeorm";
import { Profile } from "../users/user.entity";
import { PostType } from "./post_type.enum";
export declare class post extends BaseEntity {
    id: number;
    content: string;
    type: PostType;
    description: string;
    createdBy: Profile;
    createdAt: Date;
    category: string;
    likes: number;
}
