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
exports.FollowersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const followers_service_1 = require("./followers.service");
let FollowersController = class FollowersController {
    constructor(followersService, usersService) {
        this.followersService = followersService;
        this.usersService = usersService;
    }
    async getMyFollowers(req) {
        return this.followersService.getFollowers(req.user);
    }
    async getFollowers(req, id) {
        const user = await this.usersService.getUser(id);
        return this.followersService.getFollowers(user);
    }
    async getFollowing(req) {
        return this.followersService.getFollowing(req.user);
    }
    async getUserFollowing(req, id) {
        const user = await this.usersService.getUser(id);
        return this.followersService.getFollowing(user);
    }
    async follow(req, id) {
        return this.followersService.follow(req, id);
    }
    async unfollow(req, id) {
        return this.followersService.unfollow(req, id);
    }
};
__decorate([
    (0, common_1.Get)('followers'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FollowersController.prototype, "getMyFollowers", null);
__decorate([
    (0, common_1.Get)('followers/:id'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], FollowersController.prototype, "getFollowers", null);
__decorate([
    (0, common_1.Get)('following'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FollowersController.prototype, "getFollowing", null);
__decorate([
    (0, common_1.Get)('following/:id'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], FollowersController.prototype, "getUserFollowing", null);
__decorate([
    (0, common_1.Post)('follow'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], FollowersController.prototype, "follow", null);
__decorate([
    (0, common_1.Delete)('unfollow'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], FollowersController.prototype, "unfollow", null);
FollowersController = __decorate([
    (0, common_1.Controller)('followers'),
    __metadata("design:paramtypes", [followers_service_1.FollowersService,
        users_service_1.UsersService])
], FollowersController);
exports.FollowersController = FollowersController;
//# sourceMappingURL=followers.controller.js.map