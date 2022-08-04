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
exports.PostRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const category_enum_1 = require("./category.enum");
const post_entity_1 = require("./post.entity");
const post_type_enum_1 = require("./post_type.enum");
let PostRepository = class PostRepository extends typeorm_1.Repository {
    async createPost(req, content, type, description, category) {
        const new_post = new post_entity_1.post();
        new_post.content = content;
        new_post.type = type;
        new_post.description = description;
        new_post.category = category;
        new_post.createdBy = req.user;
        new_post.createdAt = new Date();
        new_post.likes = 0;
        await new_post.save();
        return new_post;
    }
    async editPost(req, post_id, description) {
        const owner = req.user;
        const post = await this.findOne({ where: { id: post_id } });
        if (post.createdBy.id !== req.user.id) {
            throw new common_1.UnauthorizedException("You are not allowed to edit this post");
        }
        post.description = description;
        await post.save();
        return post;
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], PostRepository.prototype, "createPost", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String]),
    __metadata("design:returntype", Promise)
], PostRepository.prototype, "editPost", null);
PostRepository = __decorate([
    (0, typeorm_1.EntityRepository)(post_entity_1.post)
], PostRepository);
exports.PostRepository = PostRepository;
//# sourceMappingURL=post.repository.js.map