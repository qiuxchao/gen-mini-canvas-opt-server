"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('jwt', () => {
    var _a;
    return ({
        secret: process.env.JWT_SECRET,
        audience: process.env.JWT_TOKEN_AUDIENCE,
        issuer: process.env.JWT_TOKEN_ISSUER,
        accessTokenTtl: parseInt((_a = process.env.JWT_ACCESS_TOKEN_TTL) !== null && _a !== void 0 ? _a : '3600', 10),
    });
});
//# sourceMappingURL=jwt.config.js.map