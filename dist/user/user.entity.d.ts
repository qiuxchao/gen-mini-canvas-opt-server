import { ObjectId } from 'typeorm';
export type UserPermission = 'user:list' | 'user:delete' | 'user:update' | 'user:create' | 'user:permission' | 'user:exclude-project' | 'project:delete' | 'draw-board:delete';
export declare class User {
    id: ObjectId;
    username: string;
    password: string;
    name: string;
    permissions: UserPermission[];
    excludeProjects: string[];
    isActive: boolean;
    createdTime: number;
    updatedTime: number;
}
