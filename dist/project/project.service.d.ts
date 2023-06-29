import { Project } from './project.entity';
import { MongoRepository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { DrawBoard } from 'src/draw-board/draw-board.entity';
import { ProjectCreateDto } from './dto/project-create.dto';
import { ProjectUpdateDto } from './dto/project-update.dto';
export declare class ProjectService {
    private readonly projectRepository;
    private readonly drawBroadRepository;
    constructor(projectRepository: MongoRepository<Project>, drawBroadRepository: MongoRepository<DrawBoard>);
    createProject(body: ProjectCreateDto): Promise<boolean>;
    getProjectList(user: User): Promise<Project[]>;
    updateProject(body: ProjectUpdateDto): Promise<boolean>;
    deleteProject(ids: string[]): Promise<boolean>;
    getProjectInfo(id: string): Promise<Project>;
}
