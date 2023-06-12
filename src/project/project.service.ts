import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { User } from 'src/user/user.entity';
import { DrawBoard } from 'src/draw-board/draw-board.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: MongoRepository<Project>,
    @InjectRepository(DrawBoard)
    private readonly drawBroadRepository: MongoRepository<DrawBoard>,
  ) {}

  /** 新建项目 */
  async createProject(name: string): Promise<boolean> {
    const project = this.projectRepository.create({
      name,
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
    for (const project of list) {
      project.boardCount = await this.drawBroadRepository.count({
        projectId: project.id.toString(),
      });
      const covers = await this.drawBroadRepository.find({
        where: { projectId: project.id.toString() },
        order: { updatedTime: 'DESC' },
        take: 2,
        select: ['cover'],
      });
      project.covers = covers
        .filter((cover) => Boolean(cover.cover))
        .map((cover) => cover.cover);
    }
    return list;
  }

  /** 更新项目 */
  async updateProject(id: ObjectId, name: string): Promise<boolean> {
    const project = await this.projectRepository.findOne(new ObjectId(id));
    if (!project) throw new HttpException('项目不存在', HttpStatus.NOT_FOUND);
    project.name = name;
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
}
