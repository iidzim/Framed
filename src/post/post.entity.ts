import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "../users/user.entity";
import { PostType } from "./post_type.enum";

@Entity('post')
export class post extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    type: PostType;

    @Column({ nullable: true, length: 500 })
    description: string;

    @ManyToOne(type => Profile, user => user.posts)
    createdBy: Profile;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    category: string;

    @Column()
    likes: number;
}