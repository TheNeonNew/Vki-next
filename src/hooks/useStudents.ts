'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteStudentApi, getStudentsApi, fillStudentsApi, addStudentsApi } from '@/api/studentsApi';
import type StudentInterface from '@/types/StudentInterface';
import { error } from 'console';

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
    queryFn: getStudentsApi,
  });

  const deleteStudentMutate = useMutation({
    mutationFn: deleteStudentApi,
    onMutate: async (studentId: number) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
      const updatedStudents = (previousStudents ?? []).map(s =>
        s.id === studentId ? { ...s, isDeleted: true } : s
      );
      queryClient.setQueryData(['students'], updatedStudents);
      console.log('deleteStudentMutate onMutate', previousStudents, updatedStudents);
      debugger;
      return { previousStudents };
    },
    onError: (_err, _id, context) => {
      console.log('deleteStudentMutate onError', _err);
      debugger;
      if (context?.previousStudents)
        queryClient.setQueryData(['students'], context.previousStudents);
      
    },
    onSuccess: (_data, studentId, context) => {
      console.log('deleteStudentMutate onSuccess', studentId);
      debugger;
      const previous = context?.previousStudents ?? [];
      queryClient.setQueryData(
        ['students'],
        previous.filter(s => s.id !== studentId)
      );
    },
  });

  const fillStudentsMutate = useMutation({
    mutationFn: fillStudentsApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  });

  const addStudentsMutate = useMutation<
    StudentInterface,
    Error,
    StudentInterface,
    { previousStudents?: StudentInterface[]; tempId: number }
  >({
    mutationFn: addStudentsApi,
    onMutate: async (student) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
      const tempId = crypto.getRandomValues(new Uint32Array(1))[0];
      const optimisticStudent: StudentInterface = { ...student, id: tempId, isDeleted: false };
      queryClient.setQueryData(['students'], [...(previousStudents ?? []), optimisticStudent]);
      return { previousStudents, tempId };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousStudents)
        queryClient.setQueryData(['students'], context.previousStudents);
    },
    onSuccess: (newStudent, _vars, context) => {
      queryClient.setQueryData(['students'], (old?: StudentInterface[]) =>
        (old ?? []).map(s => (s.id === context?.tempId ? newStudent : s))
      );
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