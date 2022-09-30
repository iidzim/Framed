import { Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { CustomAuthguard } from '../auth/guards';
import { UsersService } from '../users';
import { Follower } from './follower.entity';
import { FollowersService } from './followers.service';
import { Request } from 'express';

@Controller()
@UseGuards(CustomAuthguard)
//td: add AuthGuard to protect this endpoint
export class FollowersController {

    constructor(
        private readonly followersService: FollowersService,
        private readonly usersService: UsersService,
    ) {}

    // @Get('followers')
    // async getMyFollowers(@Req() req): Promise<Follower[]> {
    //     return await this.followersService.getFollowers(req.user.id);
    // }

    @Get('followers/:id')
    async getFollowers(
        @Req() req: Request,
		@Param('id', ParseIntPipe) id: number,
    ): Promise<Follower[]> {
        return await this.followersService.getFollowers(id);
    }

    // @Get('following')
    // async getFollowing(@Req() req): Promise<Follower[]> {
    //     return this.followersService.getFollowing(req.user);
    // }

    @Get('following/:id')
    async getUserFollowing(
        @Req() req: Request,
		@Param('id', ParseIntPipe) id: number,
    ): Promise<Follower[]> {
        const user = await this.usersService.getUser(id);
        return await this.followersService.getFollowing(user);
    }

    @HttpCode(200)
    @Post('follow/:id')
    async follow(
        @Req() req: Request,
		@Param('id', ParseIntPipe) id: number,
    ): Promise<Follower> { //!! param error
		const user_token = await this.usersService.verifyAccessToken(req.cookies.connect_sid);
		const user = await this.usersService.getUser(user_token.id);
        return await this.followersService.follow(user, id);
    }

    @Delete('unfollow/:id')
    async unfollow(
        @Req() req,
		@Param('id', ParseIntPipe) id: number,
    ): Promise<any> {
        const user_token = await this.usersService.verifyAccessToken(req.cookies.connect_sid);
		const user = await this.usersService.getUser(user_token.id);
        return await this.followersService.unfollow(user, id);
    }
}
