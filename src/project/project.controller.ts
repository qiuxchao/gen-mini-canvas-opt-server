import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectCreateDto } from './dto/project-create.dto';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { Project } from './project.entity';
import { ProjectUpdateDto } from './dto/project-update.dto';
import { Permission } from 'src/common/decorators/permission.decorator';
import { ProjectDeleteDto } from './dto/project-delete.dto';
import { ProjectInfoDto } from './dto/project-info-dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  /** 新建项目 */
  @Permission('project:create')
  @Post('create')
  async createProject(
    @Body(ValidationPipe) body: ProjectCreateDto,
  ): Promise<boolean> {
    return this.projectService.createProject(body);
  }

  /** 获取项目列表 */
  @Get('list')
  async getProjectList(@Req() request): Promise<Project[]> {
    return this.projectService.getProjectList(request.user);
  }

  /** 更新项目 */
  @Permission('project:update')
  @Post('update')
  async updateProject(
    @Body(ValidationPipe) body: ProjectUpdateDto,
  ): Promise<boolean> {
    return this.projectService.updateProject(body);
  }

  /** 删除项目 */
  @Permission('project:delete')
  @Post('delete')
  deleteProject(
    @Body(ValidationPipe) body: ProjectDeleteDto,
  ): Promise<boolean> {
    const { ids } = body;
    return this.projectService.deleteProject(ids);
  }

  /** 获取项目信息 */
  @Get('info')
  async getProjectInfo(
    @Query(ValidationPipe) query: ProjectInfoDto,
  ): Promise<Project> {
    const { id } = query;
    return this.projectService.getProjectInfo(id);
  }
}
