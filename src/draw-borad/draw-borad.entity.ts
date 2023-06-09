import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('draw-borad')
export class DrawBorad {
  @ObjectIdColumn()
  id: ObjectId;

  /** 画板名 */
  @Column()
  name: string;

  /** 封面 */
  @Column()
  cover: string;

  /** 所属项目id */
  @ObjectIdColumn()
  @Exclude()
  projectId: ObjectId;

  /** 所属项目名称 */
  @Column()
  @Exclude()
  projectName: string;

  /** 画板宽度 */
  @Column()
  @Exclude()
  width: number;

  /** 画板高度 */
  @Column()
  @Exclude()
  height: number;

  /** 画板数据(json字符串) */
  @Column()
  @Exclude()
  data: string;

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
