import { Test } from '@nestjs/testing';
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

describe('UsersController', () => {
    let usersController: UsersController;
    let userService: UsersService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService],
        }).compile();

        userService = moduleRef.get<UsersService>(UsersService);
        usersController = moduleRef.get<UsersController>(UsersController);
    });

    describe('getMyProfile', () => {
        it('should return user profile', async () => {
            const result = ['test'];
            jest.spyOn(userService, 'getMyProfile', ).mockImplementation(() => result);
            expect(await usersController.getMyProfile()).toBe(result);
        });
    });




});