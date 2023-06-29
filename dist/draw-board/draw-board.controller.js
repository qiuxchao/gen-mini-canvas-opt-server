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
exports.DrawBoardController = void 0;
const common_1 = require("@nestjs/common");
const draw_board_service_1 = require("./draw-board.service");
const validation_pipe_1 = require("../common/pipes/validation.pipe");
const draw_board_create_dto_1 = require("./dto/draw-board-create.dto");
const draw_board_delete_dto_1 = require("./dto/draw-board-delete.dto");
const draw_board_update_dto_1 = require("./dto/draw-board-update.dto");
const draw_board_detail_dto_1 = require("./dto/draw-board-detail.dto");
const class_transformer_1 = require("class-transformer");
const permission_decorator_1 = require("../common/decorators/permission.decorator");
const draw_board_entity_1 = require("./draw-board.entity");
const draw_board_list_dto_1 = require("./dto/draw-board-list.dto");
let DrawBoardController = exports.DrawBoardController = class DrawBoardController {
    constructor(drawBoardService) {
        this.drawBoardService = drawBoardService;
    }
    async createDrawBoard(req, body) {
        return this.drawBoardService.createDrawBoard(req.user, body);
    }
    async getDrawBoardList(req, query) {
        const drawBoards = await this.drawBoardService.getDrawBoardList(req.user, query.projectId);
        return drawBoards.map((drawBoard) => Object.assign(new draw_board_entity_1.DrawBoard(), (0, class_transformer_1.plainToClass)(draw_board_entity_1.DrawBoard, drawBoard)));
    }
    async updateDrawBoard(req, body) {
        return this.drawBoardService.updateDrawBoard(req.user, body);
    }
    deleteDrawBoard(req, body) {
        const { ids } = body;
        return this.drawBoardService.deleteDrawBoard(req.user, ids);
    }
    async getDrawBoardDetail(req, query) {
        const { id } = query;
        return this.drawBoardService.getDrawBoardDetail(req.user, id);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(validation_pipe_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, draw_board_create_dto_1.DrawBoardCreateDto]),
    __metadata("design:returntype", Promise)
], DrawBoardController.prototype, "createDrawBoard", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)(validation_pipe_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, draw_board_list_dto_1.DrawBoardListDto]),
    __metadata("design:returntype", Promise)
], DrawBoardController.prototype, "getDrawBoardList", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(validation_pipe_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, draw_board_update_dto_1.DrawBoardUpdateDto]),
    __metadata("design:returntype", Promise)
], DrawBoardController.prototype, "updateDrawBoard", null);
__decorate([
    (0, permission_decorator_1.Permission)('draw-board:delete'),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(validation_pipe_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, draw_board_delete_dto_1.DrawBoardDeleteDto]),
    __metadata("design:returntype", Promise)
], DrawBoardController.prototype, "deleteDrawBoard", null);
__decorate([
    (0, common_1.Get)('detail'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)(validation_pipe_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, draw_board_detail_dto_1.DrawBoardDetailDto]),
    __metadata("design:returntype", Promise)
], DrawBoardController.prototype, "getDrawBoardDetail", null);
exports.DrawBoardController = DrawBoardController = __decorate([
    (0, common_1.Controller)('draw-board'),
    __metadata("design:paramtypes", [draw_board_service_1.DrawBoardService])
], DrawBoardController);
//# sourceMappingURL=draw-board.controller.js.map