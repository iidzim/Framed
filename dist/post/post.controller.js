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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const category_enum_1 = require("./category.enum");
const post_service_1 = require("./post.service");
const post_type_enum_1 = require("./post_type.enum");
let PostController = class PostController {
    constructor(postService, usersService) {
        this.postService = postService;
        this.usersService = usersService;
    }
    async getPosts(req) {
        return await this.postService.getPosts();
    }
    async getPostById(req, post_id) {
        return await this.postService.getPostById(post_id);
    }
    async getPostByCategory(req, category) {
        return await this.postService.getPostByCategory(category);
    }
    async getUserPosts(req) {
        return await this.postService.getUserPosts(req.user);
    }
    async createPost(req, content, type, description, category) {
        return await this.postService.createPost(req.user, content, type, description, category);
    }
    async editPost(req, post_id, description) {
        return await this.postService.editPost(req.user, post_id, description);
    }
    async deletePost(req, post_id) {
        return await this.postService.deletePost(req.user, post_id);
    }
};
__decorate([
    (0, common_1.Get)('posts'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPosts", null);
__decorate([
    (0, common_1.Get)('posts/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostById", null);
__decorate([
    (0, common_1.Get)('explore/:category'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostByCategory", null);
__decorate([
    (0, common_1.Get)('posts'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getUserPosts", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('content')),
    __param(2, (0, common_1.Body)('type')),
    __param(3, (0, common_1.Body)('description')),
    __param(4, (0, common_1.Body)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('post_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "editPost", null);
__decorate([
    (0, common_1.Delete)('remove/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
PostController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [post_service_1.PostService,
        users_service_1.UsersService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map