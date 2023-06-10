import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { plainToClass } from 'class-transformer';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { UserOperateDto } from './dto/user-operate.dto';
import { Permission } from 'src/common/decorators/permission.decorator';
import { UserPermissionDto } from './dto/user-permission.dto';
import { UserExcludeProjectDto } from './dto/user-exclude-project-dto';
import { UserUpdateDto } from './dto/user-update-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** 获取用户列表 */
  @Permission('user:list')
  @Get('list')
  async getUserList(): Promise<User[]> {
    const users = await this.userService.getUserList();
    // 排除 password 字段
    return users.map((user) =>
      Object.assign(new User(), plainToClass(User, user)),
    );
  }

  /** 更新用户 */
  @Permission('user:update')
  @Post('update')
  async updateUser(@Body(ValidationPipe) body: UserUpdateDto): Promise<User> {
    const user = await this.userService.updateUser(body);
    // 排除 password 字段
    return Object.assign(new User(), plainToClass(User, user));
  }

  /** 删除用户 */
  @Permission('user:delete')
  @Post('delete')
  deleteUser(
    @Req() request,
    @Body(ValidationPipe) body: UserOperateDto,
  ): Promise<any> {
    const { id } = body;
    return this.userService.deleteUser(request.user.id, id);
  }

  /** 获取用户信息 */
  @Get('info')
  async getUserById(@Req() request): Promise<User> {
    // 排除 password 字段
    return Object.assign(new User(), plainToClass(User, request.user));
  }

  /** 设置用户权限 */
  @Permission('user:permission')
  @Post('permission')
  userPermission(@Body(ValidationPipe) body: UserPermissionDto): Promise<any> {
    return this.userService.setPermission(body);
  }

  /** 设置不拥有的项目 */
  @Permission('user:exclude-project')
  @Post('exclude-projects')
  userExcludeProject(
    @Body(ValidationPipe) body: UserExcludeProjectDto,
  ): Promise<any> {
    return this.userService.setExcludeProjects(body);
  }
}
