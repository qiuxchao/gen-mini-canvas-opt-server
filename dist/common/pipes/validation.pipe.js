"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let ValidationPipe = exports.ValidationPipe = class ValidationPipe {
    async transform(value, metadata) {
        const DTO = (0, class_transformer_1.plainToInstance)(metadata.metatype, value);
        console.log('Pipe DTO: ', DTO);
        const errors = await (0, class_validator_1.validate)(DTO, {
            whitelist: true,
        });
        if (errors.length) {
            console.log('Pipe errors: ', errors);
            throw new common_1.HttpException(`参数错误：\n${errors
                .map((error) => JSON.stringify(error.constraints))
                .join('\n')}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return DTO;
    }
};
exports.ValidationPipe = ValidationPipe = __decorate([
    (0, common_1.Injectable)()
], ValidationPipe);
//# sourceMappingURL=validation.pipe.js.map