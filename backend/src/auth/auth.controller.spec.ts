import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { CreateProfileDto, UserRepository, UsersService, ValidLoginDto } from '../users';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
	let controller: AuthController(
		new AuthService(
			new UsersService(
				new UserRepository(),
				new JwtService(),
			)
		)
	);

	const requestMock = {} as unknown as Request;

	const responseMock = {
		cookie: jest.fn((x) => x),
		status: jest.fn((x) => x),
	} as unknown as Response;
	
	const profileDtoMock = {
		fullname: '',
		username: '',
		email: '',
		password: '',
	} as CreateProfileDto;

	const loginDtoMock = {
		username: '',
		password: '',
	} as unknown as ValidLoginDto;

  beforeEach(async () => {
	const module: TestingModule = await Test.createTestingModule({
	  controllers: [AuthController],
	}).compile();

	controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
	expect(controller).toBeDefined();
  });

  describe('register', () => {
	it('should return user profile', async () => {
		profileDtoMock.fullname = 'test'; //! how to use mocking here? working with data from db
		profileDtoMock.username = 'test'; //!
		profileDtoMock.email = 'test'; //!
		profileDtoMock.password = 'test'; //!
		controller.register(responseMock, profileDtoMock);
		expect(responseMock.cookie).toHaveBeenCalled();
		expect(responseMock.status).toHaveBeenCalledWith(200);
	});
	it('should return a status code of 400', async () => {
		controller.register(responseMock, profileDtoMock);
		expect(responseMock.status).toHaveBeenCalledWith(400);
	});
  })

//     describe('login', () => {
// 	it('should return user profile', async () => {
// 		controller.login(responseMock, loginDtoMock);
// 		// expect(responseMock).toHaveBeenCalled();
// 		expect(responseMock.status).toHaveBeenCalledWith(200);
// 	});
//   })

//     describe('logout', () => {
// 	it('should return user profile', async () => {
// 		controller.logout(requestMock, responseMock);
// 		// expect(responseMock).toHaveBeenCalled();
// 		expect(responseMock.status).toHaveBeenCalledWith(200);
// 	});
//   })

});
