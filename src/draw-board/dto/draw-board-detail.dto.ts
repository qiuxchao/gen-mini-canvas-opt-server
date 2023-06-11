import { IsMongoId, IsNotEmpty } from 'class-validator';

/** 获取画板详情DTO */
export class DrawBoardDetailDto {
  @IsNotEmpty()
  @IsMongoId({
    message: '画板 ID 无效',
  })
  readonly id: string;
}
