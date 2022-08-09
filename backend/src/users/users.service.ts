import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { Profile } from './user.entity';
import { UserRepository } from './user.repository';
import { UserStatus } from './UserStatus.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/jwtPayload.interface';
import { CreateProfileDto } from './dto-users/create-profile.dto';
import { EditProfileDto } from './dto-users/edit-profile.dto';
import { ValidLoginDto } from './dto-users/login-profile.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserRepository)
		private readonly userRepository: UserRepository,
		private readonly jwtService: JwtService,
	) {}

	// containSpecialChar(str: string) { //! use class-validator instead
	// 	var regex = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
	// 	return regex.test(str);
	// }

	//& create token for new user and return it
	async GetToken(user: Profile): Promise<string> {
		const id = user.id;
		const username = user.username;
		const payload: JwtPayload = { id, username };
		// const token = await this.jwtService.signAsync(payload, {secret: process.env.JWT_SECRET});
		const token = await this.jwtService.sign(payload, {secret: 'unsplash'});
		return token;
	}

	async verifyToken(token: string): Promise<any> {
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

	// async register(@Res({passthrough: true}) res, fullname: string, username: string, email: string, password: string): Promise<Profile> {
	async register(@Res({passthrough: true}) res, profileDto: CreateProfileDto): Promise<Profile> {
		const user = await this.userRepository.signUp(profileDto);
		const token = await this.GetToken(user);
		await this.updateStatus(user.id, UserStatus.ONLINE);
		//? set cookie for new user with token
		res.cookie('connect_sid', [token], { httpOnly: true });
		user.password = undefined;
		return user;
	}

	// async login(@Res({passthrough: true}) res, username: string, password: string): Promise<Profile> {
	async login(@Res({passthrough: true}) res, loginDto: ValidLoginDto): Promise<Profile> {
		let user: Profile;
		const { username, password } = loginDto;
		try{
			user = await this.userRepository.validatePassword(username, password);
		} catch (error) {
			throw new BadRequestException('Invalid credentials');
		}
		//+ generate token for logged in user
		const token = await this.GetToken(user);
		await this.updateStatus(user.id, UserStatus.ONLINE);
		//? set cookie for logged in user with token
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
		// if (this.containSpecialChar(fullname)) {
		// 	throw new BadRequestException('Fullname must not contain special characters');
		// }
		await this.userRepository.update(id, { fullname: fullname });
	}

	async updateUsername(user: Profile, username: string): Promise<Profile> {
		// if (this.containSpecialChar(username)) {
		// 	throw new BadRequestException('username must not contain special characters');
		// }
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
		if (old_password === new_password) {
			throw new BadRequestException('New password must be different from old password');
		}
		const user = await this.userRepository.validatePassword(username, old_password);
		if (!user) {
			throw new BadRequestException('Invalid credentials');
		}
		await this.userRepository.update(username, { password: new_password });
	}

	// async isValid(type: string, value: string){ //! make sure that the value is not null or undefined
	async isValid(editDto: EditProfileDto){ //! make sure that the value is not null or undefined
		// if (type == 'username' || type == 'fullname' || type == 'password' || type == 'new_password') {
		// 	if (this.containSpecialChar(value))
		// 		throw new BadRequestException('username must not contain special characters');
		// } else if (type == 'email'){
		// 	var regex = /[`!#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/;
		// 	if (regex.test(value))
		// 		throw new BadRequestException('invalid email');
		// } else if (type == 'username'){
		//+ check for duplicated username & email
		const { username, email } = editDto;
		if (username != null) {
			const nameDup = await this.userRepository.findAndCount({ where : {username: username} });
			if (nameDup.length > 0)
				throw new BadRequestException('username already exists');
		}
		else if (email != null) {
			const emailDup = await this.userRepository.findAndCount({ where : {email: email} });
			if (emailDup.length > 0)
				throw new BadRequestException('email already exists');
		}
	}

}
//- A salt is added to the hashing process to force their uniqueness, 
//- increase their complexity without increasing user requirements,
//- and to mitigate password attacks like hash tables