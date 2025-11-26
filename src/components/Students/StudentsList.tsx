'use client';
import useStudents from '@/hooks/useStudents';
import StudentInterface from '@/types/StudentInterface';
import styles from './StudentsList.module.scss';
import Student from './Student';
import { useState } from 'react';
import AddStudent, {type FormFields} from '../AddStudent/AddStudent';
import { v4 as uuidv4 } from 'uuid';
import useGroups from '@/hooks/useGroups';

const StudentsList = () => {
  const { students, deleteStudentMutate, fillStudentsMutate, addStudentsMutate } = useStudents();
  const onSubmitHandler = (studentFormField: FormFields): void => {
    console.log('Добавление студента', studentFormField);
    debugger;

    addStudentsMutate({
      id: -1,
      ...studentFormField,
      uuid: uuidv4(),
    });
  };
  const [isAddOpen, setIsAddOpen] = useState(false);
  const handleClick = () => {
    setIsAddOpen(true);
  };

  const handleClose = () => {
    setIsAddOpen(false);
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
            <tr key={student.id ? `student-${student.id}` : `temp-${index}`}>
              <td className={styles.td}>{index + 1}</td>
              <td className={styles.td}>{student.lastName}</td>
              <td className={styles.td}>{student.firstName}</td>
              <td className={styles.td}>{student.middleName}</td>
              <td className={styles.td}>
                {isNaN(student.groupId) ? "N/A" : student.groupId}
              </td>
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
      {isAddOpen && <AddStudent onAdd={onSubmitHandler} onClose={handleClose} />}

    </>
  );
};

export default StudentsList;
