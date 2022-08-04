"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowerRepository = void 0;
const typeorm_1 = require("typeorm");
const follower_entity_1 = require("./follower.entity");
let FollowerRepository = class FollowerRepository extends typeorm_1.Repository {
    async getFollowers(user) {
        return await this.find({ where: { receiver: user.id } });
    }
    async getFollowing(user) {
        return await this.find({ where: { sender: user } });
    }
    async follow(user, following) {
        const exist = await this.findOne({ where: { sender: user, receiver: following.id } });
        if (exist) {
            return exist;
        }
        const follower = new follower_entity_1.Follower();
        follower.sender = user;
        follower.receiver = following.id;
        await follower.save();
        return follower;
    }
};
FollowerRepository = __decorate([
    (0, typeorm_1.EntityRepository)(follower_entity_1.Follower)
], FollowerRepository);
exports.FollowerRepository = FollowerRepository;
//# sourceMappingURL=follower.repository.js.map