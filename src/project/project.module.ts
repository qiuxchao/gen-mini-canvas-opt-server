import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { DrawBoard } from 'src/draw-board/draw-board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, DrawBoard])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
