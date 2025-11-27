import { groupService } from '@/services/GroupService';
import { type NextRequest } from 'next/server';

export async function POST(req: NextRequest): Promise<Response> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const group = await req.json();
  //delete group['id']; TODO: implement DELETE for group
  const newGroup = await groupService.addGroup(group);

  console.log(newGroup);
  return new Response(JSON.stringify(newGroup), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};