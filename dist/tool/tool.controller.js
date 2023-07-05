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
exports.ToolController = void 0;
const common_1 = require("@nestjs/common");
const tool_service_1 = require("./tool.service");
const platform_express_1 = require("@nestjs/platform-express");
const upload_dto_1 = require("./dto/upload-dto");
const validation_pipe_1 = require("../common/pipes/validation.pipe");
const permission_decorator_1 = require("../common/decorators/permission.decorator");
let ToolController = exports.ToolController = class ToolController {
    constructor(toolService) {
        this.toolService = toolService;
    }
    async uploadFile(file, body) {
        const result = await this.toolService.uploadFile(file, body);
        return result;
    }
};
__decorate([
    (0, permission_decorator_1.Permission)('tool:upload'),
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)(validation_pipe_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upload_dto_1.ProjectUpdateDto]),
    __metadata("design:returntype", Promise)
], ToolController.prototype, "uploadFile", null);
exports.ToolController = ToolController = __decorate([
    (0, common_1.Controller)('tool'),
    __metadata("design:paramtypes", [tool_service_1.ToolService])
], ToolController);
//# sourceMappingURL=tool.controller.js.map