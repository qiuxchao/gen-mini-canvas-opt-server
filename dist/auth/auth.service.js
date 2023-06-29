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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/user.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../config/jwt.config");
const hashing_service_1 = require("./hashing.service");
let AuthService = exports.AuthService = class AuthService {
    constructor(userRepository, jwtService, jwtConfiguration, hashingService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.jwtConfiguration = jwtConfiguration;
        this.hashingService = hashingService;
    }
    async signIn(signInDto) {
        const { username, password } = signInDto;
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            throw new common_1.HttpException('用户不存在', common_1.HttpStatus.NOT_FOUND);
        }
        const isPasswordValid = await this.hashingService.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.HttpException('密码错误', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!user.isActive) {
            throw new common_1.HttpException('用户被禁用', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return await this.generateToken(user);
    }
    async generateToken(user) {
        const token = await this.signToken(user.id, {
            username: user.username,
        });
        return {
            token,
        };
    }
    async signToken(userId, payload) {
        return await this.jwtService.signAsync(Object.assign({ sub: userId }, payload), {
            secret: this.jwtConfiguration.secret,
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuer,
            expiresIn: this.jwtConfiguration.accessTokenTtl,
        });
    }
    async signUp(signUpDto) {
        const { username, password } = signUpDto, restSignUpDto = __rest(signUpDto, ["username", "password"]);
        const existingUser = await this.userRepository.findOne({
            where: { username },
        });
        if (existingUser) {
            throw new common_1.HttpException('用户已存在', common_1.HttpStatus.CONFLICT);
        }
        const hashedPassword = await this.hashingService.hash(password);
        const user = this.userRepository.create(Object.assign(Object.assign({}, restSignUpDto), { username, password: hashedPassword, createdTime: new Date().getTime(), updatedTime: new Date().getTime(), isActive: true }));
        await this.userRepository.save(user);
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, common_1.Inject)(jwt_config_1.default.KEY)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository,
        jwt_1.JwtService, void 0, hashing_service_1.HashingService])
], AuthService);
//# sourceMappingURL=auth.service.js.map