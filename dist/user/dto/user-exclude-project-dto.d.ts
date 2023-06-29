import { ObjectId } from 'typeorm';
export declare class UserExcludeProjectDto {
    readonly id: ObjectId;
    readonly type: 1 | 2;
    readonly excludeProjects: string[];
}
