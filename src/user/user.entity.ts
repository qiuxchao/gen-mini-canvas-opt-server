import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';
import { Exclude } from 'class-transformer';

/** 权限
 * - `delete`: 删除（有此权限才能删除项目和画板）
 */
type Permission = 'delete';

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
  permissions: Permission[];

  /** 不拥有的项目（项目id列表） */
  @Column()
  @Exclude()
  excludeProjects: ObjectId[];

  /** 是否激活 */
  @Column({ default: true })
  @Exclude()
  isActive: boolean;

  @Column({
    default: Date.now(),
    update: false, // 不更新
  })
  /** 创建时间 */
  createTime: number;

  @Column({
    default: Date.now(),
  })
  /** 更新时间 */
  updateTime: number;
}
