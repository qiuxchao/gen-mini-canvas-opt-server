import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { User } from 'src/user/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: MongoRepository<Project>,
  ) {}

  /** 新建项目 */
  async createProject(name: string): Promise<boolean> {
    const project = this.projectRepository.create({
      name,
      covers: [],
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
    return projects.filter(
      (project) => !excludeProjects.includes(project.id.toString()),
    );
  }

  /** 更新项目 */
  async updateProject(id: ObjectId, name: string): Promise<boolean> {
    const project = await this.projectRepository.findOne(new ObjectId(id));
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
