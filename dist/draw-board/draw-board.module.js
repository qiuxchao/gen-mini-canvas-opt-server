"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawBoardModule = void 0;
const common_1 = require("@nestjs/common");
const draw_board_service_1 = require("./draw-board.service");
const draw_board_controller_1 = require("./draw-board.controller");
const typeorm_1 = require("@nestjs/typeorm");
const draw_board_entity_1 = require("./draw-board.entity");
const project_entity_1 = require("../project/project.entity");
let DrawBoardModule = exports.DrawBoardModule = class DrawBoardModule {
};
exports.DrawBoardModule = DrawBoardModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([draw_board_entity_1.DrawBoard, project_entity_1.Project])],
        controllers: [draw_board_controller_1.DrawBoardController],
        providers: [draw_board_service_1.DrawBoardService],
    })
], DrawBoardModule);
//# sourceMappingURL=draw-board.module.js.map