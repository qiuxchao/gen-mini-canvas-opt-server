import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

/** 更新画板DTO */
export class DrawBoardUpdateDto {
  @IsNotEmpty()
  @IsMongoId({
    message: '画板 ID 无效',
  })
  readonly id: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  readonly width: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  readonly height: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly json: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly cover: string;
}
