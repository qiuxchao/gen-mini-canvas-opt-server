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
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly width: number;

  @IsNotEmpty()
  @IsNumber()
  readonly height: number;

  @IsNotEmpty()
  @IsString()
  readonly json: string;
}
