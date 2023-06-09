import { IsNotEmpty, IsString, Length } from 'class-validator';
import { UserPermission } from 'src/user/user.entity';
import { ObjectId } from 'typeorm';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString({ each: true })
  readonly permissions: UserPermission[];

  @IsNotEmpty()
  @IsString({ each: true })
  readonly excludeProjects: ObjectId[];
}
