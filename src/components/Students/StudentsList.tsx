'use client';
import useStudents from '@/hooks/useStudents';
import StudentInterface from '@/types/StudentInterface';
import styles from './StudentsList.module.scss';
import Student from './Student';
import { useState } from 'react';
import AddStudent from '../AddStudent/AddStudent';

const StudentsList = () => {
  const { students, deleteStudentMutate, fillStudentsMutate, addStudentsMutate } = useStudents();
  const onSubmitHandler = (student: StudentInterface): void => {
    addStudentsMutate(student);
  };
  const [isAddOpen, setIsAddOpen] = useState(false);
  const handleClick = () => {
    setIsAddOpen(true);
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>#</th>
            <th className={styles.th}>Фамилия</th>
            <th className={styles.th}>Имя</th>
            <th className={styles.th}>Отчество</th>
            <th className={styles.th}>Группа</th>
            <th className={styles.th}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student: StudentInterface, index: number) => (
            <tr key={student.id}>
              <td className={styles.td}>{index + 1}</td>
              <td className={styles.td}>{student.last_name}</td>
              <td className={styles.td}>{student.first_name}</td>
              <td className={styles.td}>{student.middle_name}</td>
              <td className={styles.td}>{student.groupId}</td> 
              <td className={styles.td}>
                <button onClick={() => deleteStudentMutate(student.id)}>
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => fillStudentsMutate()}>Заполнить Список Студентов</button>
      <button onClick={handleClick}>Добавить студента</button>
      {isAddOpen && <AddStudent onSubmit={onSubmitHandler} />} 
    </>
  );
};

export default StudentsList;
