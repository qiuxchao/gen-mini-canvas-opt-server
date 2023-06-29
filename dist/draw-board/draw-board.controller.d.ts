import { DrawBoardService } from './draw-board.service';
import { DrawBoardCreateDto } from './dto/draw-board-create.dto';
import { DrawBoardDeleteDto } from './dto/draw-board-delete.dto';
import { DrawBoardUpdateDto } from './dto/draw-board-update.dto';
import { DrawBoardDetailDto } from './dto/draw-board-detail.dto';
import { DrawBoard } from './draw-board.entity';
import { DrawBoardListDto } from './dto/draw-board-list.dto';
export declare class DrawBoardController {
    private readonly drawBoardService;
    constructor(drawBoardService: DrawBoardService);
    createDrawBoard(req: any, body: DrawBoardCreateDto): Promise<boolean>;
    getDrawBoardList(req: any, query: DrawBoardListDto): Promise<DrawBoard[]>;
    updateDrawBoard(req: any, body: DrawBoardUpdateDto): Promise<boolean>;
    deleteDrawBoard(req: any, body: DrawBoardDeleteDto): Promise<boolean>;
    getDrawBoardDetail(req: any, query: DrawBoardDetailDto): Promise<DrawBoard>;
}
