'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteStudentApi, getStudentsApi, fillStudentsApi, addStudentsApi } from '@/api/studentsApi';
import type StudentInterface from '@/types/StudentInterface';

interface StudentsHookInterface {
  students: StudentInterface[];
  deleteStudentMutate: (studentId: number) => void;
  fillStudentsMutate: () => void;
  addStudentsMutate: (student: StudentInterface) => void;
}

const useStudents = (): StudentsHookInterface => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['students'],
    queryFn: () => getStudentsApi(),
    enabled: false
  });

  /**
   * Мутация удаления студента
   */
  const deleteStudentMutate = useMutation({
    // вызов API delete
    mutationFn: async (studentId: number) => deleteStudentApi(studentId),
    // оптимистичная мутация (обновляем данные на клиенте до API запроса delete)
    onMutate: async (studentId: number) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      // получаем данные из TanStackQuery
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
      let updatedStudents = [...(previousStudents ?? [])];

      if (!updatedStudents) return;

      // помечаем удаляемую запись
      updatedStudents = updatedStudents.map((student: StudentInterface) => ({
        ...student,
        ...(student.id === studentId ? { isDeleted: true } : {}),
      }));
      // обновляем данные в TanStackQuery
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);

      return { previousStudents, updatedStudents };
    },
    onError: (err, variables, context) => {
      console.log('>>> deleteStudentMutate  err', err);
      queryClient.setQueryData<StudentInterface[]>(['students'], context?.previousStudents);
    },
    // обновляем данные в случаи успешного выполнения mutationFn: async (studentId: number) => deleteStudentApi(studentId),
    onSuccess: async (studentId, variables, context) => {
      // console.log('>>> deleteStudentMutate onSuccess', studentId, variables, context);
      // удаляем студента
      if (context?.updatedStudents) {
        const updatedStudents = context.updatedStudents.filter((student) => student.id !== variables);
        queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);
      }
    },
    // onSettled: (data, error, variables, context) => {
    //   // вызывается после выполнения запроса в случаи удачи или ошибке
    //   console.log('>> deleteStudentMutate onSettled', data, error, variables, context);
    // },

  });

  const fillStudentsMutate = useMutation ({
      mutationFn: async () => fillStudentsApi(),
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['students'] });
        const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
        return { previousStudents };
      },
      onSuccess: async () => {
        queryClient.invalidateQueries({ queryKey: ['students'] });
      },
  });

  const addStudentsMutate = useMutation({
    mutationFn: async (student: StudentInterface) => addStudentsApi(student),
    onMutate: async (student: StudentInterface) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);

      let updatedStudents = [...(previousStudents ?? []), student];
      
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);
      
      return { previousStudents, updatedStudents };
    },
    onError: (err, variables, context) => {
      console.log('addStudentMutate err', err);
      queryClient.setQueryData<StudentInterface[]>(['students'], context?.previousStudents);
    },
    onSuccess: async (newStudent) => {
      queryClient.setQueryData<StudentInterface[]>(['students'], (oldStudents) => {
        const studentsWithoutTemp = oldStudents?.filter(
          (s: StudentInterface) => s.id !== undefined
        );
        // Correctly combine the arrays to maintain the correct type
        return [...(studentsWithoutTemp ?? []), newStudent];
      });
    },
  });

  return {
    students: data ?? [],
    deleteStudentMutate: deleteStudentMutate.mutate,
    fillStudentsMutate: fillStudentsMutate.mutate,
    addStudentsMutate: addStudentsMutate.mutate,
  };
};

export default useStudents;
