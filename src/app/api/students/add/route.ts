import Student from '@/components/Students/Student';
import { addNRStudentDb } from '@/db/studentsDb';
import { NextRequest, NextResponse } from 'next/server';

export async function ADD(req: NextRequest): Promise<Response> {
  const student = await req.json();

  const newStudent = await addNRStudentDb(student);

  return new Response(JSON.stringify(newStudent), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
