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
exports.UserExcludeProjectDto = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
class UserExcludeProjectDto {
}
exports.UserExcludeProjectDto = UserExcludeProjectDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)({
        message: '用户 ID 无效',
    }),
    __metadata("design:type", typeorm_1.ObjectId)
], UserExcludeProjectDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)([1, 2]),
    __metadata("design:type", Number)
], UserExcludeProjectDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)({ message: 'ID有误', each: true }),
    __metadata("design:type", Array)
], UserExcludeProjectDto.prototype, "excludeProjects", void 0);
//# sourceMappingURL=user-exclude-project-dto.js.map