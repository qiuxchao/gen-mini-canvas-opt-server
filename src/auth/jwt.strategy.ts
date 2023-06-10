import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ActiveUserData } from './interface/active-user-data.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

/** JWT 策略 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头中获取token
      ignoreExpiration: false, // 不忽略过期时间
      secretOrKey: process.env.JWT_SECRET, // 密钥
    });
  }

  // 验证完成后将调用此方法，将此方法的返回值注入到请求对象中
  // 如：@Req() request，request.user 就是此处返回的对象
  async validate(payload: ActiveUserData) {
    console.log('JwtStrategy validate: ', payload);
    const user = await this.userRepository.findOneBy(new ObjectId(payload.sub));
    console.log('JwtStrategy validate user: ', user);
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.NOT_FOUND);
    }
    if (user.isActive === false) {
      throw new HttpException('用户被禁用', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
