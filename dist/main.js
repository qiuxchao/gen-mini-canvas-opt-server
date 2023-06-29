"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const response_1 = require("./common/interceptors/response");
const catchFilters_1 = require("./common/interceptors/catchFilters");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalInterceptors(new response_1.Response());
    app.useGlobalFilters(new catchFilters_1.HttpFilter());
    await app.listen(process.env.PORT || 6923);
}
bootstrap();
//# sourceMappingURL=main.js.map