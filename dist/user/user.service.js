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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const mongodb_1 = require("mongodb");
const hashing_service_1 = require("../auth/hashing.service");
let UserService = exports.UserService = class UserService {
    constructor(userRepository, hashingService) {
        this.userRepository = userRepository;
        this.hashingService = hashingService;
    }
    async getUserList() {
        return this.userRepository.find({ order: { updatedTime: 'DESC' } });
    }
    async updateUser(newUser) {
        const { id } = newUser, restUser = __rest(newUser, ["id"]);
        const user = await this.userRepository.findOne(new mongodb_1.ObjectId(id));
        if (!user)
            throw new common_1.HttpException('用户不存在', common_1.HttpStatus.NOT_FOUND);
        Object.keys(restUser).forEach((key) => {
            user[key] = restUser[key];
        });
        delete user.id;
        await this.userRepository.update(id, Object.assign(Object.assign({}, user), { updatedTime: new Date().getTime() }));
        return this.userRepository.findOne(new mongodb_1.ObjectId(id));
    }
    async deleteUser(ownerId, id) {
        if (ownerId.toString() === id.toString())
            throw new common_1.HttpException('不能删除自己', common_1.HttpStatus.BAD_REQUEST);
        const user = await this.userRepository.findOne(new mongodb_1.ObjectId(id));
        if (!user)
            throw new common_1.HttpException('用户不存在', common_1.HttpStatus.NOT_FOUND);
        await this.userRepository.delete(id);
        return true;
    }
    async setPermission(body) {
        const { id, type, permissions } = body;
        const user = await this.userRepository.findOne(new mongodb_1.ObjectId(id));
        if (!user)
            throw new common_1.HttpException('用户不存在', common_1.HttpStatus.NOT_FOUND);
        delete user.id;
        await this.userRepository.update(id, Object.assign(Object.assign({}, user), { permissions: type === 1
                ? [...new Set([...user.permissions, ...permissions])]
                : user.permissions.filter((permission) => !permissions.includes(permission)), updatedTime: new Date().getTime() }));
        return true;
    }
    async setExcludeProjects(body) {
        const { id, type, excludeProjects } = body;
        const user = await this.userRepository.findOne(new mongodb_1.ObjectId(id));
        if (!user)
            throw new common_1.HttpException('用户不存在', common_1.HttpStatus.NOT_FOUND);
        delete user.id;
        await this.userRepository.update(id, Object.assign(Object.assign({}, user), { excludeProjects: type === 1
                ? [...new Set([...user.excludeProjects, ...excludeProjects])]
                : user.excludeProjects.filter((excludeProject) => !excludeProjects.includes(excludeProject)), updatedTime: new Date().getTime() }));
        return true;
    }
    async changePassword(user, body) {
        const { oldPassword, newPassword } = body;
        const isPasswordValid = await this.hashingService.compare(oldPassword, user.password);
        if (!isPasswordValid)
            throw new common_1.HttpException('旧密码错误', common_1.HttpStatus.BAD_REQUEST);
        const hashedPassword = await this.hashingService.hash(newPassword);
        const { id } = user, restUser = __rest(user, ["id"]);
        await this.userRepository.update(id, Object.assign(Object.assign({}, restUser), { password: hashedPassword, updatedTime: new Date().getTime() }));
        return true;
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository,
        hashing_service_1.HashingService])
], UserService);
//# sourceMappingURL=user.service.js.map