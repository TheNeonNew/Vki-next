import { studentService } from '@/services/StudentService';
import { type NextRequest } from 'next/server';

export async function GET(): Promise<Response> {
  const students = await studentService.getStudents();

  return new Response(JSON.stringify(students), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
