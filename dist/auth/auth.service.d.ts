import { User } from 'src/user/user.entity';
import { MongoRepository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { HashingService } from './hashing.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    private readonly jwtConfiguration;
    private readonly hashingService;
    constructor(userRepository: MongoRepository<User>, jwtService: JwtService, jwtConfiguration: ConfigType<typeof jwtConfig>, hashingService: HashingService);
    signIn(signInDto: SignInDto): Promise<{
        token: string;
    }>;
    generateToken(user: User): Promise<{
        token: string;
    }>;
    private signToken;
    signUp(signUpDto: SignUpDto): Promise<void>;
}
