import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DrawBoard } from './draw-board.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class DrawBoardService {
  constructor(
    @InjectRepository(DrawBoard)
    private readonly drawBroadRepository: MongoRepository<DrawBoard>,
  ) {}
}
