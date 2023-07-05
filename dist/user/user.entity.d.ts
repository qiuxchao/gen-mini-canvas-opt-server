import { ObjectId } from 'typeorm';
export type UserPermission = 'user:list' | 'user:delete' | 'user:update' | 'user:create' | 'user:permission' | 'user:exclude-project' | 'user:password' | 'project:create' | 'project:update' | 'project:delete' | 'draw-board:create' | 'draw-board:update' | 'draw-board:delete' | 'tool:upload';
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
