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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_enum_1 = require("./category.enum");
const post_repository_1 = require("./post.repository");
const post_type_enum_1 = require("./post_type.enum");
let PostService = class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async getPosts() {
        return await this.postRepository.find();
    }
    async getPostByCategory(category) {
        return await this.postRepository.find({ where: { category: category } });
    }
    async getUserPosts(user) {
        return await this.postRepository.find({ where: { createdBy: user } });
    }
    async getPostById(post_id) {
        return await this.postRepository.findOne({ where: { id: post_id } });
    }
    async createPost(req, content, type, description, category) {
        return await this.postRepository.createPost(req.user, content, type, description, category);
    }
    async editPost(req, post_id, description) {
        return await this.postRepository.editPost(req.user, post_id, description);
    }
    async deletePost(req, post_id) {
        const owner = req.user;
        await this.postRepository.delete({ id: post_id, createdBy: owner });
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], PostService.prototype, "createPost", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String]),
    __metadata("design:returntype", Promise)
], PostService.prototype, "editPost", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PostService.prototype, "deletePost", null);
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_repository_1.PostRepository)),
    __metadata("design:paramtypes", [post_repository_1.PostRepository])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map