import { IsMongoId, IsNotEmpty } from 'class-validator';

/** 获取画板列表DTO */
export class DrawBoardListDto {
  @IsNotEmpty()
  @IsMongoId({
    message: '项目 ID 无效',
  })
  readonly projectId: string;
}
