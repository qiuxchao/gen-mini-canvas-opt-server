import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcryptjs';

/** 密码加解密 */
@Injectable()
export class HashingService {
  async hash(data: string): Promise<string> {
    const salt = await genSalt();
    return hash(data, salt);
  }

  compare(data: string, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }
}
