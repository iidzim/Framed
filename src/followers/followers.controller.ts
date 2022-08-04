import { Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { FollowersService } from './followers.service';

@Controller('followers')
//td: add AuthGuard to protect this endpoint
export class FollowersController {

    constructor(
        private readonly followersService: FollowersService,
        private readonly usersService: UsersService,
    ) {}

    @Get('followers')
    async getMyFollowers(@Req() req) {
        return this.followersService.getFollowers(req.user);
    }

    @Get('followers/:id')
    async getFollowers(@Req() req, id: number) {
        const user = await this.usersService.getUser(id);
        return this.followersService.getFollowers(user);
    }

    @Get('following')
    async getFollowing(@Req() req) {
        return this.followersService.getFollowing(req.user);
    }

    @Get('following/:id')
    async getUserFollowing(@Req() req, id: number) {
        const user = await this.usersService.getUser(id);
        return this.followersService.getFollowing(user);
    }

    @Post('follow')
    async follow(@Req() req, id: number) {
        return this.followersService.follow(req, id);
    }

    @Delete('unfollow')
    async unfollow(@Req() req, id: number) {
        return this.followersService.unfollow(req, id);
    }
}
