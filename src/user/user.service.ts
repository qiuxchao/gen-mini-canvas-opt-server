import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { UserPermissionDto } from './dto/user-permission.dto';
import { UserExcludeProjectDto } from './dto/user-exclude-project-dto';
import { UserUpdateDto } from './dto/user-update-dto';
import { UserChangePasswordDto } from './dto/user-change-password-dto';
import { HashingService } from 'src/auth/hashing.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
    private readonly hashingService: HashingService,
  ) {}

  /** 获取用户列表 */
  async getUserList(): Promise<User[]> {
    return this.userRepository.find();
  }

  /** 更新用户 */
  async updateUser(newUser: UserUpdateDto): Promise<User> {
    console.log(newUser);
    const { id, ...restUser } = newUser;
    const user = await this.userRepository.findOne(new ObjectId(id));
    if (!user) throw new HttpException('用户不存在', HttpStatus.NOT_FOUND);
    Object.keys(restUser).forEach((key) => {
      user[key] = restUser[key];
    });
    delete user.id;
    await this.userRepository.update(id, {
      ...user,
      updatedTime: new Date().getTime(),
    });
    return this.userRepository.findOne(new ObjectId(id));
  }

  /** 删除用户 */
  async deleteUser(ownerId: ObjectId, id: ObjectId): Promise<any> {
    if (ownerId.toString() === id.toString())
      throw new HttpException('不能删除自己', HttpStatus.BAD_REQUEST);
    const user = await this.userRepository.findOne(new ObjectId(id));
    if (!user) throw new HttpException('用户不存在', HttpStatus.NOT_FOUND);
    await this.userRepository.delete(id);
    return true;
  }

  /** 设置用户权限 */
  async setPermission(body: UserPermissionDto): Promise<any> {
    const { id, type, permissions } = body;
    const user = await this.userRepository.findOne(new ObjectId(id));
    if (!user) throw new HttpException('用户不存在', HttpStatus.NOT_FOUND);
    delete user.id;
    await this.userRepository.update(id, {
      ...user,
      permissions:
        type === 1
          ? [...new Set([...user.permissions, ...permissions])]
          : user.permissions.filter(
              (permission) => !permissions.includes(permission),
            ),
      updatedTime: new Date().getTime(),
    });
    return true;
  }

  /** 设置不拥有的项目 */
  async setExcludeProjects(body: UserExcludeProjectDto): Promise<any> {
    const { id, type, excludeProjects } = body;
    const user = await this.userRepository.findOne(new ObjectId(id));
    if (!user) throw new HttpException('用户不存在', HttpStatus.NOT_FOUND);
    delete user.id;
    await this.userRepository.update(id, {
      ...user,
      excludeProjects:
        type === 1
          ? [...new Set([...user.excludeProjects, ...excludeProjects])]
          : user.excludeProjects.filter(
              (excludeProject) => !excludeProjects.includes(excludeProject),
            ),
      updatedTime: new Date().getTime(),
    });
    return true;
  }

  /** 修改密码 */
  async changePassword(user: User, body: UserChangePasswordDto): Promise<any> {
    const { oldPassword, newPassword } = body;
    const isPasswordValid = await this.hashingService.compare(
      oldPassword,
      user.password,
    );
    if (!isPasswordValid)
      throw new HttpException('旧密码错误', HttpStatus.BAD_REQUEST);
    const hashedPassword = await this.hashingService.hash(newPassword);
    const { id, ...restUser } = user;
    await this.userRepository.update(id, {
      ...restUser,
      password: hashedPassword,
      updatedTime: new Date().getTime(),
    });
    return true;
  }
}
