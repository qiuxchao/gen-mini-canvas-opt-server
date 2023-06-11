import { Module } from '@nestjs/common';
import { DrawBoardService } from './draw-board.service';
import { DrawBoardController } from './draw-board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrawBoard } from './draw-board.entity';
import { Project } from 'src/project/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DrawBoard, Project])],
  controllers: [DrawBoardController],
  providers: [DrawBoardService],
})
export class DrawBoardModule {}
