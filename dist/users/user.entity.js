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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const UserStatus_enum_1 = require("./UserStatus.enum");
const follower_entity_1 = require("../followers/follower.entity");
const post_entity_1 = require("../post/post.entity");
let Profile = class Profile extends typeorm_1.BaseEntity {
    async validatePassword(password) {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Profile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Profile.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, unique: true }),
    __metadata("design:type", String)
], Profile.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Profile.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Profile.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: UserStatus_enum_1.UserStatus.OFFLINE }),
    __metadata("design:type", String)
], Profile.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Profile.prototype, "salt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], Profile.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Profile.prototype, "two_fa", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "two_fa_secret", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => follower_entity_1.Follower, follower => follower.sender, { eager: true }),
    __metadata("design:type", Array)
], Profile.prototype, "senders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_entity_1.Post, post => post.createdBy, { eager: true }),
    __metadata("design:type", Array)
], Profile.prototype, "posts", void 0);
Profile = __decorate([
    (0, typeorm_1.Entity)('profile')
], Profile);
exports.Profile = Profile;
//# sourceMappingURL=user.entity.js.map