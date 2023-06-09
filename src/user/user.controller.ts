import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { plainToClass } from 'class-transformer';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { OperateUserDto } from './dto/operate-user.dto';
import { ActiveUserData } from 'src/auth/interface/active-user-data.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** 获取用户列表 */
  @Get('list')
  async getUserList(@Req() request: { user: ActiveUserData }): Promise<User[]> {
    const {
      user: { permissions = [] },
    } = request;
    console.log('permissions: ', permissions);
    // 写个装饰器，判断是否有权限，不能从token中获取，因为后期可能会修改权限
    if (!permissions.includes('user')) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const users = await this.userService.getUserList();
    // 排除 password 字段
    return users.map((user) =>
      Object.assign(new User(), plainToClass(User, user)),
    );
  }

  /** 更新用户 */
  @Post('update')
  updateUser(@Body() body: User): Promise<User> {
    return this.userService.updateUser(body);
  }

  /** 删除用户 */
  @Post('delete')
  deleteUser(@Body(ValidationPipe) body: OperateUserDto): Promise<any> {
    return this.userService.deleteUser(body.id);
  }

  /** 获取用户信息 */
  @Get('info')
  async getUserById(@Req() request): Promise<User> {
    const user = await this.userService.getUserById(request.user.userId);
    // 排除 password 字段
    return Object.assign(new User(), plainToClass(User, user));
  }
}
