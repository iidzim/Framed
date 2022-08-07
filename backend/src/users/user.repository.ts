import { BadRequestException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Profile } from "./user.entity";

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

	async signUp(fullname: string, username: string, email: string, password: string): Promise<Profile> {

		console.log("register > " + fullname + " " + username + " " + email + " " + password);
		const newUser = new Profile();
		newUser.fullname = fullname;
		newUser.username = username;
		newUser.email = email;
		newUser.avatar = "https://avatars.dicebear.com/api/avataaars/" + username + ".svg";
		newUser.salt = await bcrypt.genSalt();
		newUser.password = await bcrypt.hash(password, newUser.salt);
		try{
			await newUser.save();
		} catch (error) {
			if (error.code === '23505') {
				throw new BadRequestException('Username/email already exists');
			}
			throw new BadRequestException('error while creating user -> ' + error.message);
		}
		return newUser;
	}

	async validatePassword(username: string, password: string): Promise<any> {
		const user = await this.findByUsername(username);
		if (user && await bcrypt.compare(password, user.password)) {
			return user;
		} else {
			throw new BadRequestException('Invalid credentials');
		}
	}


}