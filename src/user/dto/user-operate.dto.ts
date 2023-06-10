import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'typeorm';

/** 操作用户DTO */
export class UserOperateDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly id: ObjectId;
}
