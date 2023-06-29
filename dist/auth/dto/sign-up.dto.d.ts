import { UserPermission } from 'src/user/user.entity';
export declare class SignUpDto {
    readonly username: string;
    readonly password: string;
    readonly name: string;
    readonly permissions: UserPermission[];
    readonly excludeProjects: string[];
}
