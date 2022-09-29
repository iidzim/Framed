import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProfileDto } from './dto';
import { Profile } from './user.entity';
import { UserRepository } from './user.repository';
import { UsersService } from './users.service';
import { Response } from 'express';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UserRepository;

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

  const USER_REPOSITORY_TOKEN = getRepositoryToken(UserRepository);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            update: jest.fn(),
            findAndCount: jest.fn(),
            signUp: jest.fn(),
            validatePassword: jest.fn(),
            findByID: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UserRepository>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('register', () => {
    it('should create a new user with encoded password', async () => {
      await service.register(responseMock, profileDtoMock);
      // expect(repository.signUp).toHaveBeenCalled();
    });
  
    
  });

});


// const newUser = thisuserRepository.create({ ...profileDto, password});
//- describe() -> groups together a set of individual tests related to it.
//- test() or it() -> is a single test case.
//- expect() -> is a matcher that is used to check the value of an expression.