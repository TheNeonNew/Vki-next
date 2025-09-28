import { NextResponse } from 'next/server';
import { getGroupsDb } from '@/db/groupDb';

export async function GET() {
  try {
    const groups = await getGroupsDb();
    return NextResponse.json(groups);
  } catch (err) {
    console.error('Error in /api/groups:', err);
    return NextResponse.json({ error: 'Failed to fetch groups' }, { status: 500 });
  }
}