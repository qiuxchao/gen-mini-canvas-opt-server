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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const axios_1 = require("@nestjs/axios");
let ToolService = exports.ToolService = class ToolService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async uploadFile(file, body) {
        const { ossBucket, ossPath, ossDomain } = body;
        const token = process.env.UPLOAD_TOKEN;
        const url = process.env.UPLOAD_URL;
        const path = `${ossBucket || 'mini_d2c'}/${ossPath || 'pics'}/${file.originalname}`.replace(/\/\//, '/');
        console.log(token, url, path);
        try {
            const result = await (0, rxjs_1.firstValueFrom)(this.httpService
                .post(url, {
                token,
                path,
                buffer: file.buffer,
            })
                .pipe((0, rxjs_1.catchError)((error) => {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            })));
            console.log('上传成功：', result.data);
            return result.data.fileID;
        }
        catch (error) {
            console.log('上传失败：', error);
            throw new common_1.HttpException('上传失败', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ToolService = ToolService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ToolService);
//# sourceMappingURL=tool.service.js.map