import { ObjectId } from 'typeorm';
import { UserPermission } from '../user.entity';
export declare class UserUpdateDto {
    readonly id: ObjectId;
    readonly name: string;
    readonly username: string;
    readonly password: string;
    readonly isActive: boolean;
    permissions: UserPermission[];
    readonly excludeProjects: string[];
}
