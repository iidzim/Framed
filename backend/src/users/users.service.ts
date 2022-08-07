import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { Profile } from './user.entity';
import { UserRepository } from './user.repository';
import { UserStatus } from './UserStatus.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/jwtPayload.interface';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserRepository)
		private readonly userRepository: UserRepository,
		private readonly jwtService: JwtService,
	) {}

	//& create token for new user and return it
	async GetToken(id: number){
        const payload: JwtPayload = { id };
		console.log('HEREE');
        const token = await this.jwtService.sign(payload);
		console.log('GetToken -> token ' + token);
        return { token };
    }

	async verifyToken(token: string): Promise<any> {
		try{
			const check = await this.jwtService.verify(token);
			if (typeof check === 'object' && check.id) {
				return check;
			}
			throw new BadRequestException('Invalid token');
		} catch (error) {
			throw new BadRequestException('Invalid token');
		}
	}

	async register(@Res({passthrough: true}) res, fullname: string, username: string, email: string, password: string): Promise<Profile> {
		const user = await this.userRepository.signUp(fullname, username, email, password);
		console.log('register -> created ' + user.fullname);
		const token = await this.GetToken(user.id);
		await this.updateStatus(user.id, UserStatus.ONLINE);
		//? set cookie for new user with token
		res.cookie('connect_sid', [token], { httpOnly: true });
		user.password = undefined;
		return user;
	}

	async login(@Res({passthrough: true}) res, username: string, password: string): Promise<Profile> {
		let user: Profile;
		try{
			user = await this.userRepository.validatePassword(username, password);
			user.password = undefined;
		} catch (error) {
			throw new BadRequestException('Invalid credentials');
		}
		//+ generate token for logged in user
		const token = await this.GetToken(user.id);
		//? set cookie for logged in user with token
		await this.updateStatus(user.id, UserStatus.ONLINE);
		res.cookie('connect_sid', [token], { httpOnly: true });
		user.password = undefined;
		return user;
	}

	async validateUser(username: string, password: string): Promise<Profile> {
		let user: Profile;
		try{
			user = await this.userRepository.validatePassword(username, password);
			user.password = undefined;
		} catch (error) {
			throw new BadRequestException('Invalid credentials');
		}
		await this.updateStatus(user.id, UserStatus.ONLINE);
		return user;
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