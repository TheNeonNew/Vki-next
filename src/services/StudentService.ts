import { prisma } from '@/lib/prisma';
import type StudentInterface from '@/types/StudentInterface';
import getRandomFio from '@/utils/getRandomFio';

export class StudentService {
  async getStudents(): Promise<StudentInterface[]> {
    return await prisma.student.findMany({
      include: { group: true },
    });
  }

  async getStudentById(id: number): Promise<StudentInterface | null> {
    return await prisma.student.findUnique({
      where: { id },
      include: { group: true },
    });
  }

  async deleteStudent(studentId: number): Promise<number> {
    await prisma.student.delete({
      where: { id: studentId },
    });
    return studentId;
  }

  async addStudent(
    student: Omit<StudentInterface, 'id'>
  ): Promise<StudentInterface> {
    return await prisma.student.create({
      data: student,
    });
  }

  async addRandomStudents(amount = 10): Promise<StudentInterface[]> {
    const students: StudentInterface[] = [];

    for (let i = 0; i < amount; i++) {
      const fio = getRandomFio();

      const student = await prisma.student.create({
        data: {
          ...fio,
          contacts: 'contact',
          groupId: Math.floor(Math.random() * 4) + 1,
        },
      });

      students.push(student);
    }

    return students;
  }
}

export const studentService = new StudentService();
