import { DrawBoard } from './draw-board.entity';
import { MongoRepository } from 'typeorm';
import { Project } from 'src/project/project.entity';
import { DrawBoardCreateDto } from './dto/draw-board-create.dto';
import { User } from 'src/user/user.entity';
import { DrawBoardUpdateDto } from './dto/draw-board-update.dto';
export declare class DrawBoardService {
    private readonly drawBroadRepository;
    private readonly projectRepository;
    constructor(drawBroadRepository: MongoRepository<DrawBoard>, projectRepository: MongoRepository<Project>);
    createDrawBoard(user: User, body: DrawBoardCreateDto): Promise<boolean>;
    getDrawBoardList(user: User, id: string): Promise<DrawBoard[]>;
    updateDrawBoard(user: User, body: DrawBoardUpdateDto): Promise<boolean>;
    deleteDrawBoard(user: User, ids: string[]): Promise<boolean>;
    getDrawBoardDetail(user: User, id: string): Promise<DrawBoard>;
    syncProjectsData(projectIds: string[]): Promise<void>;
    updateProjectData(projectId: string): Promise<void>;
}
