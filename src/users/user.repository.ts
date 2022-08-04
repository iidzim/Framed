import { BadRequestException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Profile } from "./user.entity";
import { UserStatus } from "./UserStatus.enum";

@EntityRepository(Profile)
export class UserRepository extends Repository<Profile> {

	async findById(id: number): Promise<Profile> {
		const user = await this.findOne({ id });
		if (!user) {
			throw new BadRequestException("User not found");
		}
		return user;
	}

	async findByEmail(email: string): Promise<Profile> {
		const user = await this.findOne({ email });
		if (user) {
			return user;
		}
	}

	async findByUsername(username: string): Promise<Profile> {
		const user = await this.findOne({ username });
		if (!user) {
			throw new BadRequestException("User not found");
		}
		return user;
	}

	async findByfullName(fullname: string): Promise<Profile> {
		const user = await this.findOne({ fullname });
		if (!user) {
			throw new BadRequestException("User not found");
		}
		return user;
	}

	async signUp(fullname: string, username: string, email: string, password: string): Promise<any> {
		
		const existUser = await this.findByEmail(username);
		if (existUser) {
			throw new BadRequestException('Email already exists');
		}
		const newUser = new Profile();
		newUser.fullname = fullname;
		newUser.username = username;
		newUser.email = email;
		newUser.avatar = "https://avatars.dicebear.com/api/croodles/" + username + ".svg";
		newUser.salt = await bcrypt.genSalt();
		newUser.password = await bcrypt.hash(password, newUser.salt);
		try{
			await newUser.save();
		} catch (error) {
			if (error.code === '23505') {
				throw new BadRequestException('Username already exists');
			} else {
				throw new BadRequestException('error while creating user -> ' + error.message);
			}
		}
	}

	async validatePassword(username: string, password: string): Promise<any> {
		const user = await this.findByUsername(username);
		if (user && user.validatePassword(password)) {
			return user;
		} else {
			return null;
		}
	}


}