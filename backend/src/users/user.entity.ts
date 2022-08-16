import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserStatus } from "./UserStatus.enum";
import { Follower } from "../followers/follower.entity";
import { post } from "../post/post.entity";
import { Exclude } from "class-transformer";

@Entity('profile')
export class Profile extends BaseEntity{

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 100 })
	fullname: string;

	@Column({ length: 50, unique: true })
	username: string;

	@Column({ unique: true })
	email: string;

	@Column()
	avatar: string;

	@Column({ default: UserStatus.OFFLINE })
	status: UserStatus;

	@Exclude()
	salt: string;

	@Column()
	password: string;

	@Column({ default: false })
	two_fa: boolean;

	@Column({ nullable: true })
	two_fa_secret: string;

	// @Exclude()
	@Column({ nullable: true })
	refresh_token: string;

	@OneToMany(
		() => Follower,
		follower => follower.sender,
		{ eager: true }
	)
	senders: Follower[];

	@OneToMany(
		() => post,
		post => post.createdBy,
		{ eager: true }
	)
	posts: post[];

}