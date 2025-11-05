import { addNRStudentDb } from '@/db/studentsDb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const student = await req.json();

  try {
    const newStudent = await addNRStudentDb(student);
    return NextResponse.json(newStudent);
  } catch (err) {
    console.error(err);
    return new NextResponse('Ошибка при добавлении студента', { status: 500 });
  }
}
