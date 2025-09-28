import StudentInterface from '@/types/StudentInterface';
import sqlite3 from 'sqlite3';

sqlite3.verbose();

export const getStudentsDb = async (): Promise<any[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const students = await new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        student.id,
        student.first_name,
        student.last_name,
        student.middle_name,
        student.groupId,
        class.name AS group_name
      FROM student
      JOIN class ON student.groupId = class.id
    `;
    db.all(sql, [], (err, rows) => {
      db.close();
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });

  return students as StudentInterface[];
};
