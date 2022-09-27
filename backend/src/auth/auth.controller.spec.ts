import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { CreateProfileDto, ValidLoginDto } from '../users';
import { Response } from 'express';
import { AuthService } from './auth.service';

describe('AuthController', () => {
	let controller: AuthController;

	const requestMock = {} as unknown as Request;

	const responseMock = {
		cookie: jest.fn((x) => x),
		status: jest.fn((x) => x),
	} as unknown as Response;
	
	const profileDtoMock = {
		fullname: 'ikram idzim',
		username: 'ikrax',
		email: 'iidzim3@student.1337.ma',
		password: '123456',
	} as CreateProfileDto;

	const loginDtoMock = {
		username: 'ikrax',
		password: '123456',
	} as unknown as ValidLoginDto;

  beforeEach(async () => {
	const module: TestingModule = await Test.createTestingModule({
	  controllers: [AuthController],
	  providers: [
		{
			

	  	}
	],
	}).compile();

	controller = module.get<AuthController>(AuthController);
  });

//   it('should be defined', () => {
// 	expect(controller).toBeDefined();
//   });

  describe('register', () => {
	it('should return user profile', async () => {
		profileDtoMock.fullname = 'test'; //! how to use mocking here? working with data from db
		profileDtoMock.username = 'test'; //!
		profileDtoMock.email = 'test'; //!
		profileDtoMock.password = 'test'; //!
		await controller.register(responseMock, profileDtoMock);
		expect(responseMock.cookie).toHaveBeenCalled();
		expect(responseMock.status).toHaveBeenCalledWith(200);
	});
	it('should return a status code of 400', async () => {
		await controller.register(responseMock, profileDtoMock);
		expect(responseMock.status).toHaveBeenCalledWith(400);
	});
  })

//     describe('login', () => {
// 	it('should return user profile', async () => {
// 		await controller.login(responseMock, loginDtoMock);
// 		// expect(responseMock).toHaveBeenCalled();
// 		expect(responseMock.status).toHaveBeenCalledWith(200);
// 	});
//   })

//     describe('logout', () => {
// 	it('should return user profile', async () => {
// 		await controller.logout(requestMock, responseMock);
// 		// expect(responseMock).toHaveBeenCalled();
// 		expect(responseMock.status).toHaveBeenCalledWith(200);
// 	});
//   })

});
