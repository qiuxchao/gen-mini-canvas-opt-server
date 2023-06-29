"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const response_1 = require("./common/interceptors/response");
const catchFilters_1 = require("./common/interceptors/catchFilters");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authentication, Access-control-allow-credentials, Access-control-allow-headers, Access-control-allow-methods, Access-control-allow-origin, User-Agent, Referer, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Cache-Control, Pragma, Authorization',
    });
    app.useGlobalInterceptors(new response_1.Response());
    app.useGlobalFilters(new catchFilters_1.HttpFilter());
    await app.listen(process.env.PORT || 6923);
}
bootstrap();
//# sourceMappingURL=main.js.map