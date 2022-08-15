import { Controller, Delete, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { CustomAuthguard } from '../users/auth.guards';
import { UsersService } from '../users/users.service';
import { Follower } from './follower.entity';
import { FollowersService } from './followers.service';

@Controller()
@UseGuards(CustomAuthguard)
//td: add AuthGuard to protect this endpoint
export class FollowersController {

    constructor(
        private readonly followersService: FollowersService,
        private readonly usersService: UsersService,
    ) {}

    @Get('followers')
    async getMyFollowers(@Req() req): Promise<Follower[]> {
        return await this.followersService.getFollowers(req.user.id);
    }

    @Get('followers/:id')
    async getFollowers(@Req() req, id: number): Promise<Follower[]> {
        return await this.followersService.getFollowers(id);
    }

    @Get('following')
    async getFollowing(@Req() req): Promise<Follower[]> {
        return this.followersService.getFollowing(req.user);
    }

    @Get('following/:id')
    async getUserFollowing(@Req() req, id: number): Promise<Follower[]> {
        const user = await this.usersService.getUser(id);
        return await this.followersService.getFollowing(user);
    }

    @HttpCode(200)
    @Post('follow')
    async follow(@Req() req, id: number): Promise<Follower> {
        return await this.followersService.follow(req, id);
    }

    @Delete('unfollow')
    async unfollow(@Req() req, id: number): Promise<any> {
        return await this.followersService.unfollow(req, id);
    }
}
