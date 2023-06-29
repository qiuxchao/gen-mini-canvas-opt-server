import { UserService } from './user.service';
import { User } from './user.entity';
import { UserOperateDto } from './dto/user-operate.dto';
import { UserPermissionDto } from './dto/user-permission.dto';
import { UserExcludeProjectDto } from './dto/user-exclude-project-dto';
import { UserUpdateDto } from './dto/user-update-dto';
import { UserChangePasswordDto } from './dto/user-change-password-dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserList(): Promise<User[]>;
    updateUser(body: UserUpdateDto): Promise<User>;
    deleteUser(request: any, body: UserOperateDto): Promise<any>;
    getUserById(request: any): Promise<User>;
    userPermission(body: UserPermissionDto): Promise<any>;
    userExcludeProject(body: UserExcludeProjectDto): Promise<any>;
    changePassword(request: any, body: UserChangePasswordDto): Promise<any>;
}
