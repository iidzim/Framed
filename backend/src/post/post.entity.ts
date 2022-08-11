import { Transform } from "class-transformer";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "../users/user.entity";
import { ContentType } from "./post_type.enum";

@Entity('post')
export class post extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    type: ContentType;

    @Column({ nullable: true, length: 500 })
    description: string;

    @ManyToOne(type => Profile, user => user.posts)
    // @Transform(({ value }) => value.id) //!!!!!!!!!!!!!
    createdBy: Profile;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    category: string;

    @Column()
    likes: number;
}