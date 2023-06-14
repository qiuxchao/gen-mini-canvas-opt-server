import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DrawBoard } from './draw-board.entity';
import { MongoRepository } from 'typeorm';
import { Project } from 'src/project/project.entity';
import { ObjectId } from 'mongodb';
import { DrawBoardCreateDto } from './dto/draw-board-create.dto';
import { User } from 'src/user/user.entity';
import { DrawBoardUpdateDto } from './dto/draw-board-update.dto';

@Injectable()
export class DrawBoardService {
  constructor(
    @InjectRepository(DrawBoard)
    private readonly drawBroadRepository: MongoRepository<DrawBoard>,
    @InjectRepository(Project)
    private readonly projectRepository: MongoRepository<Project>,
  ) {}

  /** 新建画板 */
  async createDrawBoard(
    user: User,
    body: DrawBoardCreateDto,
  ): Promise<boolean> {
    const { name, projectId, width, height } = body;
    if (user.excludeProjects.includes(projectId))
      throw new HttpException('无权限', HttpStatus.FORBIDDEN);
    const drawBoard = this.drawBroadRepository.create({
      name,
      cover: '',
      json: '[]',
      width: width || 375,
      height: height || 667,
      createdTime: Date.now(),
      updatedTime: Date.now(),
      projectId,
      operators: [
        {
          id: user.id,
          name: user.name,
        },
      ],
    });
    await this.drawBroadRepository.save(drawBoard);
    this.syncProjectsData([projectId]);
    return true;
  }

  /** 获取画板列表 */
  async getDrawBoardList(user: User, id: string): Promise<DrawBoard[]> {
    if (user.excludeProjects.includes(id))
      throw new HttpException('无权限', HttpStatus.FORBIDDEN);
    return this.drawBroadRepository.find({
      where: { projectId: id },
      order: { updatedTime: 'DESC' },
    });
  }

  /** 更新画板 */
  async updateDrawBoard(
    user: User,
    body: DrawBoardUpdateDto,
  ): Promise<boolean> {
    const { id, ...restBody } = body;
    const drawBoard = await this.drawBroadRepository.findOne(new ObjectId(id));
    if (!drawBoard) throw new HttpException('画板不存在', HttpStatus.NOT_FOUND);
    if (user.excludeProjects.includes(drawBoard.projectId))
      throw new HttpException('无权限', HttpStatus.FORBIDDEN);
    Object.keys(restBody).forEach((key) => {
      drawBoard[key] = body[key];
    });
    drawBoard.updatedTime = Date.now();
    drawBoard.operators = [
      {
        id: user.id,
        name: user.name,
      },
      ...drawBoard.operators.filter(
        (item) => item.id.toString() !== user.id.toString(),
      ),
    ];
    await this.drawBroadRepository.save(drawBoard);
    this.syncProjectsData([drawBoard.projectId]);
    return true;
  }

  /** 删除画板 */
  async deleteDrawBoard(user: User, ids: string[]): Promise<boolean> {
    const drawBoards = await this.drawBroadRepository.find({
      _id: { $in: ids.map((id) => new ObjectId(id)) },
    });
    if (drawBoards.length !== ids.length)
      throw new HttpException('画板不存在', HttpStatus.NOT_FOUND);
    const projectIds = drawBoards.map((item) => item.projectId);
    if (user.excludeProjects.some((id) => projectIds.includes(id)))
      throw new HttpException('无权限', HttpStatus.FORBIDDEN);
    await this.drawBroadRepository.deleteMany({
      _id: { $in: ids.map((id) => new ObjectId(id)) },
    });
    this.syncProjectsData(projectIds);
    return true;
  }

  /** 获取画板详情 */
  async getDrawBoardDetail(user: User, id: string): Promise<DrawBoard> {
    const drawBoard = await this.drawBroadRepository.findOne(new ObjectId(id));
    if (!drawBoard) throw new HttpException('画板不存在', HttpStatus.NOT_FOUND);
    if (user.excludeProjects.includes(drawBoard.projectId))
      throw new HttpException('无权限', HttpStatus.FORBIDDEN);
    const project = await this.projectRepository.findOne(
      new ObjectId(drawBoard.projectId),
    );
    if (!project) throw new HttpException('项目不存在', HttpStatus.NOT_FOUND);
    drawBoard.project = project;
    return drawBoard;
  }

  /** 画板改变时，同步项目数据 */
  async syncProjectsData(projectIds: string[]): Promise<void> {
    if (!projectIds.length) return;
    for (const id of projectIds) {
      this.updateProjectData(id);
    }
  }

  /** 更新单个项目数据 */
  async updateProjectData(projectId: string): Promise<void> {
    if (!projectId) return;
    const project = await this.projectRepository.findOne(
      new ObjectId(projectId),
    );
    if (!project) return;
    const covers = await this.drawBroadRepository.find({
      where: { projectId: project.id.toString() },
      order: { updatedTime: 'DESC' },
      select: ['cover'],
    });
    const newCovers = covers
      .filter((cover) => Boolean(cover.cover))
      .map((cover) => cover.cover)
      .slice(0, 2);
    const boardCount = await this.drawBroadRepository.count({
      projectId: project.id.toString(),
    });
    if (
      project.covers.join(',') === newCovers.join(',') &&
      project.boardCount === boardCount
    )
      return;
    project.covers = newCovers;
    project.boardCount = boardCount;
    project.updatedTime = Date.now();
    await this.projectRepository.save(project);
  }
}
