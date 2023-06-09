import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'typeorm';

export class OperateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly id: ObjectId;
}
