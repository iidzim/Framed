"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_service_1 = require("../users/users.service");
const follower_repository_1 = require("./follower.repository");
let FollowersService = class FollowersService {
    constructor(followerRepository, userService) {
        this.followerRepository = followerRepository;
        this.userService = userService;
    }
    async getFollowers(user) {
        return await this.followerRepository.getFollowers(user);
    }
    async getFollowing(user) {
        return await this.followerRepository.getFollowing(user);
    }
    async follow(user, id) {
        const following = await this.userService.getUser(id);
        return await this.followerRepository.follow(user, following);
    }
    async unfollow(user, id) {
        const following = await this.userService.getUser(id);
        await this.followerRepository.delete({ sender: user, receiver: following.id });
    }
};
FollowersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(follower_repository_1.FollowerRepository)),
    __metadata("design:paramtypes", [follower_repository_1.FollowerRepository,
        users_service_1.UsersService])
], FollowersService);
exports.FollowersService = FollowersService;
//# sourceMappingURL=followers.service.js.map