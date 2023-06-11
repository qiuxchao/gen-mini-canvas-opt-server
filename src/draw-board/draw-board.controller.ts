import { Controller } from '@nestjs/common';
import { DrawBoardService } from './draw-board.service';

@Controller('draw-board')
export class DrawBoardController {
  constructor(private readonly drawBoradService: DrawBoardService) {}
}
