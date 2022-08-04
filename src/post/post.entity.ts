import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "../users/user.entity";

@Entity('post')
export class Post extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column({ nullable: true, length: 500 })
    description: string;

    @ManyToOne(type => Profile, user => user.posts)
    createdBy: Profile;

    @Column()
    createdAt: Date;

    @Column()
    catagory: string;

    @Column()
    likes: number;
}