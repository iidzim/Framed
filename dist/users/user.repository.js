"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./user.entity");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async findById(id) {
        const user = await this.findOne({ id });
        if (!user) {
            throw new common_1.BadRequestException("User not found");
        }
        return user;
    }
    async findByEmail(email) {
        const user = await this.findOne({ email });
        if (user) {
            return user;
        }
    }
    async findByUsername(username) {
        const user = await this.findOne({ username });
        if (!user) {
            throw new common_1.BadRequestException("User not found");
        }
        return user;
    }
    async findByfullName(fullname) {
        const user = await this.findOne({ fullname });
        if (!user) {
            throw new common_1.BadRequestException("User not found");
        }
        return user;
    }
    async signUp(fullname, username, email, password) {
        const existUser = await this.findByEmail(username);
        if (existUser) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const newUser = new user_entity_1.Profile();
        newUser.fullname = fullname;
        newUser.username = username;
        newUser.email = email;
        newUser.avatar = "https://avatars.dicebear.com/api/croodles/" + username + ".svg";
        newUser.salt = await bcrypt.genSalt();
        newUser.password = await bcrypt.hash(password, newUser.salt);
        try {
            await newUser.save();
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.BadRequestException('Username already exists');
            }
            else {
                throw new common_1.BadRequestException('error while creating user -> ' + error.message);
            }
        }
    }
    async validatePassword(username, password) {
        const user = await this.findByUsername(username);
        if (user && user.validatePassword(password)) {
            return user;
        }
        else {
            return null;
        }
    }
};
UserRepository = __decorate([
    (0, typeorm_1.EntityRepository)(user_entity_1.Profile)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map