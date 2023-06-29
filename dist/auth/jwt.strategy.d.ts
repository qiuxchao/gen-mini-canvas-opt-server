import { Strategy } from 'passport-jwt';
import { ActiveUserData } from './interface/active-user-data.interface';
import { User } from 'src/user/user.entity';
import { MongoRepository } from 'typeorm';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userRepository;
    constructor(userRepository: MongoRepository<User>);
    validate(payload: ActiveUserData): Promise<User>;
}
export {};
