"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpFilter = void 0;
const common_1 = require("@nestjs/common");
const msgMap = {
    401: '未授权，请重新登录',
    403: '没有权限，请联系管理员',
};
let HttpFilter = exports.HttpFilter = class HttpFilter {
    catch(exception, host) {
        console.log('HttpFilter catch: ', exception.getResponse());
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        response.status(200).json({
            code: status,
            data: null,
            message: msgMap[status] || exception.message || '系统繁忙，请稍后再试～',
            success: false,
            path: request.url,
        });
    }
};
exports.HttpFilter = HttpFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpFilter);
//# sourceMappingURL=catchFilters.js.map