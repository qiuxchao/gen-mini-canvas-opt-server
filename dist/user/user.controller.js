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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_entity_1 = require("./user.entity");
const class_transformer_1 = require("class-transformer");
const validation_pipe_1 = require("../common/pipes/validation.pipe");
const user_operate_dto_1 = require("./dto/user-operate.dto");
const permission_decorator_1 = require("../common/decorators/permission.decorator");
const user_permission_dto_1 = require("./dto/user-permission.dto");
const user_exclude_project_dto_1 = require("./dto/user-exclude-project-dto");
const user_update_dto_1 = require("./dto/user-update-dto");
const user_change_password_dto_1 = require("./dto/user-change-password-dto");
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUserList() {
        const users = await this.userService.getUserList();
        return users.map((user) => Object.assign(new user_entity_1.User(), (0, class_transformer_1.plainToClass)(user_entity_1.User, user)));
    }
    async updateUser(body) {
        const user = await this.userService.updateUser(body);
        return Object.assign(new user_entity_1.User(), (0, class_transformer_1.plainToClass)(user_entity_1.User, user));
    }
    deleteUser(request, body) {
        const { id } = body;
        return this.userService.deleteUser(request.user.id, id);
    }
    async getUserById(request) {
        return Object.assign(new user_entity_1.User(), (0, class_transformer_1.plainToClass)(user_entity_1.User, request.user));
    }
    async userPermission(body) {
        return this.userService.setPermission(body);
    }
    async userExcludeProject(body) {
        return this.userService.setExcludeProjects(body);
    }
    async changePassword(request, body) {
        return this.userService.changePassword(request.user, body);
    }
};
__decorate([
    (0, permission_decorator_1.Permission)('user:list'),
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserList", null);
__decorate([
    (0, permission_decorator_1.Permission)('user:update'),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)(validation_pipe_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_update_dto_1.UserUpdateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, permission_decorator_1.Permission)('user:delete'),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(validation_pipe_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_operate_dto_1.UserOperateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)('info'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, permission_decorator_1.Permission)('user:permission'),
    (0, common_1.Post)('permission'),
    __param(0, (0, common_1.Body)(validation_pipe_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_permission_dto_1.UserPermissionDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userPermission", null);
__decorate([
    (0, permission_decorator_1.Permission)('user:exclude-project'),
    (0, common_1.Post)('exclude-project'),
    __param(0, (0, common_1.Body)(validation_pipe_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_exclude_project_dto_1.UserExcludeProjectDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userExcludeProject", null);
__decorate([
    (0, permission_decorator_1.Permission)('user:password'),
    (0, common_1.Post)('password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(validation_pipe_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_change_password_dto_1.UserChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map