/// <reference types="multer" />
import { ProjectUpdateDto } from './dto/upload-dto';
export declare class ToolService {
    uploadFile(file: Express.Multer.File, body: ProjectUpdateDto): Promise<string>;
}
