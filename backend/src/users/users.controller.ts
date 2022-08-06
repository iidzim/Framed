import { Controller, Get, HttpCode, Patch, Post } from '@nestjs/common';

@Controller()
//td: add AuthGuard to protect this endpoint
export class UsersController {

    @Get('profile')
    async getProfile() {}

    @Get('profile/:id')
    async getUserProfile() {}

    @Patch('edit/username')
    async editUsername() {}

    @Patch('edit/fullname')
    async editFullname() {}

    @HttpCode(200)
    @Post('edit/avatar')
    async editAvatar() {}

    @Patch('edit/password')
    async editPassword() {}

}
