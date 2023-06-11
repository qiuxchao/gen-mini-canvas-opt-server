import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'typeorm';

/** 更新项目DTO */
export class ProjectUpdateDto {
  @IsNotEmpty()
  @IsMongoId({
    message: '项目 ID 无效',
  })
  readonly id: ObjectId;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
