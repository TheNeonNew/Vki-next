import { prisma } from '@/lib/prisma';
import type GroupInterface from '@/types/GroupInterface';

export class GroupService {
  async getGroups(): Promise<GroupInterface[]> {
    return await prisma.group.findMany({
      include: { students: true },
    });
  }

  async getGroupById(id: number): Promise<GroupInterface | null> {
    return await prisma.group.findUnique({
      where: { id },
      include: { students: true },
    });
  }

  async addGroup(group: Omit<GroupInterface, 'id'>): Promise<GroupInterface> {
    return await prisma.group.create({
      data: group,
    });
  }
}

export const groupService = new GroupService();
