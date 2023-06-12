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
  covers: string[];

  /** 项目下画板的数量 */
  @Column()
  boardCount: number;

  /** 创建时间 */
  @Column({
    default: Date.now(),
    update: false,
  })
  createdTime: number;

  /** 更新时间 */
  @Column({
    default: Date.now(),
  })
  updatedTime: number;
}
