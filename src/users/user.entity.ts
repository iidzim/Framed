import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { UserStatus } from "./UserStatus.enum";
import { Follower } from "../followers/follower.entity";
import { post } from "../post/post.entity";

@Entity('profile')
export class Profile extends BaseEntity{

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 100 })
	fullname: string;

	@Column({ length: 50, unique: true })
	username: string;

	@Column()
	email: string;

	@Column()
	avatar: string;

	@Column({ default: UserStatus.OFFLINE })
	status: UserStatus;

	@Column()
	salt: string;

	@Exclude()
	password: string;

	@Column({ default: false })
	two_fa: boolean;

	@Column({ nullable: true })
	two_fa_secret: string;

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


	async validatePassword(password: string): Promise<boolean> {
		const hash = await bcrypt.hash(password, this.salt);
		return hash === this.password;
	}
}