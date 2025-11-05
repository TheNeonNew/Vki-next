'use client';

import { useForm } from 'react-hook-form';
import styles from './AddStudent.module.scss';

import StudentInterface from '@/types/StudentInterface';

interface Props {
  onSubmit: (student: StudentInterface) => void;
  onClose: () => void;
};

const AddStudent = ({ onSubmit, onClose }: Props): React.ReactElement => {
  const { register, handleSubmit, formState: { errors }, reset} = useForm<StudentInterface>();

  const onSubmitHandler = (student: StudentInterface) => {
debugger;
    console.log(student);
    onSubmit(student);
    reset();
  };

  const onCloseHandler = {}

  return (
  <div className={styles.Students}>
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <label htmlFor="lastName">Фамилия</label>
      <input
        id="lastName"
        {...register('lastName', { required: 'Поле фамилия не может быть пустым' })}
      />
      {errors?.lastName && <p>{errors.lastName.message}</p>}
      <br />

      <label htmlFor="firstName">Имя</label>
      <input
        id="firstName"
        {...register('firstName', { required: 'Поле имя не может быть пустым' })}
      />
      {errors?.firstName && <p>{errors.firstName.message}</p>}
      <br />

      <label htmlFor="middleName">Отчество</label>
      <input
        id="middleName"
        {...register('middleName', { required: 'Поле отчество не может быть пустым' })}
      />
      {errors?.middleName && <p>{errors.middleName.message}</p>}
      <br />

      <label htmlFor="groupId">Группа</label>
      <input
        id="groupId"
        type="number"
        {...register('groupId', { required: 'Поле группа не может быть пустым', valueAsNumber: true })}
      />
      {errors?.groupId && <p>{errors.groupId.message}</p>}
      <br />

      <button type="submit">Добавить</button>
      <button type="button" onClick={onClose}>Отмена</button>
    </form>
  </div>
);
};

export default AddStudent;