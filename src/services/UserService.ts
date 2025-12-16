import { prisma } from '@/lib/prisma';
import type UserInterface from '@/types/UserInterface';
import { hashPassword, verifyPassword } from '@/utils/password';

export class UserService {
  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(
    userData: Omit<UserInterface, 'id' | 'password'> & { password: string }
  ) {
    return await prisma.user.create({
      data: {
        ...userData,
        password: hashPassword(userData.password),
      },
    });
  }

  async verifyCredentials(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) return null;

    return verifyPassword(password, user.password) ? user : null;
  }
}

export const userService = new UserService();
