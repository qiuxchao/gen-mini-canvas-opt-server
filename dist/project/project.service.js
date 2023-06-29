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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("./project.entity");
const typeorm_2 = require("typeorm");
const mongodb_1 = require("mongodb");
const draw_board_entity_1 = require("../draw-board/draw-board.entity");
let ProjectService = exports.ProjectService = class ProjectService {
    constructor(projectRepository, drawBroadRepository) {
        this.projectRepository = projectRepository;
        this.drawBroadRepository = drawBroadRepository;
    }
    async createProject(body) {
        const { name, ossBucket = '', ossPath = '', ossDomain = '' } = body;
        const project = this.projectRepository.create({
            name,
            ossBucket,
            ossPath,
            ossDomain,
            covers: [],
            boardCount: 0,
            createdTime: Date.now(),
            updatedTime: Date.now(),
        });
        await this.projectRepository.save(project);
        return true;
    }
    async getProjectList(user) {
        const { excludeProjects } = user;
        const projects = await this.projectRepository.find({
            order: { updatedTime: 'DESC' },
        });
        const list = projects.filter((project) => !excludeProjects.includes(project.id.toString()));
        return list;
    }
    async updateProject(body) {
        const { id, name, ossBucket = '', ossPath = '', ossDomain = '' } = body;
        const project = await this.projectRepository.findOne(new mongodb_1.ObjectId(id));
        if (!project)
            throw new common_1.HttpException('项目不存在', common_1.HttpStatus.NOT_FOUND);
        project.name = name;
        project.ossBucket = ossBucket;
        project.ossPath = ossPath;
        project.ossDomain = ossDomain;
        project.updatedTime = Date.now();
        await this.projectRepository.save(project);
        return true;
    }
    async deleteProject(ids) {
        await this.projectRepository.deleteMany({
            _id: { $in: ids.map((id) => new mongodb_1.ObjectId(id)) },
        });
        await this.drawBroadRepository.deleteMany({
            projectId: { $in: ids },
        });
        return true;
    }
    async getProjectInfo(id) {
        const project = await this.projectRepository.findOne(new mongodb_1.ObjectId(id));
        if (!project)
            throw new common_1.HttpException('项目不存在', common_1.HttpStatus.NOT_FOUND);
        return project;
    }
};
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(1, (0, typeorm_1.InjectRepository)(draw_board_entity_1.DrawBoard)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository,
        typeorm_2.MongoRepository])
], ProjectService);
//# sourceMappingURL=project.service.js.map