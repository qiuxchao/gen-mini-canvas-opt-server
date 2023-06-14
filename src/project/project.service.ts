import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { User } from 'src/user/user.entity';
import { DrawBoard } from 'src/draw-board/draw-board.entity';
import { ProjectCreateDto } from './dto/project-create.dto';
import { ProjectUpdateDto } from './dto/project-update.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: MongoRepository<Project>,
    @InjectRepository(DrawBoard)
    private readonly drawBroadRepository: MongoRepository<DrawBoard>,
  ) {}

  /** 新建项目 */
  async createProject(body: ProjectCreateDto): Promise<boolean> {
    const { name, ossBucket = '', ossPath = '', ossDomain = '' } = body;
    const project = this.projectRepository.create({
      name,
      ossBucket,
      ossPath,
      ossDomain,
      covers: [],
      boardCount: 0,
      createdTime: Date.now(),
      updatedTime: Date.now(),
    });
    await this.projectRepository.save(project);
    return true;
  }

  /** 获取项目列表 */
  async getProjectList(user: User): Promise<Project[]> {
    const { excludeProjects } = user;
    const projects = await this.projectRepository.find({
      order: { updatedTime: 'DESC' },
    });

    const list = projects.filter(
      (project) => !excludeProjects.includes(project.id.toString()),
    );
    return list;
  }

  /** 更新项目 */
  async updateProject(body: ProjectUpdateDto): Promise<boolean> {
    const { id, name, ossBucket = '', ossPath = '', ossDomain = '' } = body;
    const project = await this.projectRepository.findOne(new ObjectId(id));
    if (!project) throw new HttpException('项目不存在', HttpStatus.NOT_FOUND);
    project.name = name;
    project.ossBucket = ossBucket;
    project.ossPath = ossPath;
    project.ossDomain = ossDomain;
    project.updatedTime = Date.now();
    await this.projectRepository.save(project);
    return true;
  }

  /** 删除项目 */
  async deleteProject(ids: string[]): Promise<boolean> {
    await this.projectRepository.deleteMany({
      _id: { $in: ids.map((id) => new ObjectId(id)) },
    });
    return true;
  }

  /** 获取项目信息 */
  async getProjectInfo(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne(new ObjectId(id));
    if (!project) throw new HttpException('项目不存在', HttpStatus.NOT_FOUND);
    return project;
  }
}
