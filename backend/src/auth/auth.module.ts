import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { UsersModule, UserRepository } from '../users';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt';

@Module({
	imports: [
		UsersModule,
		PassportModule,
		TypeOrmModule.forFeature([UserRepository]),
	],
	providers: [
		AuthService,
		JwtStrategy,
	],
	controllers: [AuthController],
	exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
