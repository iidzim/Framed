import { BadRequestException, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Profile } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateProfileDto, EditProfileDto, ValidLoginDto } from './dto';
import { UserStatus } from './enum';
import { JwtPayload } from '../auth/jwt';
import { Response } from 'express';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserRepository)
		private readonly userRepository: UserRepository,
		private readonly jwtService: JwtService,
	) {}

	//& create token for new user and return it
	GetAccessToken(user: Profile): string {
		const id = user.id;
		const username = user.username;
		const payload: JwtPayload = { id, username };
		const access_token = this.jwtService.sign(payload, { secret: process.env.JWT_ACCESS_TOKEN_SECRET, expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN });
		return access_token;
	}

	async GetRefreshToken(user: Profile): Promise<string> {
		const id = user.id;
		const username = user.username;
		const payload: JwtPayload = { id, username };
		const refresh_token = this.jwtService.sign(payload, {secret: process.env.JWT_REFRESH_TOKEN_SECRET, expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN});
		const hashed_token = await bcrypt.hash(refresh_token, 10);
		await this.userRepository.update(id, { refresh_token: hashed_token });
		return refresh_token;
	}

	async verifyAccessToken(token: string): Promise<any> {
		try{
			const check = await this.jwtService.verify(token.toString(), {secret: 'unsplash'});
			if (typeof check === 'object' && 'id' in check) {
				return check;
			}
			throw new BadRequestException('Invalid token');
		} catch (error) {
			throw new BadRequestException('Invalid token');
		}
	}

	async verifyRefreshToken(refresh_token: string, id: number): Promise<Profile> {
		try{
			const user = await this.getUser(id);
			const is_equal = await bcrypt.compare(refresh_token, user.refresh_token)
			if (is_equal)
				return user;
			else
				throw new UnauthorizedException('invalid refresh token');
		} catch (error) {
			throw new UnauthorizedException('invalid refresh token');
		}
	}

	async removeRefreshToken(id: number): Promise<any> {
		return await this.userRepository.update(id, {refresh_token: null });
	}

	async register(
		@Res({passthrough: true}) res: Response,
		profileDto: CreateProfileDto
	): Promise<Profile> {
		const user = await this.userRepository.signUp(profileDto);
		// console.log(user.id, user.username);
		const access_token = this.GetAccessToken(user);
		const refresh_token = await this.GetRefreshToken(user);
		await this.updateStatus(user.id, UserStatus.ONLINE);
		// set cookie for new user with token
		res.cookie('connect_sid', [access_token], { httpOnly: true });
		res.cookie('connect_ref', [refresh_token], { httpOnly: true });
		user.password = undefined;
		return user;
	} //+ add try catch block to be sure exception is handled and status code is 400

	async login(
		@Res({passthrough: true}) res,
		loginDto: ValidLoginDto
	): Promise<Profile> {
		const { username, password } = loginDto;
		let user: Profile;
		try{
			user = await this.userRepository.validatePassword(username, password);
		} catch (error) {
			console.log('login -> ' + error.message);
			throw new BadRequestException('Invalid credentials');
		}
		//+ generate token for logged in user
		const acess_token = this.GetAccessToken(user);
		const refresh_token = await this.GetRefreshToken(user);
		await this.updateStatus(user.id, UserStatus.ONLINE);
		// set cookie for logged in user with token
		res.cookie('connect_sid', [acess_token], { httpOnly: true });
		res.cookie('connect_ref', [refresh_token], { httpOnly: true });
		user.password = undefined;
		return user;
	}

	async getUser(id: number): Promise<Profile> {
		const user = await this.userRepository.findById(id);
		user.password = undefined;
		return user;
	}

	async updateStatus(id: number, status: UserStatus) {
		await this.userRepository.update(id, { status: status });
	}

	async updateFullName(id: number, fullname: string) {
		await this.userRepository.update(id, { fullname: fullname });
	}

	async updateUsername(user: Profile, username: string): Promise<Profile> {
		user.username = username;
		try {
			await user.save();
		} catch (error) {
			// console.log('updateUsername -> duplicated !! ' + error.code);
			if (error.code === '23505') {
				throw new BadRequestException('Username already exists');
			}
			throw new BadRequestException(error.message);
		}
		return user;
	}

	async updateAvatar(id: number, avatar: string) {
		await this.userRepository.update(id, { avatar: avatar });
	}

	async updatePassword(username: string, old_password: string, new_password: string) {
		if (old_password === new_password) {
			throw new BadRequestException('New password must be different from old password !');
		}
		const user = await this.userRepository.validatePassword(username, old_password);
		if (!user) {
			throw new BadRequestException('Invalid credentials');
		}
		await this.userRepository.update(username, { password: new_password });
	}

	async isValid(editDto: EditProfileDto){
		// check for duplicated username & email
		const { username, email } = editDto;
		if (username) {
			const nameDup = await this.userRepository.findAndCount({ where : {username: username} });
			if (nameDup.length > 0)
				throw new BadRequestException('username already exists');
		}
		if (email) {
			const emailDup = await this.userRepository.findAndCount({ where : {email: email} });
			if (emailDup.length > 0)
				throw new BadRequestException('email already exists');
		}
	}
}
//- A salt is added to the hashing process to force their uniqueness, 
//- increase their complexity without increasing user requirements,
//- and to mitigate password attacks like hash tables