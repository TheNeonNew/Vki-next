import { Student } from './entity/Student.entity';
import StudentInterface from '@/types/StudentInterface';
import FioInterface from '@/types/FioInterface';
import getRandomFio from '@/utils/getRandomFio';
import { initializeDataSource } from './AppDataSource';

/**
 * Получение всех студентов
 */
export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const dataSource = await initializeDataSource();
  const studentRepo = dataSource.getRepository(Student);
  return studentRepo.find();
};

/**
 * Удаление студента по id
 */
export const deleteStudentDb = async (studentId: number): Promise<StudentInterface | null> => {
  const dataSource = await initializeDataSource();
  const studentRepo = dataSource.getRepository(Student);

  const student = await studentRepo.findOneBy({ id: studentId });
  if (!student) return null;

  await studentRepo.remove(student);
  return student;
};

/**
 * Добавление случайных студентов
 */
export const addRandomStudentsDb = async (amount: number = 10): Promise<FioInterface[]> => {
  const dataSource = await initializeDataSource();
  const studentRepo = dataSource.getRepository(Student);

  const fios: FioInterface[] = [];

  for (let i = 0; i < amount; i++) {
    const fio = getRandomFio();
    fios.push(fio);

    const student = studentRepo.create({
      firstName: fio.firstName,
      lastName: fio.lastName,
      middleName: fio.middleName,
      groupId: 1,
    });

    await studentRepo.save(student);
  }

  return fios;
};

/**
 * Добавление нового студента
 */
export const addNRStudentDb = async (student: StudentInterface): Promise<StudentInterface> => {
  const dataSource = await initializeDataSource();
  const studentRepo = dataSource.getRepository(Student);

  const newStudent = studentRepo.create({
    firstName: student.firstName,
    lastName: student.lastName,
    middleName: student.middleName,
    groupId: student.groupId,
  });

  return studentRepo.save(newStudent);
};
