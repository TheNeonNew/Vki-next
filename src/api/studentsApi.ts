import { getStudentsDb } from '@/db/studentsDb';
import GroupInterface from '@/types/GroupInterface';

export const getStudentsApi = async (): Promise<GroupInterface[]> => {

  /* TODO: groupsApi должен возвращать данные через апи,
    не должно быть обращение в БД напрямую
  */
  const students = getStudentsDb();

  return students;
};