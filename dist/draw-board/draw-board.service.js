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
exports.DrawBoardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const draw_board_entity_1 = require("./draw-board.entity");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("../project/project.entity");
const mongodb_1 = require("mongodb");
let DrawBoardService = exports.DrawBoardService = class DrawBoardService {
    constructor(drawBroadRepository, projectRepository) {
        this.drawBroadRepository = drawBroadRepository;
        this.projectRepository = projectRepository;
    }
    async createDrawBoard(user, body) {
        const { name, projectId, width, height } = body;
        if (user.excludeProjects.includes(projectId))
            throw new common_1.HttpException('无权限', common_1.HttpStatus.FORBIDDEN);
        const drawBoard = this.drawBroadRepository.create({
            name,
            cover: '',
            json: '[]',
            width: width || 375,
            height: height || 667,
            createdTime: Date.now(),
            updatedTime: Date.now(),
            projectId,
            operators: [
                {
                    id: user.id,
                    name: user.name,
                },
            ],
        });
        await this.drawBroadRepository.save(drawBoard);
        this.syncProjectsData([projectId]);
        return true;
    }
    async getDrawBoardList(user, id) {
        if (user.excludeProjects.includes(id))
            throw new common_1.HttpException('无权限', common_1.HttpStatus.FORBIDDEN);
        return this.drawBroadRepository.find({
            where: { projectId: id },
            order: { updatedTime: 'DESC' },
        });
    }
    async updateDrawBoard(user, body) {
        const { id } = body, restBody = __rest(body, ["id"]);
        const drawBoard = await this.drawBroadRepository.findOne(new mongodb_1.ObjectId(id));
        if (!drawBoard)
            throw new common_1.HttpException('画板不存在', common_1.HttpStatus.NOT_FOUND);
        if (user.excludeProjects.includes(drawBoard.projectId))
            throw new common_1.HttpException('无权限', common_1.HttpStatus.FORBIDDEN);
        Object.keys(restBody).forEach((key) => {
            drawBoard[key] = body[key];
        });
        drawBoard.updatedTime = Date.now();
        drawBoard.operators = [
            {
                id: user.id,
                name: user.name,
            },
            ...drawBoard.operators.filter((item) => item.id.toString() !== user.id.toString()),
        ];
        await this.drawBroadRepository.save(drawBoard);
        this.syncProjectsData([drawBoard.projectId]);
        return true;
    }
    async deleteDrawBoard(user, ids) {
        const drawBoards = await this.drawBroadRepository.find({
            _id: { $in: ids.map((id) => new mongodb_1.ObjectId(id)) },
        });
        if (drawBoards.length !== ids.length)
            throw new common_1.HttpException('画板不存在', common_1.HttpStatus.NOT_FOUND);
        const projectIds = drawBoards.map((item) => item.projectId);
        if (user.excludeProjects.some((id) => projectIds.includes(id)))
            throw new common_1.HttpException('无权限', common_1.HttpStatus.FORBIDDEN);
        await this.drawBroadRepository.deleteMany({
            _id: { $in: ids.map((id) => new mongodb_1.ObjectId(id)) },
        });
        this.syncProjectsData(projectIds);
        return true;
    }
    async getDrawBoardDetail(user, id) {
        const drawBoard = await this.drawBroadRepository.findOne(new mongodb_1.ObjectId(id));
        if (!drawBoard)
            throw new common_1.HttpException('画板不存在', common_1.HttpStatus.NOT_FOUND);
        if (user.excludeProjects.includes(drawBoard.projectId))
            throw new common_1.HttpException('无权限', common_1.HttpStatus.FORBIDDEN);
        const project = await this.projectRepository.findOne(new mongodb_1.ObjectId(drawBoard.projectId));
        if (!project)
            throw new common_1.HttpException('项目不存在', common_1.HttpStatus.NOT_FOUND);
        drawBoard.project = project;
        return drawBoard;
    }
    async syncProjectsData(projectIds) {
        if (!projectIds.length)
            return;
        for (const id of projectIds) {
            this.updateProjectData(id);
        }
    }
    async updateProjectData(projectId) {
        if (!projectId)
            return;
        const project = await this.projectRepository.findOne(new mongodb_1.ObjectId(projectId));
        if (!project)
            return;
        const covers = await this.drawBroadRepository.find({
            where: { projectId: project.id.toString() },
            order: { updatedTime: 'DESC' },
            select: ['cover'],
        });
        const newCovers = covers
            .filter((cover) => Boolean(cover.cover))
            .map((cover) => cover.cover)
            .slice(0, 2);
        const boardCount = await this.drawBroadRepository.count({
            projectId: project.id.toString(),
        });
        if (project.covers.join(',') === newCovers.join(',') &&
            project.boardCount === boardCount)
            return;
        project.covers = newCovers;
        project.boardCount = boardCount;
        project.updatedTime = Date.now();
        await this.projectRepository.save(project);
    }
};
exports.DrawBoardService = DrawBoardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(draw_board_entity_1.DrawBoard)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository,
        typeorm_2.MongoRepository])
], DrawBoardService);
//# sourceMappingURL=draw-board.service.js.map