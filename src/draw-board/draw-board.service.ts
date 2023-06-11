import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DrawBoard } from './draw-board.entity';
import { MongoRepository } from 'typeorm';
import { Project } from 'src/project/project.entity';

@Injectable()
export class DrawBoardService {
  constructor(
    @InjectRepository(DrawBoard)
    private readonly drawBroadRepository: MongoRepository<DrawBoard>,
    @InjectRepository(Project)
    private readonly projectRepository: MongoRepository<Project>,
  ) {}
}
