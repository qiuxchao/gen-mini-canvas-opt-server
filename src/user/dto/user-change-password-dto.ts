import { IsNotEmpty, IsString, Length } from 'class-validator';

/** 用户修改密码DTO */
export class UserChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
  readonly oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
  readonly newPassword: string;
}
