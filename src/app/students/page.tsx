import StudentsList from '@/components/Students/StudentsList';
import Page from '@/components/layout/Page/Page';
import { type Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Студенты - Веб разработка ВКИ - Next.js шаблон',
  description: 'Шаблон для веб-разработки с использованием Next.js, React Hook Form, Yup, SCSS, Eslint, TanStack Query (React Query)',
};


const StudentsPage = () => {
  return (
    <Page>
      <h1>Студенты</h1>
      <StudentsList/>
    </Page>
  );
};

export default StudentsPage;