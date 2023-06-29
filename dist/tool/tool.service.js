"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolService = void 0;
const common_1 = require("@nestjs/common");
let ToolService = exports.ToolService = class ToolService {
    async uploadFile(file, body) {
        const { ossBucket, ossPath, ossDomain } = body;
        try {
            return '';
        }
        catch (error) {
            console.log('上传失败：', error);
            throw new common_1.HttpException('上传失败', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ToolService = ToolService = __decorate([
    (0, common_1.Injectable)()
], ToolService);
//# sourceMappingURL=tool.service.js.map