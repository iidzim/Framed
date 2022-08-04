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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const typeorm_1 = require("@nestjs/typeorm");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async register(fullname, username, email, password) {
        return await this.userRepository.signUp(fullname, username, email, password);
    }
    async login(username, password) {
        const user = await this.userRepository.validatePassword(username, password);
        if (!user) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
    }
    async getUser(id) {
        return await this.userRepository.findById(id);
    }
    async updateStatus(id, status) {
        await this.userRepository.update(id, { status: status });
    }
    async updateFullName(id, fullname) {
        await this.userRepository.update(id, { fullname: fullname });
    }
    async updateUsername(id, username) {
        const user = await this.userRepository.findById(id);
        var regEx = /^[0-9a-zA-Z]+$/;
        if (!regEx.test(username)) {
            throw new common_1.BadRequestException('Username must be alphanumeric');
        }
        user.username = username;
        try {
            await user.save();
        }
        catch (error) {
            console.log('updateUsername -> duplicated !! ' + error.code);
            if (error.code === '23505') {
                throw new common_1.BadRequestException('Username already exists');
            }
            else {
                throw new common_1.BadRequestException(error.message);
            }
        }
        return user;
    }
    async updateAvatar(id, avatar) {
        await this.userRepository.update(id, { avatar: avatar });
    }
    async updatePassword(username, old_password, new_password) {
        const user = await this.userRepository.validatePassword(username, old_password);
        if (!user) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        await this.userRepository.update(username, { password: new_password });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map