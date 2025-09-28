'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';

const Students = (): React.ReactElement => {
  const { students, isLoading, isError} = useStudents();

  return (
    <div className={styles.Students}>
      {students.map((student: StudentInterface) => (
        <h2 key={student.id}>
          {student.first_name}&nbsp;
          {student.middle_name}&nbsp;
          {student.last_name}&nbsp;
          <h2>Группа: {student.group_name}</h2>
        </h2>
      ))}
    </div>
  );
};

export default Students;