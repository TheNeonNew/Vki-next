import type GroupInterface from '@/types/GroupInterface';

export const getStudentsApi = async (): Promise<GroupInterface[]> => {
  try {
    const response = await fetch(`/api/students`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const groups = await response.json() as GroupInterface[];
    return groups;
  }
  catch (err) {
    console.log('>>> getStudentsApi', err);
    return [] as GroupInterface[];
  }
};