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

  /** 创建时间 */
  @Column({
    default: Date.now(),
    update: false,
  })
  createTime: number;

  /** 更新时间 */
  @Column({
    default: Date.now(),
  })
  updateTime: number;
}
