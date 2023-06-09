import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  readonly password: string;
}
