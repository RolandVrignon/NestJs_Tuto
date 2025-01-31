import { Injectable, InternalServerErrorException } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(password, this.saltRounds);
      return hashedPassword;
    } catch {
      throw new InternalServerErrorException('Error hashing password');
    }
  }

  async compare(password: string, hashed: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(password, hashed);
      return isMatch;
    } catch {
      throw new InternalServerErrorException('Error comparing passwords');
    }
  }
}
