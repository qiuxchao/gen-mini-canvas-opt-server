import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'typeorm';

/** 操作用户DTO */
export class UserOperateDto {
  @IsNotEmpty()
  @IsMongoId({
    message: '用户 ID 无效',
  })
  readonly id: ObjectId;
}
