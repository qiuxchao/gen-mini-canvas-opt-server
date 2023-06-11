import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('draw-board')
export class DrawBoard {
  @ObjectIdColumn()
  id: ObjectId;

  /** 画板名 */
  @Column()
  name: string;

  /** 封面 */
  @Column()
  cover: string;

  /** 所属项目id */
  @Column()
  @Exclude()
  projectId: string;

  /** 所属项目名称 */
  @Column()
  @Exclude()
  projectName: string;

  /** 画板宽度 */
  @Column({
    default: 375,
  })
  @Exclude()
  width: number;

  /** 画板高度 */
  @Column({
    default: 600,
  })
  @Exclude()
  height: number;

  /** 画板数据(json字符串) */
  @Column()
  @Exclude()
  json: string;

  /** 操作人列表 */
  @Column('json')
  operators: {
    /** 操作人id */
    id: ObjectId;
    /** 操作人姓名 */
    name: string;
  }[];

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
