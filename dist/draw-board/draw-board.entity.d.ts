import { ObjectId } from 'typeorm';
import { Project } from 'src/project/project.entity';
export declare class DrawBoard {
    id: ObjectId;
    name: string;
    cover: string;
    projectId: string;
    project: Project;
    width: number;
    height: number;
    json: string;
    operators: {
        id: ObjectId;
        name: string;
    }[];
    createdTime: number;
    updatedTime: number;
}
