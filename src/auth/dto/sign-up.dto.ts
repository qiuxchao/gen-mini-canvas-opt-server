import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';
import { UserPermission } from 'src/user/user.entity';
import { ObjectId } from 'typeorm';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString({ each: true })
  readonly permissions: UserPermission[];

  @IsNotEmpty()
  @IsMongoId({ message: 'ID有误', each: true })
  readonly excludeProjects: string[];
}
