// import { Test } from '@nestjs/testing';
// import { UsersController } from "./users.controller";
// import { UsersService } from "./users.service";

// describe('UsersController', () => {
//     let Controller: UsersController;
//     let Service: UsersService;

//     beforeEach(async () => {
//         const moduleRef = await Test.createTestingModule({
//             controllers: [UsersController],
//             providers: [UsersService],
//         }).compile();

//         Service = await moduleRef.resolve(UsersService);
//         Controller = await moduleRef.resolve(UsersController);
//     });

//     describe('getMyProfile', () => {
//         it('should return user profile', async () => {
//             const result = ['test'];
//             jest.spyOn(Service, 'getMyProfile', ).mockImplementation(() => result);
//             expect(await Controller.getMyProfile()).toBe(result);
//         });
//     });




// });