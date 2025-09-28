import { useQuery } from '@tanstack/react-query';
import { getStudentsApi } from '@/api/studentsApi';
import type GroupInterface from '@/types/GroupInterface';


const useStudents = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<GroupInterface[]>({
    queryKey: ['students'],
    queryFn: getStudentsApi,
  });

  return {
    students: data,
    isLoading,
    isError,
    error,
  };
};

export default useStudents;