import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity('project')
export class Project {
  @ObjectIdColumn()
  id: ObjectId;

  /** 项目名 */
  @Column()
  name: string;

  /** 项目封面列表 */
  @Column()
  permissions: string[];

  @Column({
    default: Date.now(),
    update: false,
  })
  /** 创建时间 */
  createTime: number;

  @Column({
    default: Date.now(),
  })
  /** 更新时间 */
  updateTime: number;
}
