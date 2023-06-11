import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

/** 创建画板DTO */
export class DrawBoardCreateDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly projectId: string;

  @IsNotEmpty()
  @IsNumber()
  readonly width: number;

  @IsNotEmpty()
  @IsNumber()
  readonly height: number;
}
