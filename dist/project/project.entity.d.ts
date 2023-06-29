import { ObjectId } from 'typeorm';
export declare class Project {
    id: ObjectId;
    name: string;
    covers: string[];
    boardCount: number;
    ossBucket: string;
    ossPath: string;
    ossDomain: string;
    createdTime: number;
    updatedTime: number;
}
