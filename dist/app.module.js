"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const Joi = require("joi");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const project_module_1 = require("./project/project.module");
const draw_board_module_1 = require("./draw-board/draw-board.module");
const tool_module_1 = require("./tool/tool.module");
console.log(process.env);
const IS_TEST_ENV = process.env.NODE_ENV === '' ? false : false;
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                validationSchema: Joi.object({
                    DB_HOST: Joi.string().required(),
                    DB_PORT: Joi.number().default(27017),
                    DB_DATABASE: Joi.string().required(),
                    DB_URL: Joi.string().required(),
                    JWT_SECRET: Joi.string().required(),
                    JWT_TOKEN_AUDIENCE: Joi.string().required(),
                    JWT_TOKEN_ISSUER: Joi.string().required(),
                    JWT_ACCESS_TOKEN_TTL: Joi.number().default(3600),
                }),
                envFilePath: ['.env', '.env.local'],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ({
                    type: 'mongodb',
                    url: IS_TEST_ENV ? 'mongodb://localhost:27017' : process.env.DB_URL,
                    database: IS_TEST_ENV
                        ? 'mini-canvas-options'
                        : process.env.DB_DATABASE,
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: true,
                    useUnifiedTopology: true,
                }),
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            project_module_1.ProjectModule,
            draw_board_module_1.DrawBoardModule,
            tool_module_1.ToolModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map