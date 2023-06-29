import { User } from './user.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { UserPermissionDto } from './dto/user-permission.dto';
import { UserExcludeProjectDto } from './dto/user-exclude-project-dto';
import { UserUpdateDto } from './dto/user-update-dto';
import { UserChangePasswordDto } from './dto/user-change-password-dto';
import { HashingService } from 'src/auth/hashing.service';
export declare class UserService {
    private readonly userRepository;
    private readonly hashingService;
    constructor(userRepository: MongoRepository<User>, hashingService: HashingService);
    getUserList(): Promise<User[]>;
    updateUser(newUser: UserUpdateDto): Promise<User>;
    deleteUser(ownerId: ObjectId, id: ObjectId): Promise<any>;
    setPermission(body: UserPermissionDto): Promise<any>;
    setExcludeProjects(body: UserExcludeProjectDto): Promise<any>;
    changePassword(user: User, body: UserChangePasswordDto): Promise<any>;
}
