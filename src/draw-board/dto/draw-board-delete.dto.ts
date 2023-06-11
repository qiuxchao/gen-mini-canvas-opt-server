import { IsMongoId, IsNotEmpty } from 'class-validator';

/** 删除画板DTO */
export class DrawBoardDeleteDto {
  @IsNotEmpty()
  @IsMongoId({
    message: '画板 ID 无效',
  })
  readonly id: string;
}
