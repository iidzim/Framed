import { BadRequestException, Injectable } from '@nestjs/common';
import { Profile } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { UserStatus } from './UserStatus.enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserRepository)
		private readonly userRepository: UserRepository,
	) {}

	async register(fullname: string, username: string, email: string, password: string): Promise<any> {
		return await this.userRepository.signUp(fullname, username, email, password);
	}
	
	async login(username: string, password: string): Promise<any> {
		const user = await this.userRepository.validatePassword(username, password);
		if (!user) {
			throw new BadRequestException('Invalid credentials');
		}
		//+ generate token for logged in user
		// const payload = { username };
		// const token = await this.jwtService.sign(payload);
		// return { user, token };
	}

	async getUser(id: number): Promise<Profile> {
		return await this.userRepository.findById(id);
	}

	async updateStatus(id: number, status: UserStatus) {
        await this.userRepository.update(id, { status: status });
	}

	async updateFullName(id: number, fullname: string) {
        await this.userRepository.update(id, { fullname: fullname });
	}

	async updateUsername(id: number, username: string): Promise<Profile> {
		const user = await this.userRepository.findById(id);
		var regEx = /^[0-9a-zA-Z]+$/;
		if (!regEx.test(username)) {
			throw new BadRequestException('Username must be alphanumeric');
		}
		user.username = username;
		try {
			await user.save();
		} catch (error) {
			console.log('updateUsername -> duplicated !! ' + error.code);
			if (error.code === '23505') {
				throw new BadRequestException('Username already exists');
			} else {
				throw new BadRequestException(error.message);
			}
		}
		return user;
	}

	async updateAvatar(id: number, avatar: string) {
        await this.userRepository.update(id, { avatar: avatar });
	}

	async updatePassword(username: string, old_password: string, new_password: string) {
		const user = await this.userRepository.validatePassword(username, old_password);
		if (!user) {
			throw new BadRequestException('Invalid credentials');
		}
        await this.userRepository.update(username, { password: new_password });
	}

}
//- A salt is added to the hashing process to force their uniqueness, 
//- increase their complexity without increasing user requirements,
//- and to mitigate password attacks like hash tables