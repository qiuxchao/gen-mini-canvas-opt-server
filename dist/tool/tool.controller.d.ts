/// <reference types="multer" />
import { ToolService } from './tool.service';
import { ProjectUpdateDto } from './dto/upload-dto';
export declare class ToolController {
    private readonly toolService;
    constructor(toolService: ToolService);
    uploadFile(file: Express.Multer.File, body: ProjectUpdateDto): Promise<string>;
}
