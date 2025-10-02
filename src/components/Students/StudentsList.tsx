'use client';

import useStudents from '@/hooks/useStudents';
import Student from './Student';

const StudentsList = () => {
  const { students, deleteStudentMutate } = useStudents();

  return (
    <>
      {students.map(student => (
        <Student
          key={student.id}
          student={student}
          onDelete={() => deleteStudentMutate(student.id)}
        />
      ))}
    </>
  );
};

export default StudentsList;