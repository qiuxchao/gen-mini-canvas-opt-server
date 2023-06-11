import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsMongoId,
} from 'class-validator';
import { ObjectId } from 'typeorm';
import { UserPermission } from '../user.entity';

/** 更新用户DTO */
export class UserUpdateDto {
  @IsNotEmpty()
  @IsMongoId({
    message: '用户 ID 无效',
  })
  readonly id: ObjectId;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly username: string;

  @IsOptional()
  @IsString()
  readonly password: string;

  @IsOptional()
  @IsBoolean()
  readonly isActive: boolean;

  @IsOptional()
  @IsString({ each: true })
  permissions: UserPermission[];

  @IsOptional()
  @IsMongoId({ message: 'ID有误', each: true })
  readonly excludeProjects: string[];
}
