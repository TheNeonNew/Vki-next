import { deleteStudentDb } from '@/db/studentsDb'
import { type NextApiRequest } from 'next'

export async function DELETE (
    req: NextApiRequest,
    {params}: {params: {id: number}}
): Promise<Response> {
    const p = await params
    const studentId = await p.id

    const deletedStudentDb = await deleteStudentDb(studentId)

    return new Response(JSON.stringify( {deletedStudentDb}), {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}