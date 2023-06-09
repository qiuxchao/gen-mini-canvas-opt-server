import { ObjectId } from 'typeorm';

/** JWT Token 荷载数据 */
export interface ActiveUserData {
  sub: ObjectId;
  username: string;
}
