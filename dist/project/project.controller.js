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
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const project_create_dto_1 = require("./dto/project-create.dto");
const validation_pipe_1 = require("../common/pipes/validation.pipe");
const project_update_dto_1 = require("./dto/project-update.dto");
const permission_decorator_1 = require("../common/decorators/permission.decorator");
const project_delete_dto_1 = require("./dto/project-delete.dto");
const project_info_dto_1 = require("./dto/project-info-dto");
let ProjectController = exports.ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    async createProject(body) {
        return this.projectService.createProject(body);
    }
    async getProjectList(request) {
        return this.projectService.getProjectList(request.user);
    }
    async updateProject(body) {
        return this.projectService.updateProject(body);
    }
    deleteProject(body) {
        const { ids } = body;
        return this.projectService.deleteProject(ids);
    }
    async getProjectInfo(query) {
        const { id } = query;
        return this.projectService.getProjectInfo(id);
    }
};
__decorate([
    (0, permission_decorator_1.Permission)('project:create'),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)(validation_pipe_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_create_dto_1.ProjectCreateDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "createProject", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjectList", null);
__decorate([
    (0, permission_decorator_1.Permission)('project:update'),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)(validation_pipe_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_update_dto_1.ProjectUpdateDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "updateProject", null);
__decorate([
    (0, permission_decorator_1.Permission)('project:delete'),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)(validation_pipe_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_delete_dto_1.ProjectDeleteDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "deleteProject", null);
__decorate([
    (0, common_1.Get)('info'),
    __param(0, (0, common_1.Query)(validation_pipe_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_info_dto_1.ProjectInfoDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjectInfo", null);
exports.ProjectController = ProjectController = __decorate([
    (0, common_1.Controller)('project'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
//# sourceMappingURL=project.controller.js.map