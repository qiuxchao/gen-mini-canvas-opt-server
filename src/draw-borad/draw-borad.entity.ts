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
  @Column()
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
