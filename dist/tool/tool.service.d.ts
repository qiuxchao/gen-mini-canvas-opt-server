/// <reference types="multer" />
import { ProjectUpdateDto } from './dto/upload-dto';
import { HttpService } from '@nestjs/axios';
export declare class ToolService {
    private readonly httpService;
    constructor(httpService: HttpService);
    uploadFile(file: Express.Multer.File, body: ProjectUpdateDto): Promise<string>;
}
