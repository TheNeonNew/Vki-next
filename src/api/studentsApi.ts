import StudentInterface from '@/types/StudentInterface';

export const getStudentsApi = async (): Promise<StudentInterface[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/students`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const students = await response.json() as StudentInterface[];
    return students;
  }
  catch (err) {
    console.log('>>> getStudentsApi', err);
    return [] as StudentInterface[];
  }
};

export const deleteStudentApi = async (studentId: number): Promise<void> => {
  try {
    const response = await fetch(`/api/students/${studentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
    }
  } catch (err) {
    console.log('>>> deleteStudentApi', err);
    throw err;
  }
};

export const fillStudentsApi = async (): Promise<StudentInterface[]> => {
  try {
    const response = await fetch(`/api/students/fill/`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const students = await response.json() as StudentInterface[];
    return students;
  }
  catch (err) {
    console.log('>>> fillStudentsApi', err);
    return [] as StudentInterface[];
  }
};

export const addStudentsApi = async (student: StudentInterface): Promise<StudentInterface[]> => {
  try {
    const response = await fetch(`/api/students/add/`, {
      method: 'ADD',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student)
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const students = await response.json() as StudentInterface[];
    return students;
  }
  catch (err) {
    console.log('>>> addStudentsApi', err);
    return [] as StudentInterface[];
  }
};