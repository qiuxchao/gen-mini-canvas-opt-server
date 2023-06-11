import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { DrawBoardService } from './draw-board.service';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { DrawBoardCreateDto } from './dto/draw-board-create.dto';
import { DrawBoardDeleteDto } from './dto/draw-board-delete.dto';
import { DrawBoardUpdateDto } from './dto/draw-board-update.dto';
import { DrawBoardDetailDto } from './dto/draw-board-detail.dto';
import { plainToClass } from 'class-transformer';
import { Permission } from 'src/common/decorators/permission.decorator';
import { DrawBoard } from './draw-board.entity';
import { DrawBoardListDto } from './dto/draw-board-list.dto';

@Controller('draw-board')
export class DrawBoardController {
  constructor(private readonly drawBoardService: DrawBoardService) {}

  /** 新建画板 */
  @Post('create')
  async createDrawBoard(
    @Req() req,
    @Body(ValidationPipe) body: DrawBoardCreateDto,
  ): Promise<boolean> {
    return this.drawBoardService.createDrawBoard(req.user, body);
  }

  /** 获取画板列表 */
  @Get('list')
  async getDrawBoardList(
    @Req() req,
    @Query(ValidationPipe) query: DrawBoardListDto,
  ): Promise<DrawBoard[]> {
    const drawBoards = await this.drawBoardService.getDrawBoardList(
      req.user,
      query.projectId,
    );
    return drawBoards.map((drawBoard) =>
      Object.assign(new DrawBoard(), plainToClass(DrawBoard, drawBoard)),
    );
  }

  /** 更新画板 */
  @Post('update')
  async updateDrawBoard(
    @Req() req,
    @Body(ValidationPipe) body: DrawBoardUpdateDto,
  ): Promise<boolean> {
    return this.drawBoardService.updateDrawBoard(req.user, body);
  }

  /** 删除画板 */
  @Permission('draw-board:delete')
  @Post('delete')
  deleteDrawBoard(
    @Req() req,
    @Body(ValidationPipe) body: DrawBoardDeleteDto,
  ): Promise<boolean> {
    const { ids } = body;
    return this.drawBoardService.deleteDrawBoard(req.user, ids);
  }

  /** 获取画板详情 */
  @Get('detail')
  async getDrawBoardDetail(
    @Req() req,
    @Query(ValidationPipe) query: DrawBoardDetailDto,
  ): Promise<DrawBoard> {
    const { id } = query;
    return this.drawBoardService.getDrawBoardDetail(req.user, id);
  }
}
