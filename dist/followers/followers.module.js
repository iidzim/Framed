"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("../users/user.repository");
const users_service_1 = require("../users/users.service");
const follower_repository_1 = require("./follower.repository");
const followers_controller_1 = require("./followers.controller");
const followers_service_1 = require("./followers.service");
let FollowersModule = class FollowersModule {
};
FollowersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_repository_1.UserRepository,
                follower_repository_1.FollowerRepository,
            ]),
        ],
        controllers: [followers_controller_1.FollowersController],
        providers: [
            followers_service_1.FollowersService,
            users_service_1.UsersService,
        ],
        exports: [followers_service_1.FollowersService],
    })
], FollowersModule);
exports.FollowersModule = FollowersModule;
//# sourceMappingURL=followers.module.js.map