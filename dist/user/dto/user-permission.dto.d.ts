import { UserPermission } from '../user.entity';
import { ObjectId } from 'typeorm';
export declare class UserPermissionDto {
    readonly id: ObjectId;
    readonly type: 1 | 2;
    readonly permissions: UserPermission[];
}
