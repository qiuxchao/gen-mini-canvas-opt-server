import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  /** 获取用户列表 */
  async getUserList(): Promise<User[]> {
    return this.userRepository.find();
  }

  /** 更新用户 */
  async updateUser(user: User): Promise<User> {
    await this.userRepository.update(user.id, user);
    return this.userRepository.findOne(new ObjectId(user.id));
  }

  /** 删除用户 */
  async deleteUser(id: ObjectId): Promise<any> {
    return this.userRepository.delete(id);
  }

  /** 根据id获取用户 */
  async getUserById(id: ObjectId): Promise<User> {
    const result = await this.userRepository.findOneBy(new ObjectId(id));
    return result;
  }
}
