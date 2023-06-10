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
  @IsMongoId()
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
  @IsMongoId({ each: true })
  readonly excludeProjects: ObjectId[];
}
