import { ObjectId } from 'typeorm';
export interface ActiveUserData {
    sub: ObjectId;
    username: string;
}
