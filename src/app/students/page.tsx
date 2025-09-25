'use client'

import { useEffect, useState } from 'react';
import { getStudentsApi } from '@/api/studentsApi';
import GroupInterface from '@/types/GroupInterface';
import Page from '@/components/layout/Page/Page';


const StudentsPage = (): React.ReactNode => {
  const [students, setStudents] = useState<GroupInterface[]>([]);

  useEffect(() => {
    getStudentsApi().then((data) => {
      setStudents(data);
    });
  }, []);

  return (
    <Page>
      <h1>Студенты</h1>
    </Page>
  );
};

export default StudentsPage;