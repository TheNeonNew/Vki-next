import { NextResponse } from 'next/server';
import { getStudentsDb} from '@/db/studentsDb';

export async function GET() {
  try {
    const students = await getStudentsDb();
    return NextResponse.json(students);
  } catch (err) {
    console.error('Error in /api/students:', err);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}