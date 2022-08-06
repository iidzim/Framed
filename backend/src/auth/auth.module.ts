import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { UserRepository } from '../users/user.repository';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
	imports: [
		UsersModule,
		PassportModule,
		TypeOrmModule.forFeature([UserRepository]),
	],
	providers: [
		AuthService,
		LocalStrategy,
	],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
