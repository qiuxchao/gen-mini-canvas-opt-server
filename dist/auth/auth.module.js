"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/user.entity");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const jwt_config_1 = require("../config/jwt.config");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const jwt_strategy_1 = require("./jwt.strategy");
const hashing_service_1 = require("./hashing.service");
const permission_guard_1 = require("./guards/permission.guard");
let AuthModule = exports.AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            passport_1.PassportModule,
            config_1.ConfigModule.forFeature(jwt_config_1.default),
            jwt_1.JwtModule.registerAsync(jwt_config_1.default.asProvider()),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: permission_guard_1.PermissionGuard,
            },
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            hashing_service_1.HashingService,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map