import { groupService } from '@/services/GroupService';
import { type NextRequest } from 'next/server';

export async function GET(): Promise<Response> {
  const groups = await groupService.getGroups();

  return new Response(JSON.stringify(groups), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
