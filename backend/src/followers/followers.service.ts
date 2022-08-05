import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { FollowerRepository } from './follower.repository';

@Injectable()
export class FollowersService {

    constructor(
        @InjectRepository(FollowerRepository)
        private readonly followerRepository: FollowerRepository,
        private readonly userService: UsersService,
    ) {}

    async getFollowers(user: Profile): Promise<any> {
        return await this.followerRepository.getFollowers(user);
    }

    async getFollowing(user: Profile): Promise<any> {
        return await this.followerRepository.getFollowing(user);
    }

    async follow(user: Profile, id: number): Promise<any> {
        const following = await this.userService.getUser(id);
        return await this.followerRepository.follow(user, following);
    }

    async unfollow(user: Profile, id: number): Promise<any> {
        const following = await this.userService.getUser(id);
        await this.followerRepository.delete({ sender: user, receiver: following.id });
    }

}
