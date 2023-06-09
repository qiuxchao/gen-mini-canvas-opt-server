import { Controller } from '@nestjs/common';
import { DrawBoradService } from './draw-borad.service';

@Controller('draw-borad')
export class DrawBoradController {
  constructor(private readonly drawBoradService: DrawBoradService) {}
}
