import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';
import { Exclude } from 'class-transformer';

/** 权限
 * - `user:list`: 查看用户列表
 * - `user:delete`: 删除用户
 * - `user:update`: 更新用户
 * - `user:create`: 创建用户
 * - `user:permission`: 设置用户权限
 * - `user:exclude-project`: 设置不拥有的项目
 * - `project:delete`: 删除项目
 * - `draw:delete`: 删除画板
 */
export type UserPermission =
  | 'user:list'
  | 'user:delete'
  | 'user:update'
  | 'user:create'
  | 'user:permission'
  | 'user:exclude-project'
  | 'project:delete'
  | 'draw:delete';

@Entity('user')
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  /** 账号 */
  @Column()
  username: string;

  /** 密码 */
  @Column()
  @Exclude()
  password: string;

  /** 姓名 */
  @Column()
  name: string;

  /** 权限 */
  @Column()
  permissions: UserPermission[];

  /** 不拥有的项目（项目id列表） */
  @Column()
  @Exclude()
  excludeProjects: ObjectId[];

  /** 是否激活 */
  @Column({ default: true })
  @Exclude()
  isActive: boolean;

  /** 创建时间 */
  @Column({
    default: Date.now(),
    update: false, // 不更新
  })
  createTime: number;

  /** 更新时间 */
  @Column({
    default: Date.now(),
  })
  updateTime: number;
}
