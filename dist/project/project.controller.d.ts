import { ProjectService } from './project.service';
import { ProjectCreateDto } from './dto/project-create.dto';
import { Project } from './project.entity';
import { ProjectUpdateDto } from './dto/project-update.dto';
import { ProjectDeleteDto } from './dto/project-delete.dto';
import { ProjectInfoDto } from './dto/project-info-dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    createProject(body: ProjectCreateDto): Promise<boolean>;
    getProjectList(request: any): Promise<Project[]>;
    updateProject(body: ProjectUpdateDto): Promise<boolean>;
    deleteProject(body: ProjectDeleteDto): Promise<boolean>;
    getProjectInfo(query: ProjectInfoDto): Promise<Project>;
}
